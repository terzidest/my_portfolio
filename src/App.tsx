import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ScrollToTop from './utils/ScrollToTop'
import BackToTop from './components/common/BackToTop'
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion'

function App() {
  const location = useLocation()
  const reducedMotion = usePrefersReducedMotion()

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        {reducedMotion ? (
          routes
        ) : (
          // Fade between routes. `initial={false}` skips the fade on first
          // load so it doesn't double up with each page's own entrance.
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {routes}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
