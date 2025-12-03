
import './App.css'
import Navbar from './Navbar';
import WebInsight from './WebInsight';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PDFInsight from './PDFInsight';
import SmartReply from './SmartReply';
import Home from './Home';
import Footer from './Footer';


function App() {
  return (
    <>
    <Router>
     <Navbar />
    
     <div >
        <Routes>
          {/* Default Route → Welcome Page */}
          <Route path="/" element={<Home />} />

          {/* Smart Tools Pages */}
          <Route path="/webinsight" element={<WebInsight />} />
          <Route path="/pdfinsight" element={<PDFInsight />} />
          <Route path="/replyAI" element={<SmartReply />} />

          {/* Redirect any unknown path to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>


     </Router>



     
    </>
  );
}

export default App
