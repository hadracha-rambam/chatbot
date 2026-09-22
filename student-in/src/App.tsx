import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Rights } from './pages/Rights';
import { RightDetail } from './pages/RightDetail';
import { Faq } from './pages/Faq';
import { Contacts } from './pages/Contacts';
import { Guide } from './pages/Guide';
import { About } from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rights" element={<Rights />} />
        <Route path="rights/:rightId" element={<RightDetail />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="guide" element={<Guide />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
