function Interpretations() {
  const darkThemeStyle = {
    backgroundColor: '#303036',
    color: '#FFFFFF',
    minHeight: '100vh',
    padding: '2rem 0'
  };

  const tableDarkStyle = {
    backgroundColor: '#303036',
    color: '#FFFFFF'
  };

  return (
    <div style={darkThemeStyle}>
      <div className="container py-5">
        <h1 className="mb-4" style={{ color: '#FFFFFF' }}>HOW TO READ A NATAL CHART (ASTROLOGICAL BIRTH CHART)</h1>

        {/* Section 1 */}
        <h2 className="mb-3" style={{ color: '#FFFFFF' }}>1. What a Natal Chart Is</h2>
        <p className="lead" style={{ color: '#FFFFFF' }}>
          A natal chart (or birth chart) is a map of the sky at the exact time and place you were born. <br />
          The circle represents the sky divided into:
        </p>
        <ul style={{ color: '#FFFFFF' }}>
          <li>12 zodiac signs</li>
          <li>12 houses (life areas)</li>
          <li>Planets placed according to where they were in the sky</li>
          <li>Lines connecting planets (called aspects) that show how those energies interact.</li>
        </ul>

        {/* Section 2 */}
        <h2 className="mt-4 mb-3" style={{ color: '#FFFFFF' }}>2. How the Chart Looks</h2>
        <ul style={{ color: '#FFFFFF' }}>
          <li>A circle divided into 12 sections — these are the houses.</li>
          <li>Symbols for the zodiac signs (♈ Aries through ♓ Pisces) around the outer rim.</li>
          <li>Planet symbols (☉, ☽, ☿, ♀, ♂, ♃, ♄, ♅, ♆, ♇) inside the circle.</li>
          <li>Colored lines in the center connecting planets — these are aspects (relationships between planets).</li>
        </ul>

        {/* Section 3: Zodiac Signs */}
        <h2 className="mt-5 mb-3" style={{ color: '#FFFFFF' }}>3. The Zodiac Signs and Their Traits</h2>
        <p style={{ color: '#FFFFFF' }}>
          The zodiac is divided into 12 signs, each representing different personality traits and characteristics. 
          Your Sun sign (the sign the Sun was in when you were born) is often what people refer to as their "star sign."
        </p>

        <div className="mt-4">
          <h3 style={{ color: '#FFFFFF' }}>♈ Aries (March 21 - April 19)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Fire | <strong>Quality:</strong> Cardinal<br />
            Aries is bold, energetic, and pioneering. They are natural leaders who love to start new projects. 
            They can be impulsive and competitive, but also courageous and enthusiastic.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♉ Taurus (April 20 - May 20)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Earth | <strong>Quality:</strong> Fixed<br />
            Taurus is stable, reliable, and sensual. They value security, comfort, and material pleasures. 
            They can be stubborn but are also patient, loyal, and have great determination.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♊ Gemini (May 21 - June 20)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Air | <strong>Quality:</strong> Mutable<br />
            Gemini is curious, communicative, and adaptable. They love learning, talking, and sharing ideas. 
            They can be restless or indecisive, but are also witty, versatile, and great at connecting with others.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♋ Cancer (June 21 - July 22)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Water | <strong>Quality:</strong> Cardinal<br />
            Cancer is nurturing, emotional, and intuitive. They value home, family, and emotional security. 
            They can be moody or overly sensitive, but are also caring, protective, and deeply empathetic.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♌ Leo (July 23 - August 22)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Fire | <strong>Quality:</strong> Fixed<br />
            Leo is confident, creative, and generous. They love being in the spotlight and expressing themselves. 
            They can be prideful or attention-seeking, but are also warm-hearted, loyal, and inspiring.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♍ Virgo (August 23 - September 22)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Earth | <strong>Quality:</strong> Mutable<br />
            Virgo is analytical, practical, and detail-oriented. They strive for perfection and are excellent at organizing. 
            They can be critical or worrisome, but are also helpful, reliable, and dedicated to improvement.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♎ Libra (September 23 - October 22)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Air | <strong>Quality:</strong> Cardinal<br />
            Libra is diplomatic, balanced, and relationship-focused. They seek harmony and beauty in all things. 
            They can be indecisive or avoid conflict, but are also fair, charming, and great at seeing both sides.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♏ Scorpio (October 23 - November 21)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Water | <strong>Quality:</strong> Fixed<br />
            Scorpio is intense, passionate, and transformative. They are drawn to deep mysteries and emotional depth. 
            They can be secretive or possessive, but are also resourceful, determined, and incredibly loyal.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♐ Sagittarius (November 22 - December 21)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Fire | <strong>Quality:</strong> Mutable<br />
            Sagittarius is adventurous, philosophical, and freedom-loving. They love exploring, learning, and expanding their horizons. 
            They can be blunt or restless, but are also optimistic, honest, and always seeking truth.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♑ Capricorn (December 22 - January 19)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Earth | <strong>Quality:</strong> Cardinal<br />
            Capricorn is ambitious, disciplined, and responsible. They are natural leaders who work hard to achieve their goals. 
            They can be pessimistic or overly serious, but are also practical, reliable, and have great self-control.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♒ Aquarius (January 20 - February 18)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Air | <strong>Quality:</strong> Fixed<br />
            Aquarius is independent, innovative, and humanitarian. They value freedom, originality, and social progress. 
            They can be detached or rebellious, but are also friendly, open-minded, and forward-thinking.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♓ Pisces (February 19 - March 20)</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Element:</strong> Water | <strong>Quality:</strong> Mutable<br />
            Pisces is intuitive, compassionate, and artistic. They are deeply emotional and connected to the spiritual realm. 
            They can be escapist or overly idealistic, but are also empathetic, creative, and have great imagination.
          </p>
        </div>

        {/* Section 4: Planets */}
        <h2 className="mt-5 mb-3" style={{ color: '#FFFFFF' }}>4. The Planets and Their Meanings</h2>
        <p style={{ color: '#FFFFFF' }}>
          Each planet in your chart represents different aspects of your personality and life. 
          The sign and house where each planet is located shows how that energy expresses itself in your life.
        </p>

        <div className="mt-4">
          <h3 style={{ color: '#FFFFFF' }}>☉ The Sun</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ☉ | <strong>Rules:</strong> Leo<br />
            The Sun represents your core identity, ego, and life purpose. It shows who you are at your essence, 
            your basic character, and what drives you. Your Sun sign is your main "star sign" and indicates your fundamental nature.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>☽ The Moon</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ☽ | <strong>Rules:</strong> Cancer<br />
            The Moon represents your emotions, instincts, and inner world. It shows how you process feelings, 
            what makes you feel secure, and your unconscious reactions. The Moon sign reveals your emotional needs and how you nurture yourself and others.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>☿ Mercury</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ☿ | <strong>Rules:</strong> Gemini and Virgo<br />
            Mercury represents communication, thinking, and learning. It shows how you process information, 
            express ideas, and connect with others mentally. Your Mercury sign influences your communication style and how you learn.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♀ Venus</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♀ | <strong>Rules:</strong> Taurus and Libra<br />
            Venus represents love, beauty, values, and relationships. It shows what you find attractive, 
            how you express affection, and what you value in life. Your Venus sign reveals your approach to love and what brings you pleasure.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♂ Mars</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♂ | <strong>Rules:</strong> Aries (and traditionally Scorpio)<br />
            Mars represents action, energy, and desire. It shows how you assert yourself, pursue goals, 
            and handle conflict. Your Mars sign reveals your drive, passion, and how you take action in the world.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♃ Jupiter</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♃ | <strong>Rules:</strong> Sagittarius (and traditionally Pisces)<br />
            Jupiter represents expansion, growth, and wisdom. It shows where you find luck, opportunities, 
            and philosophical understanding. Your Jupiter sign reveals how you seek meaning, grow, and experience abundance.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♄ Saturn</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♄ | <strong>Rules:</strong> Capricorn (and traditionally Aquarius)<br />
            Saturn represents structure, discipline, and limitations. It shows where you face challenges, 
            need to work hard, and develop maturity. Your Saturn sign reveals your sense of responsibility and areas where you need to build foundations.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♅ Uranus</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♅ | <strong>Rules:</strong> Aquarius<br />
            Uranus represents innovation, rebellion, and sudden change. It shows where you break free from tradition, 
            embrace originality, and experience unexpected events. Your Uranus sign reveals your unique qualities and areas of life where you seek freedom.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♆ Neptune</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♆ | <strong>Rules:</strong> Pisces<br />
            Neptune represents dreams, illusions, and spirituality. It shows where you seek transcendence, 
            experience inspiration, and may face confusion or deception. Your Neptune sign reveals your connection to the mystical and creative imagination.
          </p>

          <h3 style={{ color: '#FFFFFF' }}>♇ Pluto</h3>
          <p style={{ color: '#FFFFFF' }}>
            <strong>Symbol:</strong> ♇ | <strong>Rules:</strong> Scorpio<br />
            Pluto represents transformation, power, and the unconscious. It shows where you experience deep change, 
            face power dynamics, and undergo rebirth. Your Pluto sign reveals areas of life where you experience profound transformation.
          </p>
        </div>

        {/* Section 5: Symbols */}
        <h2 className="mt-5 mb-3" style={{ color: '#FFFFFF' }}>5. Understanding the Symbols</h2>
        <p style={{ color: '#FFFFFF' }}>
          Astrological charts use symbols to represent planets, signs, and aspects. Here's what each symbol means:
        </p>

        <div className="mt-4">
          <h3 style={{ color: '#FFFFFF' }}>Planet Symbols</h3>
          <ul style={{ color: '#FFFFFF' }}>
            <li><strong>☉</strong> - Sun: A circle with a dot in the center, representing the core self</li>
            <li><strong>☽</strong> - Moon: A crescent shape, representing emotions and instincts</li>
            <li><strong>☿</strong> - Mercury: The caduceus (winged staff), representing communication</li>
            <li><strong>♀</strong> - Venus: The mirror of Venus, representing love and beauty</li>
            <li><strong>♂</strong> - Mars: The shield and spear of Mars, representing action and energy</li>
            <li><strong>♃</strong> - Jupiter: The number 4 stylized, representing expansion and growth</li>
            <li><strong>♄</strong> - Saturn: The sickle of Saturn, representing structure and limitations</li>
            <li><strong>♅</strong> - Uranus: A combination of Mars and Sun symbols, representing innovation</li>
            <li><strong>♆</strong> - Neptune: The trident of Neptune, representing dreams and spirituality</li>
            <li><strong>♇</strong> - Pluto: A combination of P and L, representing transformation</li>
          </ul>

          <h3 className="mt-4" style={{ color: '#FFFFFF' }}>Zodiac Sign Symbols</h3>
          <ul style={{ color: '#FFFFFF' }}>
            <li><strong>♈</strong> - Aries: The ram's horns, representing leadership and initiative</li>
            <li><strong>♉</strong> - Taurus: The bull's head, representing stability and determination</li>
            <li><strong>♊</strong> - Gemini: The twins, representing duality and communication</li>
            <li><strong>♋</strong> - Cancer: The crab's claws, representing protection and emotions</li>
            <li><strong>♌</strong> - Leo: The lion's mane, representing confidence and creativity</li>
            <li><strong>♍</strong> - Virgo: The virgin, representing purity and analysis</li>
            <li><strong>♎</strong> - Libra: The scales, representing balance and justice</li>
            <li><strong>♏</strong> - Scorpio: The scorpion's tail, representing intensity and transformation</li>
            <li><strong>♐</strong> - Sagittarius: The archer's arrow, representing adventure and philosophy</li>
            <li><strong>♑</strong> - Capricorn: The sea-goat, representing ambition and structure</li>
            <li><strong>♒</strong> - Aquarius: The water bearer, representing innovation and humanitarianism</li>
            <li><strong>♓</strong> - Pisces: The two fish, representing intuition and spirituality</li>
          </ul>

          <h3 className="mt-4" style={{ color: '#FFFFFF' }}>Aspect Symbols</h3>
          <p style={{ color: '#FFFFFF' }}>
            Aspects are the angles between planets, shown as colored lines in your chart. The main aspects are:
          </p>
          <ul style={{ color: '#FFFFFF' }}>
            <li><strong>Conjunction (0°):</strong> Planets are very close together, blending their energies</li>
            <li><strong>Opposition (180°):</strong> Planets are opposite each other, creating tension and balance</li>
            <li><strong>Trine (120°):</strong> Planets are in harmony, creating easy flow of energy</li>
            <li><strong>Square (90°):</strong> Planets are in conflict, creating challenges that lead to growth</li>
            <li><strong>Sextile (60°):</strong> Planets are in friendly relationship, creating opportunities</li>
          </ul>
          <p style={{ color: '#FFFFFF' }}>
            The colored lines connecting planets in your chart represent these aspects. Different colors indicate different types of aspects, 
            helping you see which planetary energies are working together or creating tension in your life.
          </p>
        </div>

        {/* Section 6: How to Use This Information */}
        <h2 className="mt-5 mb-3" style={{ color: '#FFFFFF' }}>6. How to Read Your Own Chart</h2>
        <p style={{ color: '#FFFFFF' }}>
          Now that you understand the basics, here's how to start interpreting your own chart:
        </p>
        <ol style={{ color: '#FFFFFF' }}>
          <li><strong>Find your Sun sign:</strong> Look for the ☉ symbol and see which zodiac sign it's in. This is your core identity.</li>
          <li><strong>Find your Moon sign:</strong> Look for the ☽ symbol. This shows your emotional nature.</li>
          <li><strong>Find your Rising sign (Ascendant):</strong> Look at the left edge of the chart (around 9 o'clock). This shows how others see you.</li>
          <li><strong>Check which houses your planets are in:</strong> This shows which areas of life each planet's energy affects.</li>
          <li><strong>Look at the aspect lines:</strong> Notice which planets are connected and what types of aspects they form.</li>
          <li><strong>Combine the information:</strong> A planet in a sign in a house shows how that energy expresses itself in that life area.</li>
        </ol>
        <p style={{ color: '#FFFFFF' }}>
          Remember, astrology is a tool for self-understanding. There are no "bad" placements—each position offers both challenges and gifts. 
          Your chart is a map of your potential, not a fixed destiny.
        </p>
      </div>
    </div>
  );
}

export default Interpretations;