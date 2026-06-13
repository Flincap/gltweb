import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Nav, Footer, GiveDialog } from "./shared";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import Extensions from "./pages/Extensions";
import ImNew from "./pages/ImNew";
import { Events, Sermons, Contact } from "./pages/Other";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [give, setGive] = useState(false);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>
      <Nav onGive={() => setGive(true)} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/extensions" element={<Extensions />} />
          <Route path="/im-new" element={<ImNew />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sermons" element={<Sermons />} />
          {/* Old links keep working */}
          <Route path="/resources" element={<Navigate to="/sermons" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer onGive={() => setGive(true)} />
      <GiveDialog open={give} onOpenChange={setGive} />
    </BrowserRouter>
  );
}
