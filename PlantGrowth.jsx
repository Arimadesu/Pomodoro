import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const PlantGrowth = ({ progress = 0 }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAiTip, setShowAiTip] = useState(false);
  const [prevProgress, setPrevProgress] = useState(progress);
  const audioRef = useRef(null);

  const aiTips = [
    "Set a 3-minute reflection goal before next session.",
    "Stretch your back before restarting.",
    "Close your eyes and take 3 deep breaths.",
    "Write down what you just accomplished.",
    "Drink a glass of water.",
  ];
  const [randomTip, setRandomTip] = useState(aiTips[0]);

  useEffect(() => {
    if (progress >= 100 && prevProgress < 100) {
      setShowPopup(true);
      setRandomTip(aiTips[Math.floor(Math.random() * aiTips.length)]);
      audioRef.current?.play();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => {
        setShowPopup(false);
        setShowAiTip(true);
      }, 3000);
      setTimeout(() => setShowAiTip(false), 10000);
    }
    setPrevProgress(progress);
  }, [progress, prevProgress]);

  const stages = [
    "/plants/stage-1.png",
    "/plants/stage-2.png",
    "/plants/stage-3.png",
    "/plants/stage-4.png",
  ];

  const safeProgress = isNaN(progress) ? 0 : progress;
  const index = Math.min(
    stages.length - 1,
    Math.floor((safeProgress / 100) * stages.length)
  );

  const message =
    safeProgress < 10
      ? "Your seed is sprouting..."
      : safeProgress < 60
      ? "Your tree is growing!"
      : "Almost full bloom!";

  return (
    <div className="flex flex-col items-center justify-between py-6 min-h-[240px] relative">
      <audio ref={audioRef} src="/success.mp3" preload="auto" />

      <motion.img
        src={stages[index]}
        alt={`Plant stage ${index + 1}`}
        className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: progress > prevProgress ? [0, -2, 2, -1, 1, 0] : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="w-40 mt-2 bg-slate-600 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-green-400 h-full"
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.6 }}
        ></motion.div>
      </div>

      <p className="text-sm text-gray-400 dark:text-gray-300 mt-2">
        Growth: {safeProgress.toFixed(0)}%
      </p>
      <p className="text-xs text-green-600 dark:text-green-300 italic mt-1">
        {message}
      </p>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute -top-4 sm:-top-6 bg-yellow-50 text-yellow-800 dark:bg-green-800/80 dark:text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold"
          >
            🎉 Great job! You’ve completed a focus session!
          </motion.div>
        )}

        {showAiTip && (
          <motion.div
            key="aitip"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-0 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm w-72 text-center"
          >
            💡 {randomTip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlantGrowth;
