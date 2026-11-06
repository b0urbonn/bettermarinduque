import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AboutBetterMarinduque from './components/home/AboutBetterMarinduque';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import ServiceGuide from './pages/ServiceGuide';
import Document from './pages/Document';
import Government from './pages/Government';
import Search from './pages/Search';
import Transparency from './pages/Transparency';
import MunicipalitiesPage from './pages/MunicipalitiesPage';
import MunicipalityPage from './pages/MunicipalityPage';
import { isMeilisearchEnabled } from './lib/meilisearch';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <main id="main-content" tabIndex={-1} className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/municipalities"
                  element={<MunicipalitiesPage />}
                />
                <Route
                  path="/municipalities/:slug"
                  element={<MunicipalityPage />}
                />
                <Route path="/about" element={<AboutBetterMarinduque />} />
                <Route path="/services/:category" element={<Services />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/:category/:documentSlug"
                  element={<ServiceGuide />}
                />
                <Route path="/government/:category" element={<Government />} />
                <Route path="/government" element={<Government />} />
                <Route
                  path="/government/:category/:documentSlug"
                  element={<Government />}
                />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/transparency/:slug" element={<Transparency />} />
                {isMeilisearchEnabled && (
                  <Route path="/search" element={<Search />} />
                )}
                <Route path="/:lang/:documentSlug" element={<Document />} />
                <Route path="/:documentSlug" element={<Document />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
