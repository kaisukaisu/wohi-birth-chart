import { useEffect, useRef, useState } from "react";

function BirthChartVisualization({ chartData }) {
  const chartRef = useRef(null);
  const chartId = "birth-chart-canvas";
  const resizeObserverRef = useRef(null);
  const [scale, setScale] = useState(1); // simple zoom control (1x default)
  const outputUrl = typeof chartData?.output === 'string' ? chartData.output : null;

  useEffect(() => {
  if (outputUrl) {
    // If using SVG URL mode, skip astrochart2 rendering
    return;
  }
  if (!window.astrology) {
    console.error("❌ window.astrology ei ole ladattu!");
    return;
  }

  if (!chartRef.current) return;

  const renderChart = async () => {
    chartRef.current.innerHTML = "";
    const container = document.createElement("div");
    container.id = chartId;
    chartRef.current.appendChild(container);

    const { date, time, latitude, longitude, timezone: tzFromAPI } =
      chartData.input || {};
    if (!date || !time || !latitude || !longitude) return;

    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const timezone = tzFromAPI ?? -new Date().getTimezoneOffset() / 60;

    // Kirjasto asettaa font-familyksi "Astronomicon".
    // Julkaisemme sen CSS @font-face -määrittelyn kautta src/index.css:ssä.

    // Määritä koko responsiivisesti ja huomioi zoom (scale) + HiDPI
    const parent = chartRef.current;
    const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
    const baseSize = Math.min(parent.clientWidth, 900); // max 900px
    const size = Math.max(420, Math.floor(baseSize * scale)); // vähintään 420px
    container.style.width = `${size}px`;
    container.style.height = `${size}px`;

    try {
      // Varmista että CSS-fontti on valmiina ennen renderöintiä
      if (document?.fonts?.load) {
        try {
          await document.fonts.load("16px Astronomicon");
        } catch {}
      }

      console.log("🧩 Creating Universe with:", {
        year,
        month,
        day,
        hours,
        minutes,
        latitude,
        longitude,
        timezone,
        size,
        deviceScale,
      });

      // HUOM: astrochart2 käyttää konteinereita; joissain versioissa voi olla options-objekti.
      // Tässä luodaan vain Universe, koko määrittyy containerin koosta.
      const universe = new window.astrology.Universe(chartId, {
        year,
        month,
        date: day,
        hours,
        minutes,
        seconds: 0,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone,
      });

      // Muodosta data API-vastauksesta ja piirrä radix
      const data = buildRadixData(chartData);
      if (data) {
        universe.radix().setData(data);
      } else {
        console.warn("Radix-dataa ei voitu muodostaa API-vastauksesta.");
      }

      // Jos kirjastossa on tunnettu tapa terävöittää HiDPI:ta, se tehdään automaattisesti canvas-koosta.
      console.log("✅ Universe chart created:", universe);
    } catch (err) {
      console.error("🔥 Error creating Universe chart:", err);
    }
  };

  renderChart();

  // Re-render on container resize
  if (!resizeObserverRef.current) {
    resizeObserverRef.current = new ResizeObserver(() => {
      renderChart();
    });
  }
  resizeObserverRef.current.observe(chartRef.current);

  return () => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }
  };
}, [chartData, scale, outputUrl]);

  // Yrittää muodostaa astrochart2:n tarvitsemat points/cusps -rakenteet eri API-rakenteista
  function buildRadixData(chartData) {
    if (!chartData) return null;

    // Yleisiä polkuja planeetoille (array tai object map)
    const candidates = [
      chartData.planets,
      chartData.points,
      chartData.output?.planets,
      chartData.data?.planets,
      chartData.body?.planets,
    ].filter(Boolean);

    let planets = [];
    const first = candidates[0];
    if (Array.isArray(first)) {
      planets = first;
    } else if (first && typeof first === "object") {
      planets = Object.entries(first).map(([key, val]) => ({
        name: key,
        ...val,
      }));
    }

    // Mapataan planeettojen kulmat (0..360) eri nimisistä kentistä
    const points = planets
      .map((p) => {
        const rawName = p.name || p.planet || p.title || p.key;
        const name = normalizePlanetName(rawName);
        const angle = pickNumber(p, [
          "angle",
          "longitude",
          "eclipticLongitude",
          "ecliptic_longitude",
          "ecliptic.lng",
          "position.longitude",
          "position.ecliptic.longitude",
          "geo.longitude",
          "fullDegree",
          "normDegree",
          "degree",
        ]);

        if (typeof name !== "string") return null;
        const numericAngle = Number(angle);
        if (!Number.isFinite(numericAngle)) return null;

        return {
          name,
          angle: ((numericAngle % 360) + 360) % 360,
          isRetrograde: Boolean(p.retrograde ?? p.isRetrograde ?? p.is_retro ?? p.rx),
        };
      })
      .filter(Boolean);

    // Cusps: yritä lukea, muuten tee varovainen fallback (12 taloa 30 asteen välein)
    const cuspCandidates = [
      chartData.cusps,
      chartData.houses,
      chartData.output?.cusps,
      chartData.data?.cusps,
      chartData.body?.cusps,
    ].filter(Boolean);

    let cusps = cuspCandidates.find(Array.isArray);
    if (Array.isArray(cusps)) {
      cusps = cusps
        .map((c) => {
          const a = pickNumber(c, ["angle", "longitude", "ecliptic_longitude", "degree"]) ?? c;
          const numeric = Number(a);
          if (!Number.isFinite(numeric)) return null;
          return { angle: ((numeric % 360) + 360) % 360 };
        })
        .filter(Boolean);
    } else {
      cusps = Array.from({ length: 12 }, (_, i) => ({ angle: (i * 30) % 360 }));
    }

    if (points.length === 0) {
      // Jos ei saada planeettoja suoraan, yritä konstruoida edes Aurinko ja Kuu input-ajasta
      // mutta ilman efemeridejä ei voi hakea todellista sijaintia → jätetään nulliksi
      return { points: [], cusps };
    }

    return { points, cusps };
  }

  function pickNumber(obj, keys) {
    for (const key of keys) {
      const value = getByPath(obj, key);
      const num = Number(value);
      if (Number.isFinite(num)) return num;
    }
    return undefined;
  }

  function getByPath(obj, path) {
    if (!obj) return undefined;
    if (!path.includes(".")) return obj?.[path];
    return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
  }

  function normalizePlanetName(name) {
    if (!name) return name;
    const n = String(name).toLowerCase();
    const map = {
      sun: "Sun",
      sol: "Sun",
      moon: "Moon",
      luna: "Moon",
      mercury: "Mercury",
      venus: "Venus",
      earth: "Earth",
      mars: "Mars",
      jupiter: "Jupiter",
      saturn: "Saturn",
      uranus: "Uranus",
      neptune: "Neptune",
      pluto: "Pluto",
      chiron: "Chiron",
      lilith: "Lilith",
      nn: "NNode",
      nnode: "NNode",
      northnode: "NNode",
      sn: "SNode",
      snode: "SNode",
      southnode: "SNode",
    };
    return map[n] || name;
  }


  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      {outputUrl ? (
        <div style={{ width: "100%", aspectRatio: "1 / 1", margin: "0 auto", background: "#fff", overflow: "hidden" }}>
          <img
            src={outputUrl}
            alt="Natal Wheel Chart"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <label style={{ fontSize: "0.9rem", color: "#444" }}>
              Zoom:&nbsp;
              <input
                type="range"
                min="0.8"
                max="1.6"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
              />
            </label>
          </div>
          <div
            ref={chartRef}
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              margin: "0 auto",
              border: "1px solid #bbb",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          />
        </>
      )}
    </div>
  );
}

export default BirthChartVisualization;
