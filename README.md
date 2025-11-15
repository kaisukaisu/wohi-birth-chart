# Wohi Birth Chart (React + Vite + Express)

Astrologisen syntymäkartan demoprojekti. Frontti on React/Vite, taustalla on Express-proxy joka kutsuu FreeAstrologyAPI:a.

## Kehitysympäristö

1) Asenna riippuvuudet:
```
npm install
```

2) Luo `.env` juureen ja lisää:
```
API_KEY=REPLACE_WITH_YOUR_FREE_ASTROLOGY_API_KEY
PORT=3000
ALLOWED_ORIGIN=http://localhost:5173
```

3) Käynnistä backend (Express-proxy):
```
npm run server
```

4) Käynnistä frontend (Vite):
```
npm run dev
```

5) Avaa selain:
```
http://localhost:5173
```

## Tekniset huomiot
- API-avain luetaan `process.env.API_KEY` (ei kovakoodattu).
- CORS sallii vain määritellyt originit (`ALLOWED_ORIGIN`).
- Vite dev -proxy edelleenohjaa `/api/*` → `http://localhost:3000`.
- Lomake käyttää suhteellista polkua (`/api/planets`) ja muuntaa desimaalipilkut pisteiksi.
- Aikavyöhyke johdetaan selaimen offsetista.

## Deploy
- Hostaa frontti staattisena (esim. CDN) ja Express erillään, tai palvele frontti myös Expressin takaa.
- Muista päivittää `ALLOWED_ORIGIN` ympäristöön ja käyttää HTTPS:ää.
