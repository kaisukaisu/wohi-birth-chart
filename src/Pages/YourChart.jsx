
import { useState } from 'react';
import BirthChartForm from '../components/BirthChartForm';
import BirthChartVisualization from '../components/BirthChartVisualization';

function YourChart() {

    const [chartData, setChartData] = useState(null);


    return (
        <div>
            <main style={{ padding: '2rem' }}>

                <div className='container text-center justify-content-center my-5'>
                    <h1 className='text-center'>Astrologinen syntymäkartta</h1>

                </div>
                <div className='container text-center justify-content-center my-5'>
                    <h2>Astrologisen syntymäkartan merkitys</h2>
                    <p>
                        Astrologinen syntymäkartta on kuvaus taivaankappaleiden asennoista
                        tarkalla syntymähetkelläsi. Kartta tarjoaa symbolisen näkymän
                        siihen, miten erilaiset energiat, persoonallisuuden piirteet ja
                        elämänteemat voivat ilmetä elämässäsi.
                    </p>
                    <p>
                        Syntymäkartta ei määrää kohtaloa, vaan toimii karttana, joka auttaa
                        ymmärtämään potentiaaleja ja haasteita. Planeettojen sijainnit eri
                        huoneissa ja merkeissä kertovat erilaisia tarinoita siitä, miten
                        nämä energiat virtaavat elämässäsi.
                    </p>
                </div>
                <label className='text-center justify-content-center my-5'>Syötä syntymäaika ja syntymäapaikan sijainti koordinaatteina</label>
                <BirthChartForm onDataFetched={setChartData} />
                {chartData && <BirthChartVisualization chartData={chartData} />}
            </main>
        </div>
    )
}

export default YourChart;