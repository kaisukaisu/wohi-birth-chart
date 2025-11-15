function Contact() {
  const darkThemeStyle = {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%)',
    color: '#f8f9fa',
    minHeight: '100vh',
    padding: '2rem 0',
    position: 'relative'
  };

  return (
    <div style={darkThemeStyle}>
      <div className="container py-5">
        <h1 style={{ color: '#f8f9fa', textShadow: '0 0 20px rgba(108, 92, 231, 0.3)' }}>Contact</h1>
        <p className="lead" style={{ color: '#e9ecef' }}>
          Thank you for visiting my birth chart website. If you are interested in learning more about your chart contact me for a personal reading.
        </p>
        <p style={{ color: '#e9ecef' }}>
          <a href="mailto:kaisu.konttinen@hotmail.com" style={{ color: '#a29bfe', textDecoration: 'none', transition: 'all 0.3s ease' }}>kaisu.konttinen@hotmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
