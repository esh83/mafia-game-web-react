import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
type alertprops = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};
function Alert({ show, setShow, message }: alertprops) {
  console.log('rendered');
  
  const variants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  useEffect(() => {
    show &&
      setTimeout(() => {
        setShow(false);
      }, 2500);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          variants={variants}
          animate={show ? "opened" : "closed"}
          transition={{duration:0.3}}
          className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow bg-white text-black dark:text-white dark:bg-dark-color p-4 border-red-700 border-[1px]"
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Alert;
