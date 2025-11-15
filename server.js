import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Restrict CORS to allowed origins (comma-separated list)
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST"],
  })
);
app.use(express.json());

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

if (!API_KEY) {
  console.error("❌ Missing API_KEY environment variable");
  process.exit(1);
}

// 🌍 Proxy route to FreeAstrologyAPI
app.post("/api/planets", async (req, res) => {
  try {
    // Puretaan tiedot suoraan frontendin lähettämästä payloadista
    const {
      year,
      month,
      date: day,
      hours,
      minutes,
      seconds = 0,
      latitude,
      longitude,
      timezone = 2,
      config = {
        observation_point: "topocentric",
        ayanamsha: "tropical",
        language: "en",
      },
    } = req.body;

    // Tarkistus — jos joku pakollinen tieto puuttuu, ilmoitetaan virhe
    if (
      !year ||
      !month ||
      !day ||
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({ error: "Missing required birth data fields" });
    }

    // 📡 Lähetetään pyyntö FreeAstrologyAPI:lle
    const response = await axios.post(
      "https://json.freeastrologyapi.com/western/planets",
      {
        year,
        month,
        date: day,
        hours,
        minutes,
        seconds,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone,
        config,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // 📦 Palautetaan API:n vastaus React-sovellukselle
    res.json(response.data);

  } catch (error) {
    console.error("❌ API Proxy Error:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message || "Internal Server Error",
    });
  }
});

// 🌍 Proxy route to FreeAstrologyAPI - Houses (Western)
app.post("/api/houses", async (req, res) => {
  try {
    const {
      year,
      month,
      date: day,
      hours,
      minutes,
      seconds = 0,
      latitude,
      longitude,
      timezone = 2,
      config = {
        observation_point: "topocentric",
        ayanamsha: "tropical",
        house_system: "Placidus",
        language: "en",
      },
    } = req.body;

    if (
      !year ||
      !month ||
      !day ||
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({ error: "Missing required birth data fields" });
    }

    const response = await axios.post(
      "https://json.freeastrologyapi.com/western/houses",
      {
        year,
        month,
        date: day,
        hours,
        minutes,
        seconds,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone,
        config,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ API Proxy Error (houses):", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message || "Internal Server Error",
    });
  }
});

// 🔗 Combined endpoint: fetch planets + houses for frontend convenience
app.post("/api/natal", async (req, res) => {
  try {
    const payload = req.body || {};

    const [planetsResp, housesResp] = await Promise.all([
      axios.post("http://localhost:" + PORT + "/api/planets", payload),
      axios.post("http://localhost:" + PORT + "/api/houses", payload),
    ]);

    res.json({
      planets: planetsResp.data?.output || planetsResp.data?.planets || planetsResp.data,
      cusps: housesResp.data?.output || housesResp.data?.cusps || housesResp.data,
      raw: {
        planets: planetsResp.data,
        houses: housesResp.data,
      },
      input: payload,
    });
  } catch (error) {
    console.error("❌ API Proxy Error (natal combo):", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message || "Internal Server Error",
    });
  }
});

// 🎯 Natal Wheel Chart (SVG URL passthrough)
app.post("/api/natal-wheel", async (req, res) => {
  try {
    const {
      year,
      month,
      date: day,
      hours,
      minutes,
      seconds = 0,
      latitude,
      longitude,
      timezone,
      config = {
        observation_point: "topocentric",
        ayanamsha: "tropical",
        house_system: "Placidus",
        language: "en",
      },
    } = req.body;

    if (
      !year ||
      !month ||
      !day ||
      latitude == null ||
      longitude == null ||
      timezone == null
    ) {
      return res.status(400).json({ error: "Missing required birth data fields" });
    }

    const response = await axios.post(
      "https://json.freeastrologyapi.com/western/natal-wheel-chart",
      {
        year,
        month,
        date: day,
        hours,
        minutes,
        seconds,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone,
        config,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ API Proxy Error (natal-wheel):", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message || "Internal Server Error",
    });
  }
});

// 🚀 Käynnistetään palvelin portissa 3000
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
});
