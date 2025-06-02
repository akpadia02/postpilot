import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Email from './components/email/page';
import Sidebar from './components/SideBar';
import WhatsApp from './components/whatsapp/page';
import LinkedIn from './components/linkedIn/page';
import Instagram from './components/instagram/page';
import Hero from './components/hero/page';


export default function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        {/* <Hero /> */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/hero' element={<Hero />} />
            <Route path="/email" element={<Email />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
            <Route path="/linkedin" element={<LinkedIn />} />
            <Route path="/instagram" element={<Instagram />} />
            {/* other routes */}
          </Routes>
        </div>
      </div>
    </>
  );
}
