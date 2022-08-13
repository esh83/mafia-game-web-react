import { useEffect } from "react";
import { toggleTheme } from "../app/features/themeSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <motion.div
      initial={{ opacity: 0 , y : -100}}
      animate={{ opacity: 1 , y : 0}}
      exit={{ opacity: 0  , y : -100}}
      transition={{ duration: 0.5 }}
      className="container w-full md:w-2/3 lg:w-1/2 mx-auto my-10 px-2"
    >
      <div className="py-5 container  dark:bg-slate-900 flex flex-col justify-center items-center space-y-5">
      <img src={"MAFIA-1.png"} className="rounded-full max-w-[200px]" />
      <Link
        to="game/start"
        className="bg-primary-1 w-52 text-center text-white p-3 rounded-md"
      >
        شروع بازی
      </Link>
      <Link
        to="learn"
        className="bg-primary-1 w-52 text-center text-white p-3 rounded-md"
      >
        آموزش بازی
      </Link>
      <Link
        to="contact"
        className="bg-primary-1 w-52 text-center text-white p-3 rounded-md"
      >
        ارتباط با ما
      </Link>
      <button onClick={() => dispatch(toggleTheme())}>
        {isDark ? (
          <span className="flex felx-row text-white">
            تم روشن
            <SunIcon className="w-5 h-5 text-yellow-400 mr-1" />
          </span>
        ) : (
          <span className="flex felx-row">
            تم تیره
            <MoonIcon className="w-5 h-5 text-yellow-400 mr-1" />
          </span>
        )}
      </button>
    </div>
    </motion.div>
   
  );
}

export default Home;
