import { useEffect, useState } from "react";
import { Nav, Footer, GiveDialog, type PageId, PAGES } from "./shared";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import Extensions from "./pages/Extensions";
import ImNew from "./pages/ImNew";
import { Events, Resources, Contact } from "./pages/Other";

function pageFromHash(): PageId {
  const id = window.location.hash.replace(/^#\//, "");
  return (PAGES.some((p) => p.id === id) ? id : "home") as PageId;
}

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const [give, setGive] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>
      <Nav page={page} onGive={() => setGive(true)} />
      <main id="main">
        {page === "home" && <Home />}
        {page === "who-we-are" && <WhoWeAre />}
        {page === "extensions" && <Extensions />}
        {page === "im-new" && <ImNew />}
        {page === "events" && <Events />}
        {page === "resources" && <Resources />}
        {page === "contact" && <Contact />}
      </main>
      <Footer onGive={() => setGive(true)} />
      <GiveDialog open={give} onOpenChange={setGive} />
    </div>
  );
}
