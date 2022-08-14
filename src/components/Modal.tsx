import { motion } from "framer-motion";
import React from "react";

type modalPropsType = {
  showModal: boolean;
 children : React.ReactNode
};
function Modal({
  showModal,
 children
}: modalPropsType) {
  const variants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      variants={variants}
      animate={showModal ? "opened" : "closed"}
      transition={{ duration: 0.2 }}
      className="w-full h-full z-50 fixed top-0 left-0 bg-opacity-40 bg-black flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl p-4 md:w-1/2 w-11/12 dark:bg-dark-color">
       {children}
      </div>
    </motion.div>
  );
}

export default Modal;
