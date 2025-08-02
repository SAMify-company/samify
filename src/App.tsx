import React, { useEffect, useState } from 'react';
import Loading from './Components/Resuable/Loading';
import Cursor from './Components/Animations/Cursor';
import { useMediaQuery, useTheme } from '@mui/material';
import Footer from './Components/Sections/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTopButton from './Components/Animations/ScrollTop';

const Home = React.lazy(() => import("./Components/Pages/Home"));
const PrivacyPolicy = React.lazy(() => import("./Components/Pages/Privacypolicy"));
const Request = React.lazy(() => import("./Components/Pages/Request"));

const App = () => {
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [isDomReady, setIsDomReady] = useState(false);

  // scrolls to top on every route change
  function ScrollToTopOnRouteChange() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, [pathname]);
    return null;
  }

  useEffect(() => {
    const handleReady = () => setIsDomReady(true);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      handleReady();
    } else {
      document.addEventListener('DOMContentLoaded', handleReady);
    }
    return () => {
      document.removeEventListener('DOMContentLoaded', handleReady);
    }
  }, []);

  if (!isDomReady) {
    return <Loading />;
  }
  return (
    <Router>
      {lgScreen && <Cursor />}
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacypolicy" element={
          <React.Suspense fallback={<Loading />}>
            <PrivacyPolicy />
          </React.Suspense>
        } />
        <Route path="/request" element={
          <React.Suspense fallback={<Loading />}>
            <Request />
          </React.Suspense>} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </Router>
  );
}

export default App
