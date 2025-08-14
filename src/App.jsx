
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./styles.css";
import introVideo from "./lv_0_20250814143730.mp4";
import bgAudioUrl from "./hindu-temple-calm-instrumental-music-252547.mp3";

const WelcomeModal = ({ open, onSubmit }) => {
  const [name, setName] = React.useState("");
  if (!open) return null;
  return (
  <div className="modal-bg" role="dialog" aria-modal="true" aria-label="பெயர் உள்ளிடு">
      <div className="modal-content">
        <h2 className="modal-title">உங்கள் பெயரை உள்ளிடவும்</h2>
        <input
          className="name-input"
          type="text"
          placeholder="பெயர் / Name"
          value={name}
          onChange={e => setName(e.target.value)}
      aria-label="உங்கள் பெயரை உள்ளிடவும்"
        />
        <button
          className="rsvp-btn"
          onClick={() => name && onSubmit(name)}
      aria-label="பெயரை சமர்ப்பிக்கவும்"
        >
      சமர்ப்பி
        </button>
      </div>
    </div>
  );
};

// Intro video modal: plays once on load and closes automatically when ended
const IntroVideoModal = ({ open, onEnded, onVideoPlay, audioPrompt, onEnableAudio }) => {
  if (!open) return null;
  return (
    <div className="modal-bg" style={{ background: "#000" }} role="dialog" aria-modal="true" aria-label="அறிமுக வீடியோ">
      <div
        className="modal-content"
        style={{
          padding: 0,
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          borderRadius: 0,
          background: "#000",
          position: "relative"
        }}
      >
        <video
          src={introVideo}
          autoPlay
          muted
          playsInline
          onEnded={onEnded}
          onPlay={onVideoPlay}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />
        {audioPrompt && (
          <button
            onClick={onEnableAudio}
            aria-label="ஒலியை இயக்கு"
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            ஒலி இயக்கு
          </button>
        )}
        <button
          onClick={onEnded}
          aria-label="வீடியோவை தவிர்க்க"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.4)",
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          தவிர்க்க
        </button>
      </div>
    </div>
  );
};

// Greeting modal shown after name submission
const GreetingModal = ({ open, name, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-bg" role="dialog" aria-modal="true" aria-label="வரவேற்பு செய்தி">
      <div className="modal-content welcome-anim">
        <h2 className="tamil-title">வணக்கம் {name}!</h2>
        <p className="subtitle">எங்கள் கிருஹபிரவேச விழாவிற்கு உங்களை அன்புடன் அழைக்கிறோம்.</p>
        <p style={{ marginTop: 8, color: "#6d4c41" }}>
          தாங்கள் கலந்து கொண்டு விழாவை சிறப்பிக்கவும்.
        </p>
        <button className="rsvp-btn" onClick={onClose} aria-label="வரவேற்பை மூடு">Close</button>
      </div>
    </div>
  );
};



// GrandWelcome removed per request (hand image and extra step eliminated)



// ...existing code...

const EVENT_DATE = "2025-09-15T10:30:00+05:30"; // TODO: Replace with actual date/time
const HOSTS = "[Maragatham Illam]"; // TODO: Replace with actual family name
const VENUE = "[Venue Address, City, State]"; // TODO: Replace with actual venue
const WHATSAPP = "919876543210"; // TODO: Replace with actual WhatsApp number
const MAP_QUERY = "[Google Maps query or embed link]"; // TODO: Replace with actual map link

function getCountdown(target) {
  const now = new Date();
  const end = new Date(target);
  const diff = end - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const Gallery = () => {
  const [showGallery, setShowGallery] = React.useState(false);
  const [showPoojaTimer, setShowPoojaTimer] = React.useState(false);
  // Dummy images for sharing
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  ];
  // Pooja time (example: 2025-09-15T11:00:00+05:30)
  const POOJA_TIME = "2025-09-15T11:00:00+05:30";
  const [poojaCountdown, setPoojaCountdown] = React.useState(getCountdown(POOJA_TIME));
  React.useEffect(() => {
    if (showPoojaTimer) {
      const timer = setInterval(() => {
        setPoojaCountdown(getCountdown(POOJA_TIME));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showPoojaTimer]);

  return (
    <section className="gallery" aria-label="Gallery">
      <motion.div
        className="gallery-card"
        whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        aria-label="Home"
        onClick={() => setShowGallery(true)}
      >
  <span className="gallery-emoji" title="முகப்பு">🏡</span>
      </motion.div>
      <motion.div
        className="gallery-card"
        whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
  aria-label="தீபம்"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
  <span className="gallery-emoji" title="தீபம்" onClick={() => setShowPoojaTimer(true)} style={{ cursor: "pointer" }}>🪔</span>
        <span
          className="map-icon"
          role="button"
          tabIndex={0}
          aria-label="வரைபடம் திறக்க"
          title="வரைபடம் திறக்க"
          style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
          onClick={() => window.open(MAP_QUERY, "_blank")}
          onKeyPress={e => { if (e.key === 'Enter') window.open(MAP_QUERY, "_blank"); }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="12" rx="7" ry="7" fill="#64b5f6" />
            <ellipse cx="16" cy="12" rx="4" ry="4" fill="#fff" />
            <path d="M16 19C11 19 9 23 16 29C23 23 21 19 16 19Z" fill="#e57373" />
            <circle cx="16" cy="12" r="2" fill="#e57373" />
          </svg>
        </span>
      </motion.div>

  {/* கேலரி பகிர்வு மொடல் */}
      {showGallery && (
    <div className="modal-bg" role="dialog" aria-modal="true" aria-label="கேலரி படங்கள்">
          <div className="modal-content">
    <h2>கேலரி படங்களை பகிரவும்</h2>
            <div style={{ display: "flex", gap: 16 }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: 120, borderRadius: 8 }} />
      <button style={{ marginTop: 8 }} onClick={() => window.open(img, "_blank")}>பகிர்</button>
                </div>
              ))}
            </div>
    <button className="close-btn" style={{ marginTop: 16 }} onClick={() => setShowGallery(false)}>Close</button>
          </div>
        </div>
      )}

      {/* பூஜை நேரக் கணிப்பு மொடல் */}
      {showPoojaTimer && (
        <div className="modal-bg" role="dialog" aria-modal="true" aria-label="பூஜை நேரக் கணிப்பு">
          <div className="modal-content">
            <h2>பூஜை நேரக் கணிப்பு</h2>
            <div style={{ fontSize: 24, margin: "16px 0" }}>
              {poojaCountdown.days}d : {poojaCountdown.hours}h : {poojaCountdown.minutes}m : {poojaCountdown.seconds}s
            </div>
            <button className="close-btn" onClick={() => setShowPoojaTimer(false)}>மூடு</button>
          </div>
        </div>
      )}
    </section>
  );
};

// MapModal not used in this flow
const MapModal = () => null;

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown(EVENT_DATE));
  const [introOpen, setIntroOpen] = useState(true);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [greetOpen, setGreetOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const audioRef = React.useRef(null);
  const [audioPrompt, setAudioPrompt] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffb300", "#e57373", "#81c784", "#64b5f6"],
    });
    const timer = setInterval(() => {
      setCountdown(getCountdown(EVENT_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Try to start audio on first interaction due to autoplay policies
  useEffect(() => {
    const resumeAudio = () => {
      tryPlayAudio();
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
    };
    window.addEventListener('click', resumeAudio, { once: true });
    window.addEventListener('touchstart', resumeAudio, { once: true });
    return () => {
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
    };
  }, [audioOn]);

  const tryPlayAudio = () => {
    const a = audioRef.current;
    if (!a || !audioOn) return;
    a.play()
      .then(() => setAudioPrompt(false))
      .catch(() => setAudioPrompt(true));
  };

  const handleRSVP = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ffb300", "#e57373", "#81c784", "#64b5f6"],
    });
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        "வணக்கம்! Gruhapravesam RSVP for " + HOSTS
      )}`,
      "_blank"
    );
  };


  // Handle name submission from WelcomeModal
  const handleNameSubmit = (name) => {
  setGuestName(name);
  setWelcomeOpen(false);
  setGreetOpen(true);
  };

  const handleIntroEnded = () => {
    setIntroOpen(false);
    setWelcomeOpen(true);
  tryPlayAudio();
  };


  return (
    <div className="app-bg">
      <main className="main-content" aria-label="Main Content">
        <motion.section
          className="event-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="tamil-title">கிருஹபிரவேசம்</h1>
          <h2 className="event-title">கிருஹபிரவேச விழா</h2>
          <div className="event-details">
            <div className="event-hosts">{HOSTS}</div>
            <div className="event-venue">{VENUE}</div>
            <div className="event-date">{EVENT_DATE}</div>
          </div>
          <div className="countdown" aria-label="கவுண்ட்டவுன்">
            <span>{countdown.days} நாள்</span> : <span>{countdown.hours} மணி</span> : <span>{countdown.minutes} நிமி</span> : <span>{countdown.seconds} வி</span>
          </div>
          <div className="cta-row">
            <button className="rsvp-btn" onClick={handleRSVP} aria-label="வாட்ஸ்அப் RSVP">
              வாட்ஸ்அப் RSVP
            </button>
            <span
              className="map-icon"
              role="button"
              tabIndex={0}
              aria-label="வரைபடம் திறக்க"
              title="வரைபடம் திறக்க"
              style={{ cursor: "pointer", marginLeft: 16, display: "inline-flex", alignItems: "center" }}
              onClick={() => window.open(MAP_QUERY, "_blank")}
              onKeyPress={e => { if (e.key === 'Enter') window.open(MAP_QUERY, "_blank"); }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="16" cy="12" rx="7" ry="7" fill="#64b5f6" />
                <ellipse cx="16" cy="12" rx="4" ry="4" fill="#fff" />
                <path d="M16 19C11 19 9 23 16 29C23 23 21 19 16 19Z" fill="#e57373" />
                <circle cx="16" cy="12" r="2" fill="#e57373" />
              </svg>
            </span>
          </div>
        </motion.section>
  {/* Flow modals: Intro video -> name entry -> greeting */}
        <IntroVideoModal
          open={introOpen}
          onEnded={handleIntroEnded}
          onVideoPlay={() => { if (audioOn) tryPlayAudio(); }}
          audioPrompt={audioPrompt}
          onEnableAudio={() => { setAudioOn(true); tryPlayAudio(); }}
        />
        <Gallery />
      </main>
      <footer className="footer" aria-label="Footer">
        Made with <span aria-label="love">❤️</span> | <span className="footer-en">Made with love</span>
        <button
          style={{ marginLeft: 12, padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e0e0', cursor: 'pointer' }}
          aria-label={audioOn ? 'ஒலி நிறுத்து' : 'ஒலி இயக்கு'}
          onClick={() => {
            const next = !audioOn; setAudioOn(next);
            const a = audioRef.current; if (!a) return;
            if (next) { a.play().catch(() => {}); } else { a.pause(); }
          }}
        >
          {audioOn ? 'ஒலி நிறுத்து' : 'ஒலி இயக்கு'}
        </button>
      </footer>
      {/* Background audio (loop) */}
      <audio ref={audioRef} src={bgAudioUrl} loop preload="auto" />
  <WelcomeModal open={welcomeOpen} onSubmit={handleNameSubmit} />
  <GreetingModal open={greetOpen} name={guestName} onClose={() => setGreetOpen(false)} />
    </div>
  );
}
