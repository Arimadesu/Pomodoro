import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const generateLeaves = (count) => {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    leaves.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    });
  }
  return leaves;
};

export default function LeafParticles() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(generateLeaves(12));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.img
          key={leaf.id}
          src="/leaf.svg"
          alt="leaf"
          initial={{ y: -50, x: leaf.left + "%", opacity: 0 }}
          animate={{ y: "110%", opacity: [0.2, 0.5, 0] }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
          }}
          className="absolute w-4 h-4 opacity-30"
          style={{ left: `${leaf.left}%` }}
        />
      ))}
    </div>
  );
}
