"use client";

import React from "react";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const FramerTest = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item}></motion.div>
      <motion.div variants={item}>koirem</motion.div>
    </motion.div>
  );
};

export default FramerTest;
