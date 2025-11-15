## Wohi Birth Chart – Quickstart

A React + Vite frontend with an Express proxy to FreeAstrologyAPI. You can either:
- Render a ready-made wheel SVG from the API (includes aspects, colors, etc.)
- Or render locally with `astrochart2` (offline style) using planets/houses data

### 1) Prerequisites
- Node 18+
- FreeAstrologyAPI key

### 2) Install and configure
1. Install
```
npm install
```
2. Create `.env` in project root:
```
API_KEY=YOUR_FREE_ASTROLOGY_API_KEY
PORT=3000
ALLOWED_ORIGIN=http://localhost:5173
```

### 3) Run locally
In two terminals:

Terminal A (backend proxy):
```
npm run server
```
You should see: `Proxy server running on http://localhost:3000`

Terminal B (frontend):
```
npm run dev
```
Open `http://localhost:5173`

### 4) How it works
- Frontend (React/Vite) lives in `src/`
- Proxy server (Express) is `server.js`
- Vite dev proxy forwards requests from `/api/*` → `http://localhost:3000`
- `astrochart2` assets (fonts) are served directly from `node_modules` at `/assets` during dev (see `vite.config.js`)

### 5) API routes (backend proxy)
All routes expect JSON body with birth data:
```
{
  "year": 1998,
  "month": 3,
  "date": 3,
  "hours": 10,
  "minutes": 30,
  "seconds": 0,
  "latitude": 60.10,
  "longitude": 24.93,
  "timezone": 2,
  "config": { ... }
}
```

- POST `/api/planets`
  - Proxies `https://json.freeastrologyapi.com/western/planets`
  - Returns planets data

- POST `/api/houses`
  - Proxies `https://json.freeastrologyapi.com/western/houses`
  - Returns houses/cusps

- POST `/api/natal`
  - Calls both `/api/planets` and `/api/houses` and returns combined payload `{ planets, cusps, raw, input }`
  - Useful for local rendering with `astrochart2`

- POST `/api/natal-wheel`
  - Proxies `https://json.freeastrologyapi.com/western/natal-wheel-chart`
  - Returns `{ statusCode, output }` where `output` is a publicly hosted SVG URL of the wheel
  - This is the simplest way to display a full, styled natal chart with aspects

### 6) Frontend behavior
- Form component: `src/components/BirthChartForm.jsx`
  - Sends POST to `/api/natal-wheel` with full payload (including colors/aspects config)
  - Shows loading and basic validation; can auto-fill lat/lon from geolocation

- Visualization component: `src/components/BirthChartVisualization.jsx`
  - If `chartData.output` (string URL) is present → embeds the returned SVG in an `<img>`
  - Else, it falls back to local `astrochart2` rendering and tries to map API data into `{ points, cusps }`
  - Responsive container with optional zoom for local mode

### 7) Troubleshooting
- 404: `Cannot POST /api/...`
  - Backend likely not restarted after code changes or a different process owns port 3000
  - Kill the process on 3000 and restart:
    - Windows PowerShell:
      - `netstat -ano | findstr :3000`
      - `taskkill /PID <PID> /F`
    - From project root: `npm run server`

- API key
  - Ensure `.env` has `API_KEY` and you start the server from project root

- Dev proxy
  - Vite forwards `/api/*` to `http://localhost:3000` (see `vite.config.js`)

- Fonts (astrochart2 local mode)
  - Dev server serves astrochart2 assets from `node_modules` at `/assets` so the library’s internal font URL resolves

### 8) Example PowerShell test for `/api/natal-wheel`
```powershell
$body = @{
  year = 1998; month = 3; date = 3; hours = 10; minutes = 30; seconds = 0
  latitude = 17.38405; longitude = 78.45636; timezone = 5.5
  config = @{
    observation_point = "topocentric"; ayanamsha = "tropical"; house_system = "Placidus"; language = "en"
    exclude_planets = @()
    allowed_aspects = @("Conjunction","Opposition","Trine","Square","Sextile","Semi-Sextile","Quintile","Septile","Octile","Novile","Quincunx","Sesquiquadrate")
    aspect_line_colors = @{ Conjunction="#558B6E"; Opposition="#88A09E"; Square="#704C5E"; Trine="#B88C9E"; Sextile="#F1C8DB"; "Semi-Sextile"="#A799B7"; Quintile="#9888A5"; Septile="#776472"; Octile="#445552"; Novile="#294D4A"; Quincunx="#49306B"; Sesquiquadrate="#E1CDB5" }
    wheel_chart_colors = @{ zodiac_sign_background_color="#303036"; chart_background_color="#303036"; zodiac_signs_text_color="#FFFFFF"; dotted_line_color="#FFFAFF"; planets_icon_color="#FFFAFF" }
    orb_values = @{ Conjunction=3; Opposition=5; Square=5; Trine=5; Sextile=5; "Semi-Sextile"=5; Quintile=5; Septile=5; Octile=5; Novile=5; Quincunx=5; Sesquiquadrate=5 }
  }
} | ConvertTo-Json -Depth 6

Invoke-RestMethod -Method POST `
  -Uri http://localhost:3000/api/natal-wheel `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body $body
```

Expected:
```
{ "statusCode": 200, "output": "https://western-astrology.s3....svg" }
```

### 9) Deploy notes
- Host frontend (build with `npm run build`) and run Express separately
- Set proper CORS origins via `ALLOWED_ORIGIN` and use HTTPS in production

