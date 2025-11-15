import { Routes, Route, Navigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import YourChart from './Pages/YourChart';
import Interpretations from './Pages/Interpretations';
import Contact from './Pages/Contact';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/yourchart" replace />} />
        <Route path="/yourchart" element={<YourChart />} />
        <Route path="/interpretations" element={<Interpretations />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}


export default App;
