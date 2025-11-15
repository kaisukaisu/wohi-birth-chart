
import { useState, useEffect } from 'react';
import BirthChartForm from '../components/BirthChartForm';
import BirthChartVisualization from '../components/BirthChartVisualization';

function YourChart() {
    // Load saved chart from localStorage when component mounts
    const [chartData, setChartData] = useState(() => {
        const saved = localStorage.getItem('birthChartData');
        return saved ? JSON.parse(saved) : null;
    });

    // Save chart to localStorage whenever it changes
    useEffect(() => {
        if (chartData) {
            localStorage.setItem('birthChartData', JSON.stringify(chartData));
        } else {
            // If chart is removed, also remove from localStorage
            localStorage.removeItem('birthChartData');
        }
    }, [chartData]);

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
                <h1 className="mb-4" style={{ color: '#f8f9fa', textShadow: '0 0 20px rgba(108, 92, 231, 0.3)' }}>Natal Chart (Astrological Birth Chart)</h1>

                <div className="mb-5">
                    <h2 className="mb-3" style={{ color: '#f8f9fa' }}>7. How to Read Your Own Chart</h2>
                    <p style={{ color: '#e9ecef' }}>
                        Now that you understand the basics, here's how to start interpreting your own chart:
                    </p>
                    <ol style={{ color: '#e9ecef' }}>
                        <li><strong>Find your Sun sign:</strong> Look for the ☉ symbol and see which zodiac sign it's in. This is your core identity.</li>
                        <li><strong>Find your Moon sign:</strong> Look for the ☽ symbol. This shows your emotional nature.</li>
                        <li><strong>Find your Rising sign (Ascendant):</strong> Look at the left edge of the chart (around 9 o'clock). This shows how others see you.</li>
                        <li><strong>Check which houses your planets are in:</strong> This shows which areas of life each planet's energy affects.</li>
                        <li><strong>Look at the aspect lines:</strong> Notice which planets are connected and what types of aspects they form.</li>
                        <li><strong>Combine the information:</strong> A planet in a sign in a house shows how that energy expresses itself in that life area.</li>
                    </ol>
                    <p style={{ color: '#e9ecef' }}>
                        Remember, astrology is a tool for self-understanding. There are no "bad" placements—each position offers both challenges and gifts. 
                        Your chart is a map of your potential, not a fixed destiny.
                    </p>
                    <p style={{ color: '#e9ecef', marginTop: '1rem' }}>
                        <strong>Instructions for Interpreting symbols can be found in the Interpretations tab.</strong>
                    </p>
                </div>

                <div className="mb-4">
                    <p className="lead" style={{ color: '#e9ecef', textAlign: 'center' }}>
                        Enter birth time and birth location coordinates
                    </p>
                </div>
                <BirthChartForm onDataFetched={setChartData} />
                {chartData && (
                    <div style={{ marginTop: '2rem', padding: '1rem' }}>
                        <BirthChartVisualization chartData={chartData} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default YourChart;