function Interpretations() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">HOW TO READ A NATAL CHART (ASTROLOGICAL BIRTH CHART)</h1>

      {/* Section 1 */}
      <h2 className="mb-3">1. What a Natal Chart Is</h2>
      <p className="lead">
        A natal chart (or birth chart) is a map of the sky at the exact time and place you were born. <br />
        The circle represents the sky divided into:
      </p>
      <ul>
        <li>12 zodiac signs</li>
        <li>12 houses (life areas)</li>
        <li>Planets placed according to where they were in the sky</li>
        <li>Lines connecting planets (called aspects) that show how those energies interact.</li>
      </ul>

      {/* Section 2 */}
      <h2 className="mt-4 mb-3">2. How the Chart Looks</h2>
      <ul>
        <li>A circle divided into 12 sections — these are the houses.</li>
        <li>Symbols for the zodiac signs (♈ Aries through ♓ Pisces) around the outer rim.</li>
        <li>Planet symbols (☉, ☽, ☿, ♀, ♂, ♃, ♄, ♅, ♆, ♇) inside the circle.</li>
        <li>Colored lines in the center connecting planets — these are aspects (relationships between planets).</li>
      </ul>

      {/* Section 3 */}
      <h2 className="mt-4 mb-3">3. The Structure of the Wheel</h2>
      <p>Think of the chart like a <strong>clock</strong>:</p>

      <table className="table">
        <thead>
          <tr>
            <th>Chart Position</th>
            <th>House</th>
            <th>Life Area</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 o'clock</td>
            <td>1st House</td>
            <td>Self, appearance, identity</td>
          </tr>
          <tr>
            <td>1 o'clock</td>
            <td>2nd House</td>
            <td>Money, possessions, resources</td>
          </tr>
          <tr>
            <td>2 o'clock</td>
            <td>3rd House</td>
            <td>Communication, learning, siblings</td>
          </tr>
          <tr>
            <td>3 o'clock</td>
            <td>4th House</td>
            <td>Home, family, roots</td>
          </tr>
          <tr>
            <td>4 o'clock</td>
            <td>5th House</td>
            <td>Creativity, children, romance</td>
          </tr>
          <tr>
            <td>5 o'clock</td>
            <td>6th House</td>
            <td>Health, work, service</td>
          </tr>
          <tr>
            <td>6 o'clock</td>
            <td>7th House</td>
            <td>Partnerships, relationships</td>
          </tr>
          <tr>
            <td>7 o'clock</td>
            <td>8th House</td>
            <td>Death, transformation, sex</td>
          </tr>
          <tr>
            <td>8 o'clock</td>
            <td>9th House</td>
            <td>Philosophy, spirituality, growth</td>
          </tr>
          <tr>
            <td>9 o'clock</td>
            <td>10th House</td>
            <td>Career, public life</td>
          </tr>
          <tr>
            <td>10 o'clock</td>
            <td>11th House</td>
            <td>Friends, groups, hopes</td>
          </tr>
          <tr>
            <td>11 o'clock</td>
            <td>12th House</td>
            <td>Subconscious, secrets, loss</td>
          </tr>
        </tbody>
      </table>
      <p>The Ascendant (ASC) or Rising Sign is always on the left edge (around 9 o’clock).<br />
      It shows how you appear to others and your approach to life.</p>
    </div>
  );
}

export default Interpretations;