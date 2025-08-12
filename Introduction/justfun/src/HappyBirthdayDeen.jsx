import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";

export default function HappyBirthdayDeena() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Play music on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.warn("Autoplay failed — user interaction required.");
      });
    }
  }, []);

  const handleAddMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: uuidv4(), text: inputMessage }]);
      setInputMessage("");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-300 text-center overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} src="/assets/hbd-music.mp3" loop />

      {/* Confetti */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      {/* Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-pink-700 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        🎉 Happy Birthday Deena 🎉
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="mt-4 text-lg md:text-2xl text-gray-700 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Wishing you a magical day filled with love, joy, and sweet memories — from Astana to your heart ❤️
      </motion.p>

      {/* Balloons Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{ left: `${15 * i}%` }}
            initial={{ y: "100vh" }}
            animate={{ y: "-20vh" }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🎈
          </motion.div>
        ))}
      </div>

      {/* Wish Form */}
      <div className="mt-10 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Write your wish for Deena..."
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-pink-300"
        />
        <button
          onClick={handleAddMessage}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
        >
          Send
        </button>
      </div>

      {/* Messages Display */}
      <div className="mt-6 max-w-md w-full px-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className="bg-white bg-opacity-80 p-3 rounded-lg shadow mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
