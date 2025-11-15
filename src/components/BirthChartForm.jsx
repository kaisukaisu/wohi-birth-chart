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
    if (!formData.date) errs.date = 'Select a date';
    if (!formData.time) errs.time = 'Select a time';
    const lat = parseNum(formData.latitude);
    const lon = parseNum(formData.longitude);
    if (Number.isNaN(lat)) errs.latitude = 'Enter latitude as a number';
    else if (lat < -90 || lat > 90) errs.latitude = 'Latitude must be -90 … 90';
    if (Number.isNaN(lon)) errs.longitude = 'Enter longitude as a number';
    else if (lon < -180 || lon > 180) errs.longitude = 'Longitude must be -180 … 180';
    return errs;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0;

  const handleUseLocation = async () => {
    setError(null);
    if (!navigator.geolocation) {
      setError('Location service is not available on this device.');
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
        setError('Location retrieval failed. Allow location access and try again.');
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
      setError('An error occurred in the API request. Check the console for more details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='container text-center justify-content-center'>
      <form onSubmit={handleSubmit} noValidate style={{ 
        maxWidth: 720, 
        margin: '0 auto', 
        padding: '2rem', 
        background: 'rgba(26, 26, 46, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(108, 92, 231, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(108, 92, 231, 0.1)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#f8f9fa' }}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              style={{
                width: '100%', 
                padding: '0.5rem 0.6rem', 
                borderRadius: 12,
                border: `1px solid ${touched.date && errors.date ? 'rgba(231, 93, 106, 0.5)' : 'rgba(108, 92, 231, 0.3)'}`,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f8f9fa',
                transition: 'all 0.3s ease'
              }}
            />
            {touched.date && errors.date && (
              <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 4 }}>{errors.date}</div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#f8f9fa' }}>
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              style={{
                width: '100%', 
                padding: '0.5rem 0.6rem', 
                borderRadius: 12,
                border: `1px solid ${touched.time && errors.time ? 'rgba(231, 93, 106, 0.5)' : 'rgba(108, 92, 231, 0.3)'}`,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f8f9fa',
                transition: 'all 0.3s ease'
              }}
            />
            {touched.time && errors.time && (
              <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 4 }}>{errors.time}</div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#f8f9fa' }}>
              Latitude (−90…90)
            </label>
            <input
              type="text"
              inputMode="decimal"
              name="latitude"
              placeholder="e.g. 60.10"
              value={formData.latitude}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: '100%', 
                padding: '0.5rem 0.6rem', 
                borderRadius: 12,
                border: `1px solid ${touched.latitude && errors.latitude ? 'rgba(231, 93, 106, 0.5)' : 'rgba(108, 92, 231, 0.3)'}`,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f8f9fa',
                transition: 'all 0.3s ease'
              }}
            />
            <div style={{ color: '#a29bfe', fontSize: 12, marginTop: 4 }}>
              Decimal commas are allowed and will be automatically converted to periods.
            </div>
            {touched.latitude && errors.latitude && (
              <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 4 }}>{errors.latitude}</div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#f8f9fa' }}>
              Longitude (−180…180)
            </label>
            <input
              type="text"
              inputMode="decimal"
              name="longitude"
              placeholder="e.g. 24.93"
              value={formData.longitude}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: '100%', 
                padding: '0.5rem 0.6rem', 
                borderRadius: 12,
                border: `1px solid ${touched.longitude && errors.longitude ? 'rgba(231, 93, 106, 0.5)' : 'rgba(108, 92, 231, 0.3)'}`,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f8f9fa',
                transition: 'all 0.3s ease'
              }}
            />
            {touched.longitude && errors.longitude && (
              <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 4 }}>{errors.longitude}</div>
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
                padding: '0.55rem 0.9rem', 
                borderRadius: 12, 
                border: '1px solid rgba(108, 92, 231, 0.3)',
                background: 'rgba(108, 92, 231, 0.1)',
                color: '#a29bfe',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.5 : 1
              }}
            >
              Use current location
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              style={{
                padding: '0.55rem 0.9rem', 
                borderRadius: 12, 
                border: '1px solid rgba(108, 92, 231, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#e9ecef',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.5 : 1
              }}
            >
              Reset
            </button>
          </div>
          <button
            type="submit"
            disabled={loading || !isValid}
            style={{
              padding: '0.6rem 1rem', 
              borderRadius: 12, 
              border: '1px solid rgba(108, 92, 231, 0.5)',
              background: loading || !isValid ? 'rgba(108, 92, 231, 0.3)' : 'rgba(108, 92, 231, 0.4)',
              color: '#f8f9fa',
              cursor: loading || !isValid ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: loading || !isValid ? 'none' : '0 4px 15px rgba(108, 92, 231, 0.3)'
            }}
          >
            {loading ? 'Loading…' : 'Show birth chart'}
          </button>
        </div>

        {error && <p style={{ color: '#ff6b6b', marginTop: '0.75rem' }}>{error}</p>}
      </form>
    </section>
  );
}

export default BirthChartForm;
