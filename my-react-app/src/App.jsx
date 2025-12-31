
// import './App.css'
// import Navbar from './Navbar';
// import WebInsight from './WebInsight';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PDFInsight from './PDFInsight';
// import SmartReply from './SmartReply';
// import Home from './Home';
// import Footer from './Footer';
// import Login from './Login';


// function App() {
//   return (
//     <>
//     <Router>
//      <Navbar />

//        <div>
//         <Routes>
//           {/* Default Route → Welcome Page */}
//           <Route path="/" element={<Home />} />

//           {/* Smart Tools Pages */}
//           <Route path="/webinsight" element={<WebInsight />} />
//           <Route path="/pdfinsight" element={<PDFInsight />} />
//           <Route path="/replyAI" element={<SmartReply />} />
//           <Route path="/login" element={<Login />} />


//           {/* Redirect any unknown path to Home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>


//      </Router>
//      <Footer />




//     </>
//   );
// }

// export default App


import './App.css'
import Navbar from './Navbar';
import WebInsight from './WebInsight';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PDFInsight from './PDFInsight';
import SmartReply from './SmartReply';
import Home from './Home';
import Footer from './Footer';
import Login from './Login';
import Signup from './SignUp';
import VerifyEmail from './VerifyEmail';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ProtectedRoute from './ProtectedRoute';
import { useEffect } from "react";
import NProgress from "./utils/nprogress";

/* 🔹 Layout component */
function Layout() {
  const location = useLocation();



  // ❌ Pages jahan Navbar nahi chahiye
  const hideUIRoutes = ["/login", "/signup", "/verify-email", "/forgot-password"];

  const hideUI = hideUIRoutes.includes(location.pathname)||location.pathname.startsWith("/reset-password");

    useEffect(() => {
    NProgress.start();

    // small delay for smoothness
    const timer = setTimeout(() => {
      NProgress.done();
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]);


  return (
    <>
      {!hideUI && <Navbar /> }

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/webinsight" element={<WebInsight />} /> */}
        <Route path="/webinsight"
          element={
            <ProtectedRoute>
              <WebInsight />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/pdfinsight" element={<PDFInsight />} /> */}

        <Route
          path="/pdfinsight"
          element={
            <ProtectedRoute>
              <PDFInsight />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/replyAI" element={<SmartReply />} /> */}
        <Route
          path="/replyAI"
          element={
            <ProtectedRoute>
              <SmartReply />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} /> */}
        <Route path="/reset-password" element={<ResetPassword />}/>



        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
            {!hideUI && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
