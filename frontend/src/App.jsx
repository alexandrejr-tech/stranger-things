import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CityDetails from "./pages/CityDetails";
import MyBookings from "./pages/MyBookings";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/style.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function HomeWrapper() {
  const smootherRef = useRef(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Home />
      </div>
    </div>
  );
}

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomeWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cidade/:id" element={<CityDetails />} />
            <Route path="/minhas-reservas" element={<MyBookings />} />
          </Routes>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
