import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

/* ─── Utilities ─────────────────────────────────────── */
const rand = (min, max) => Math.random() * (max - min) + min

/* ─── Star Field ────────────────────────────────────── */
function StarField() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: rand(0, 100),
    y: rand(0, 100),
    size: rand(0.8, 2.5),
    delay: rand(0, 5),
    duration: rand(2, 6),
  }))
  return (
    <div className="star-field">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Floating Particles (ambient) ─────────────────── */
function AmbientParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: rand(10, 90),
    size: rand(2, 6),
    delay: rand(0, 8),
    duration: rand(8, 18),
    color: i % 3 === 0
      ? 'rgba(255,94,0,0.7)'
      : i % 3 === 1
      ? 'rgba(255,140,30,0.6)'
      : 'rgba(255,165,0,0.4)',
  }))
  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Confetti Burst ────────────────────────────────── */
function ConfettiBurst({ active }) {
  if (!active) return null
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: rand(20, 80),
    color: [
      '#FF5E00', '#FF8C1E', '#FFA500',
      '#FFD700', '#fff', '#FF6B2C', '#FFC857',
    ][Math.floor(rand(0, 7))],
    size: rand(6, 14),
    duration: rand(1.8, 3.5),
    delay: rand(0, 0.6),
    rotate: rand(0, 360),
    drift: rand(-30, 30),
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: '10%',
            width: p.size,
            height: p.size * 0.45,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg) translateX(${p.drift}px)`,
            borderRadius: p.id % 3 === 0 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Gold Dust Particles (post-reveal) ─────────────── */
function GoldDust({ active }) {
  if (!active) return null
  const motes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: rand(15, 85),
    size: rand(2, 5),
    delay: rand(0, 3),
    duration: rand(5, 12),
  }))
  return (
    <div className="particles-container" style={{ zIndex: 4 }}>
      {motes.map(m => (
        <div
          key={m.id}
          className="particle"
          style={{
            left: `${m.x}%`,
            width: m.size,
            height: m.size,
            background: `rgba(212,175,55,${rand(0.4, 0.9).toFixed(2)})`,
            boxShadow: `0 0 ${m.size * 3}px rgba(212,175,55,0.8)`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Curtain Panel ─────────────────────────────────── */
const curtainVariants = {
  closed: () => ({
    x: '0%',
    transition: { duration: 0 },
  }),
  open: (side) => ({
    x: side === 'left' ? '-100%' : '100%',
    transition: {
      duration: 2.2,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
}

function CurtainPanel({ side, isOpen }) {
  return (
    <motion.div
      className={`curtain-panel ${side}`}
      custom={side}
      variants={curtainVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
    >
      <div className="curtain-fabric" />
      <div className="curtain-folds" />
      <div className="curtain-sheen" />
      <div className="curtain-fringe" />
      <div className="curtain-border" />
    </motion.div>
  )
}

/* ─── Revealed Title ────────────────────────────────── */
function RevealedTitle({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="revealed-stage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: 'easeOut' }}
        >
          <AmbientParticles />
          <GoldDust active={visible} />

          {/* Spotlights */}
          <div className="spotlight" />
          <div className="spotlight-inner" />
          <div className="stage-bg" />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.6, duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            <motion.p
              className="strive-intro"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ delay: 2.2, duration: 1 }}
            >
              Proudly Presents
            </motion.p>

            <div className="strive-divider" style={{ marginTop: 12 }} />

            <motion.h1
              className="strive-title"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              STRIVE
            </motion.h1>

            <div className="strive-divider" style={{ marginBottom: 12 }} />

            <motion.p
              className="strive-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.9 }}
            >
              Inauguration Ceremony
            </motion.p>

            <motion.p
              className="strive-intro"
              style={{ marginTop: 20 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 1 }}
            >
              ✦ &nbsp; 2026 &nbsp; ✦
            </motion.p>

            <motion.div
              className="event-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.3, duration: 1 }}
            >
              <p className="event-tagline">Showcasing Student Innovation and Engineering Excellence</p>
              <div className="event-info">
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <span>24th March 2026 | Tuesday</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <span>Kalam Centre | Seminar Hall and Atrium</span>
                </div>
              </div>
              <p className="event-cta">Explore real projects. Meet creators. Get inspired.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Flash Overlay ─────────────────────────────────── */
function FlashOverlay({ flash }) {
  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          className="flash-overlay"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  )
}

/* ─── Enter Button ──────────────────────────────────── */
function EnterButton({ onEnter, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="enter-btn-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <button
            id="enter-btn"
            className="enter-btn"
            onClick={onEnter}
            aria-label="Enter the event"
          >
            <div className="btn-shimmer" />
            <span className="btn-text">⟵ Enter ⟶</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Center Stage (pre-reveal) ─────────────────────── */
function CenterStage({ onEnter, curtainOpen }) {
  return (
    <div className="center-stage">
      <AnimatePresence>
        {!curtainOpen && (
          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Something extraordinary awaits
          </motion.p>
        )}
      </AnimatePresence>

      <EnterButton onEnter={onEnter} visible={!curtainOpen} />

      <AnimatePresence>
        {!curtainOpen && (
          <motion.p
            className="tagline"
            style={{ fontSize: '0.6rem', opacity: 0.35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Press Enter to reveal
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main App ──────────────────────────────────────── */
export default function App() {
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [flash, setFlash] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const handleEnter = useCallback(() => {
    if (curtainOpen) return
    setFlash(true)
    setTimeout(() => setFlash(false), 600)
    setCurtainOpen(true)
    setTimeout(() => setShowTitle(true), 800)
    setTimeout(() => setConfetti(true), 1800)
    setTimeout(() => setConfetti(false), 4500)
  }, [curtainOpen])

  // Keyboard shortcut — Enter key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && !curtainOpen) handleEnter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [curtainOpen, handleEnter])

  return (
    <div className="curtain-scene">
      {/* Background */}
      <div className="backdrop" />
      <StarField />
      <AmbientParticles />

      {/* Curtain Valance (top rail) */}
      <div className="curtain-valance" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15 }}>
        <div className="valance-pattern" />
      </div>

      {/* Revealed content (behind curtains) */}
      <RevealedTitle visible={showTitle} />

      {/* Curtain Panels */}
      <CurtainPanel side="left" isOpen={curtainOpen} />
      <CurtainPanel side="right" isOpen={curtainOpen} />

      {/* Center overlay (button) */}
      <CenterStage onEnter={handleEnter} curtainOpen={curtainOpen} />

      {/* Effects */}
      <FlashOverlay flash={flash} />
      <ConfettiBurst active={confetti} />
    </div>
  )
}
