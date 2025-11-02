import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";
import "./App.css";

function App() {
  const [showMagic, setShowMagic] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const audioRef = useRef(null);

  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size: Math.random() * 2 + "px",
    delay: Math.random() * 5,
  }));

  const handleMoonClick = () => {
    setShowMagic(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
    setTimeout(() => setShowPhoto(true), 0);
  };

  return (
    <div className="App">
      {/* 🎵 Audio */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/audio/voice.mp3`}
        preload="auto"
      />

      {/* 🌠 Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: s.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* 💬 Tamil Quote */}
      <motion.div
        className="tamil-quote"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 4 }}
      >
        🌙{" "}
        <span className="highlight-text">
          பூமிக்கு இரவில் ஒளி தருவது நிலவாக இருக்கலாம், ஆனால் என் வாழ்வில் ஒளி
          தருவது என் நிலா நீ அல்லவா ஸ்ரீஜா💖
        </span>
      </motion.div>

      {/* 👈 Hand Indicator beside moon */}
      {!showMagic && (
        <motion.div
          className="hand-icon"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0, 1, 0.6, 1], x: [-10, 0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          👈
        </motion.div>
      )}

      {/* 🌕 Moon Container */}
      <motion.div
        className="moon"
        onClick={handleMoonClick}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/moon.jpg)`, // ✅ Your moon image
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          width: "250px",
          height: "250px",
          margin: "auto",
          boxShadow: showPhoto
            ? "0 0 60px 20px rgba(255,182,193,0.5)"
            : "0 0 40px 10px rgba(255,255,255,0.3)",
          filter: "brightness(0.9)",
          transition: "all 1s ease-in-out",
        }}
        animate={{
          boxShadow: showPhoto
            ? "0 0 100px 40px rgba(255,182,193,0.8)"
            : "0 0 50px 15px rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 3 }}
      >
        {/* 🩷 Her photo appears glowing inside moon */}
        {showPhoto && (
          <motion.img
            src={`${process.env.PUBLIC_URL}/her-photo.jpg`}
            alt="Her"
            className="moon-photo"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              filter: "brightness(1.1) contrast(1.2)",
              boxShadow: "0 0 50px rgba(255, 182, 193, 0.8)",
            }}
          />
        )}
      </motion.div>

      {/* 💞 Magic Effects */}
      {showMagic && (
        <>
          {/* Floating Hearts */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="heart"
              initial={{ top: "55%", left: "50%", scale: 0 }}
              animate={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                scale: 1,
                opacity: 0,
              }}
              transition={{ duration: 3 + Math.random() * 2, delay: i * 0.2 }}
            >
              <FaHeart />
            </motion.div>
          ))}

          {/* Floating Butterflies */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="butterfly"
              initial={{ top: "70%", left: "50%", scale: 0 }}
              animate={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                scale: 1,
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              <GiButterfly />
            </motion.div>
          ))}

          {/* 💖 Message */}
          <motion.div
            className="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 5 }}
          >
            💖 Happy Birthday Dii 💖 <br />
            என் அழகுப் பொண்டாட்டி 🌙🦋💞
          </motion.div>
        </>
      )}
    </div>
  );
}

export default App;
