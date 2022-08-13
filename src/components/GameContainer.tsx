import { motion } from "framer-motion";

type gameContainerProps = {
  children: React.ReactNode;
};
function GameContainer({ children }: gameContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 , y : -100}}
      animate={{ opacity: 1 , y : 0}}
      exit={{ opacity: 0  , y : -100}}
      transition={{ duration: 0.5 }}
      className="container w-full md:w-2/3 lg:w-1/2 mx-auto my-10 px-2"
    >
      {children}
    </motion.div>
  );
}

export default GameContainer;
