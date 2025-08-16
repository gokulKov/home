import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./styles.css";
import introVideo from "./VID_20250816_111840_471_bsl (1).mp4";
import bgAudioUrl from "./hindu-temple-calm-instrumental-music-252547.mp3";

const WelcomeModal = ({ open, onSubmit, initialName }) => {
  const [name, setName] = React.useState(initialName || "");
  React.useEffect(() => {
    if (open) setName(initialName || "");
  }, [initialName, open]);
  if (!open) return null;
  return (
    <div className="modal-bg" role="dialog" aria-modal="true" aria-label="பெயர் உள்ளிடு">
      
    </div>
  );
};

// Intro video modal: plays once on load and closes automatically when ended
const IntroVideoModal = ({ open, onEnded, onVideoPlay, audioPrompt, onEnableAudio }) => {
  React.useEffect(() => {
    const setDVH = () => {
      const dvhPx = (window.visualViewport ? window.visualViewport.height : window.innerHeight) / 100;
      document.documentElement.style.setProperty('--app-dvh', dvhPx + 'px');
    };
    if (open) {
      setDVH();
      window.addEventListener('resize', setDVH);
      window.addEventListener('orientationchange', setDVH);
    }
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('resize', () => {});
      window.removeEventListener('orientationchange', () => {});
    };
  }, [open]);
  if (!open) return null;
  return (
    <div className="modal-bg" style={{ background: "#000" }} role="dialog" aria-modal="true" aria-label="அறிமுக வீடியோ">
      <div className="modal-content intro-fullscreen" style={{ position: "relative" }}>
        <video
          className="intro-video"
          src={introVideo}
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onEnded={onEnded}
          onPlay={onVideoPlay}
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
    <button className="rsvp-btn" onClick={onClose} aria-label="வரவேற்பை மூடு">மூடு</button>
      </div>
    </div>
  );
};



// GrandWelcome removed per request (hand image and extra step eliminated)



// Minimal inline styles for better countdown UI (updated to glassmorphism)
const countdownStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
    flexWrap: "wrap"
  },
  box: {
  background: "rgba(255, 255, 255, 0.92)",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    borderRadius: 16,
    padding: "14px 18px",
    minWidth: 86,
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(31,38,135,0.25)",
    backdropFilter: "blur(8px) saturate(140%)",
    WebkitBackdropFilter: "blur(8px) saturate(140%)"
  },
  value: {
    fontSize: 40,
    fontWeight: 800,
  color: "#2e3a3f",
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1
  },
  label: {
    fontSize: 11,
    marginTop: 6,
  color: "rgba(46,58,63,0.9)",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  sep: {
    fontSize: 40,
    fontWeight: 700,
  color: "rgba(46,58,63,0.85)",
    lineHeight: 1,
    transform: "translateY(-2px)",
    userSelect: "none"
  }
};

// Small reusable box for each time unit (unchanged API)
const TimeBox = ({ value, label }) => (
  <div className="time-box" style={countdownStyles.box} aria-label={`${label} remaining`}>
    <div className="time-value" style={countdownStyles.value}>{String(value).padStart(2, "0")}</div>
    <div className="time-label" style={countdownStyles.label}>{label}</div>
  </div>
);

// New: visual separator between boxes (colon)
const TimeSep = () => <span aria-hidden="true" style={countdownStyles.sep}>:</span>;

// Add: compact action row styles for the icons under countdown
const actionRowStyles = {
  container: { display: "flex", gap: 12, marginTop: 12, justifyContent: "center", flexWrap: "wrap" },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e0e0e0",
    background: "#fff",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  },
  iconWrap: { width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center" }
};

// Replace contactStyles with pill-style rows
const contactStyles = {
  container: {
    display: "flex",
    gap: 12,
    marginTop: 16,
    width: "100%",
    maxWidth: 900,
    marginLeft: "auto",
    marginRight: "auto",
  justifyContent: "space-between",
  flexWrap: "nowrap"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "18px 2px",
    background: "#ffd675",
    borderRadius: 10,
    border: "1px solid #e6f0fa",
    boxShadow: "0 6px 18px rgba(219, 207, 40, 0.06)",
    transition: "transform 0.14s ease, box-shadow 0.14s ease",
    justifyContent: "center",
    flex: "1 1 0",
    minWidth: 0,
    maxWidth: 320,
    textAlign: "center"
  },
  left: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 'none' },
  text: { display: "flex", flexDirection: "column", alignItems: "center" },
  name: { fontSize: 17, fontWeight: 800, color: "#023e8a", lineHeight: 1, textAlign: "center" },
  phone: { fontSize: 15, color: "#0277bd", textDecoration: "none", fontWeight: 600, marginTop: 6, textAlign: "center" },
  actions: { display: "flex", alignItems: "center", gap: 8, marginLeft: 12 },
  waIcon: {
    padding: 8,
    borderRadius: "50%",
    background: "#25D366",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }
};

// Add: enhanced styles for better UI
const eventDetailsStyles = {
  container: {
    textAlign: "center",
    marginBottom: 20,
    maxWidth: 500,
    margin: "0 auto 20px"
  },
  hosts: {
    fontSize: 44,
    fontWeight: 700,
    color: "#2e3a3f",
    marginBottom: 12,
    textShadow: "0 1px 2px rgba(0,0,0,0.1)"
  },
  // English host should visually match the Tamil host styling
  hostsEn: {
    fontSize: 44,
    fontWeight: 700,
    color: "#2e3a3f",
    marginBottom: 12,
  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
  fontFamily: "'Costaline', 'Merriweather', 'Noto Serif', serif"
  },
  venue: {
    fontSize: 19,
    color: "#37474f",
    lineHeight: 1.4,
    marginBottom: 8,
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "#64b5f6"
  },
  // English venue should visually match the Tamil venue styling
  venueEn: {
    fontSize: 19,
    color: "#37474f",
    lineHeight: 1.4,
    marginTop: 6,
    textDecoration: "underline",
    textDecorationColor: "#64b5f6"
  },
  date: {
    display: "inline-block",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
    boxShadow: "0 4px 12px rgba(102,126,234,0.3)"
  },
  contactsHeader: {
    fontSize: 18,
    fontWeight: 700,
    color: "#4e342e",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  }
};

// set event to next month's 4th at 04:30 local time
const now = new Date();
const nextMonth4 = new Date(now.getFullYear(), now.getMonth() + 1, 4, 4, 30, 0);
const EVENT_DATE = nextMonth4.toISOString();

const HOSTS = "மரகதம் இல்லம்";
const HOSTS_EN = "Maragatham Illam";
const VENUE = "ஆறுபடை நகர் கட்டம் 2, சக்தி பள்ளி பின்புறம், செட்டிபாளையம் சாலை, கோயம்புத்தூர் -641 201";
const VENUE_EN = "Aruppadai Nagar Block 2, Behind Sakthi School, Chettipalayam Road, Coimbatore - 641 201";
const WHATSAPP = "917010093030";
const MAP_QUERY = "https://www.google.com/maps?q=10.938145,77.0251867&z=17&hl=en";

// Add: contacts
const CONTACTS = [
  { name: "Ruthra N", display: "+91 70100 93030", phone: "917010093030" },
  { name: "Arun N",            display: "+91 63824 68712", phone: "916382468712" },
  { name: "Gowtham N",         display: "+91 877 804 7393", phone: "918778047393" }
];

function getCountdown(target) {
  const now = new Date();
  const end = new Date(target);
  const diff = end - now;
  if (diff <= 0) return { days: 4, hours: 0, minutes: 0, seconds: 0 };
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
  // Pooja time now uses the same target as main countdown
  const POOJA_TIME = EVENT_DATE;
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

// Add: format date function
const formatEventDate = (isoString) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('ta-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' ' + date.toLocaleTimeString('ta-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return "விரைவில்...";
  }
};

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown(EVENT_DATE));
  const [introOpen, setIntroOpen] = useState(true);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [greetOpen, setGreetOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const audioRef = React.useRef(null);
  const [audioPrompt, setAudioPrompt] = useState(false);
  // Add: local pooja timer state/effect
  const [showPoojaTimer, setShowPoojaTimer] = useState(false);
  const POOJA_TIME = EVENT_DATE; // use same target as main countdown
  const [poojaCountdown, setPoojaCountdown] = useState(getCountdown(POOJA_TIME));

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
        "வணக்கம்! Gruhapravesam for " + HOSTS
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
  // prefill name input with 'popp' when intro finishes
  setGuestName("popp");
  tryPlayAudio();
  };

  // Update: add effect for pooja timer
  useEffect(() => {
    if (!showPoojaTimer) return;
    const t = setInterval(() => setPoojaCountdown(getCountdown(POOJA_TIME)), 1000);
    return () => clearInterval(t);
  }, [showPoojaTimer]);

  return (
    <div className="app-bg">
      <main className="main-content" aria-label="Main Content">
        <motion.section
          className="event-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="tamil-title"><span className="tamil-first">கிருஹப்பிரவேசம்</span> <span className="tamil-second">விழா</span></h1>
          
          {/* Enhanced event details */}
          <div className="event-details" style={eventDetailsStyles.container}>
            <motion.div 
              style={eventDetailsStyles.hosts}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {HOSTS}
            </motion.div>
            

            
            <motion.div
              style={eventDetailsStyles.venue}
             // onClick={() => window.open(MAP_QUERY, "_blank")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
               {VENUE}
            </motion.div>


              <div style={eventDetailsStyles.hostsEn}>{HOSTS_EN}</div>
              <div style={eventDetailsStyles.venueEn}>{VENUE_EN}</div>
<br />
            <motion.div
              style={eventDetailsStyles.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              🗓️ {formatEventDate(EVENT_DATE)}
            </motion.div>

            {/* Enhanced contacts section */}
            <motion.div
              style={eventDetailsStyles.contactsHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span>📞</span>
              <span>தொடர்பு</span>
            </motion.div>
            
            <div className="contacts" style={contactStyles.container}>
              {CONTACTS.map((contact, index) => (
                <motion.div
                  key={contact.phone}
                  style={contactStyles.item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  whileHover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 28px rgba(2,136,209,0.12)"
                  }}
                >
                  <div style={contactStyles.left}>
                    {/* icon removed per request */}
                    <div style={contactStyles.text}>
                      <span style={contactStyles.name}>{contact.name}</span>
                      <a
                        href={`tel:+${contact.phone}`}
                        style={contactStyles.phone}
                        aria-label={`${contact.name} தொலைபேசி`}
                      >
                        {contact.display}
                      </a>
                    </div>
                  </div>

                  <div style={contactStyles.actions} aria-hidden="true" aria-label="no contact actions">
                    {/* WhatsApp icon removed */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="countdown"
            role="timer"
            aria-live="polite"
            aria-label="கவுண்ட்டவுன்"
            style={countdownStyles.container}
          >
            <TimeBox value={countdown.days} label="நாள்" />
            <TimeSep />
            <TimeBox value={countdown.hours} label="மணி" />
            <TimeSep />
            <TimeBox value={countdown.minutes} label="நிமி" />
            <TimeSep />
            <TimeBox value={countdown.seconds} label="வி" />
          </div>

          {/* Add: action row with WhatsApp + Pooja + Map */}
          <div style={actionRowStyles.container} aria-label="இணை செயல்கள்">
            <button
              style={{ ...actionRowStyles.btn, borderColor: "#25D36633" }}
              aria-label="வாட்ஸ்அப் RSVP"
              onClick={handleRSVP}
            >
              <span style={actionRowStyles.iconWrap} aria-hidden="true">
                {/* WhatsApp SVG */}
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#25D366" d="M27.6 4.4A15.8 15.8 0 1 0 4.4 27.6L3 31l3.6-1.3A15.8 15.8 0 1 0 27.6 4.4Z"/>
                  <path fill="#fff" d="M24.4 17.8c-.2-.3-1.1-.6-1.8-.7-.5-.1-1-.1-1.4.4-.4.5-1 1.2-1.2 1.3-.2.1-.6.2-1.1 0-.5-.2-2-1-3.7-2.9-1.4-1.6-1.8-2.9-2-3.4-.2-.5 0-.8.2-1 .2-.2.5-.6.7-.9.2-.3.3-.5.4-.8.1-.3 0-.6 0-.8 0-.2-.4-1.4-.8-2-.2-.5-.5-.6-.8-.6h-.7c-.2 0-.7.1-1.1.6-.4.5-1.4 1.3-1.4 3.2 0 1.9 1.4 3.7 1.6 3.9.2.3 2.8 4.4 6.8 6.2 4 .1 4.2.1 5.2-.4 1-.5 2.3-1.7 2.4-3 .1-1.3-.1-1.3-.1-1.3Z"/>
                </svg>
              </span>
              <span>WhatsApp</span>
            </button>
           
            {/* New: Map button */}
            <button
              style={{ ...actionRowStyles.btn, borderColor: "#64b5f633" }}
              aria-label="வரைபடம் திறக்க"
              onClick={() => window.open(MAP_QUERY, "_blank")}
            >
              <span style={actionRowStyles.iconWrap} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3C10.9 3 7 6.9 7 12c0 6.2 7.2 14.4 8.9 16.2.6.7 1.6.7 2.2 0C17.8 26.4 25 18.2 25 12c0-5.1-3.9-9-9-9Z" fill="#64b5f6"/>
                  <circle cx="16" cy="12" r="3.5" fill="#fff"/>
                </svg>
              </span>
              <span>வரைபடம்</span>
            </button>
          </div>

          {/* New: Contact Info */}
         
        </motion.section>
        <IntroVideoModal
          open={introOpen}
          onEnded={handleIntroEnded}
          onVideoPlay={() => { if (audioOn) tryPlayAudio(); }}
          audioPrompt={audioPrompt}
          onEnableAudio={() => { setAudioOn(true); tryPlayAudio(); }}
        />
  <WelcomeModal open={welcomeOpen} onSubmit={handleNameSubmit} initialName={guestName} />
        
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

    </div>
  );
}
