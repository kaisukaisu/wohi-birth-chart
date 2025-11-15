import { useState } from 'react';
import axios from 'axios';

function BirthChartForm({ onDataFetched }) {
  const [formData, setFormData] = useState({
    date: '1990-01-01',
    time: '12:00',
    latitude: '60.10',
    longitude: '24.93',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const parseNum = (v) => parseFloat(String(v).replace(',', '.'));
  const getErrors = () => {
    const errs = {};
    if (!formData.date) errs.date = 'Valitse päivämäärä';
    if (!formData.time) errs.time = 'Valitse kellonaika';
    const lat = parseNum(formData.latitude);
    const lon = parseNum(formData.longitude);
    if (Number.isNaN(lat)) errs.latitude = 'Anna leveysaste numerona';
    else if (lat < -90 || lat > 90) errs.latitude = 'Leveysaste oltava -90 … 90';
    if (Number.isNaN(lon)) errs.longitude = 'Anna pituusaste numerona';
    else if (lon < -180 || lon > 180) errs.longitude = 'Pituusaste oltava -180 … 180';
    return errs;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0;

  const handleUseLocation = async () => {
    setError(null);
    if (!navigator.geolocation) {
      setError('Sijaintipalvelu ei ole käytettävissä tällä laitteella.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: String(latitude.toFixed(5)),
          longitude: String(longitude.toFixed(5)),
        }));
        setLoading(false);
      },
      (geoErr) => {
        setError('Sijainnin haku epäonnistui. Salli sijainti ja yritä uudelleen.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleReset = () => {
    setFormData({
      date: '1990-01-01',
      time: '12:00',
      latitude: '60.10',
      longitude: '24.93',
    });
    setError(null);
    setTouched({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const [year, month, day] = formData.date.split('-').map(Number);
      const [hours, minutes] = formData.time.split(':').map(Number);
      const seconds = 0;
      const timezone = -new Date().getTimezoneOffset() / 60; // derive from browser

      if (!isValid) {
        setLoading(false);
        return;
      }

      const payload = {
        year,
        month,
        date: day,
        hours,
        minutes,
        seconds,
        latitude: parseNum(formData.latitude),
        longitude: parseNum(formData.longitude),
        timezone,
        config: {
          observation_point: "topocentric",
          ayanamsha: "tropical",
          house_system: "Placidus",
          language: "en",
          exclude_planets: [],
          allowed_aspects: [
            "Conjunction",
            "Opposition",
            "Trine",
            "Square",
            "Sextile",
            "Semi-Sextile",
            "Quintile",
            "Septile",
            "Octile",
            "Novile",
            "Quincunx",
            "Sesquiquadrate"
          ],
          aspect_line_colors: {
            Conjunction: "#558B6E",
            Opposition: "#88A09E",
            Square: "#704C5E",
            Trine: "#B88C9E",
            Sextile: "#F1C8DB",
            "Semi-Sextile": "#A799B7",
            Quintile: "#9888A5",
            Septile: "#776472",
            Octile: "#445552",
            Novile: "#294D4A",
            Quincunx: "#49306B",
            Sesquiquadrate: "#E1CDB5"
          },
          wheel_chart_colors: {
            zodiac_sign_background_color: "#303036",
            chart_background_color: "#303036",
            zodiac_signs_text_color: "#FFFFFF",
            dotted_line_color: "#FFFAFF",
            planets_icon_color: "#FFFAFF"
          },
          orb_values: {
            Conjunction: 3,
            Opposition: 5,
            Square: 5,
            Trine: 5,
            Sextile: 5,
            "Semi-Sextile": 5,
            Quintile: 5,
            Septile: 5,
            Octile: 5,
            Novile: 5,
            Quincunx: 5,
            Sesquiquadrate: 5
          }
        }
      };

      // Use SVG wheel endpoint if user wants the pre-rendered chart
      const response = await axios.post("/api/natal-wheel", payload);

      if (response.data) {
        // Attach birth info to response for visualization
        const chartDataWithInput = {
          ...response.data,
          input: { ...formData } // date, time, latitude, longitude
        };

        onDataFetched && onDataFetched(chartDataWithInput);
      }
    } catch (err) {
      console.error('API error:', err.response?.data || err.message);
      setError('API-haussa tapahtui virhe. Katso konsoli lisätiedoista.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='container text-center justify-content-center'>
      <form onSubmit={handleSubmit} noValidate style={{ 
        maxWidth: 720, margin: '0 auto', padding: '1rem', background: '#fff',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Päivämäärä
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              style={{
                width: '100%', padding: '0.5rem 0.6rem', borderRadius: 8,
                border: `1px solid ${touched.date && errors.date ? '#e35d6a' : '#d5d8dc'}`
              }}
            />
            {touched.date && errors.date && (
              <div style={{ color: '#b3261e', fontSize: 12, marginTop: 4 }}>{errors.date}</div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Kellonaika
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              style={{
                width: '100%', padding: '0.5rem 0.6rem', borderRadius: 8,
                border: `1px solid ${touched.time && errors.time ? '#e35d6a' : '#d5d8dc'}`
              }}
            />
            {touched.time && errors.time && (
              <div style={{ color: '#b3261e', fontSize: 12, marginTop: 4 }}>{errors.time}</div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Leveysaste (−90…90)
            </label>
            <input
              type="text"
              inputMode="decimal"
              name="latitude"
              placeholder="esim. 60.10"
              value={formData.latitude}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: '100%', padding: '0.5rem 0.6rem', borderRadius: 8,
                border: `1px solid ${touched.latitude && errors.latitude ? '#e35d6a' : '#d5d8dc'}`
              }}
            />
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
              Desimaalipilkut sallitaan, ne muunnetaan pisteeksi automaattisesti.
            </div>
            {touched.latitude && errors.latitude && (
              <div style={{ color: '#b3261e', fontSize: 12, marginTop: 4 }}>{errors.latitude}</div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
              Pituusaste (−180…180)
            </label>
            <input
              type="text"
              inputMode="decimal"
              name="longitude"
              placeholder="esim. 24.93"
              value={formData.longitude}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: '100%', padding: '0.5rem 0.6rem', borderRadius: 8,
                border: `1px solid ${touched.longitude && errors.longitude ? '#e35d6a' : '#d5d8dc'}`
              }}
            />
            {touched.longitude && errors.longitude && (
              <div style={{ color: '#b3261e', fontSize: 12, marginTop: 4 }}>{errors.longitude}</div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={loading}
              style={{
                padding: '0.55rem 0.9rem', borderRadius: 8, border: '1px solid #cbd5e1',
                background: '#f3f4f6', cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Käytä nykyistä sijaintia
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              style={{
                padding: '0.55rem 0.9rem', borderRadius: 8, border: '1px solid #e5e7eb',
                background: '#fff', cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Tyhjennä
            </button>
          </div>
          <button
            type="submit"
            disabled={loading || !isValid}
            style={{
              padding: '0.6rem 1rem', borderRadius: 8, border: '1px solidrgb(44, 236, 121)',
              background: loading || !isValid ? '#93c5fd' : '#3b82f6', color: '#fff',
              cursor: loading || !isValid ? 'not-allowed' : 'pointer', fontWeight: 600
            }}
          >
            {loading ? 'Ladataan…' : 'Näytä syntymäkartta'}
          </button>
        </div>

        {error && <p style={{ color: '#b3261e', marginTop: '0.75rem' }}>{error}</p>}
      </form>
    </section>
  );
}

export default BirthChartForm;
