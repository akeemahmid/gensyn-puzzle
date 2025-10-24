"use client";

import { observer } from "mobx-react-lite";
import store from "./store/puzzleStore";
import Guesspage from "@/components/Guess";
import Querypage from "@/components/Query";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiX } from "react-icons/pi";

const Home = observer(() => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    store.init();
    window.addEventListener("keyup", store.handleKeyup);
    return () => window.removeEventListener("keyup", store.handleKeyup);
  }, []);

  useEffect(() => {
    if (store.won || store.lost) {
      setOpen(true);
    }
  }, [store.won, store.lost]);

  return (
    <div className="flex w-full flex-col items-center justify-center mt-5 overflow-hidden">
      {store.guesses.map((_, i) => (
        <Guesspage
          key={i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}

      <Querypage store={store} />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="badge-title"
                className="bg-[#1d1d1e] rounded-3xl flex flex-col justify-center items-center gap-5 text-center w-auto md:w-[400px] md:max-w-[400px]  p-6 shadow-xs shadow-[#fad8d1e6]"
                initial={{ y: -12, scale: 0.98, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.18, ease: "easeOut" },
                }}
                exit={{
                  y: 12,
                  scale: 0.98,
                  opacity: 0,
                  transition: { duration: 0.12 },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between w-full">
                  <h2 className="font-bold text-2xl text-white">Result</h2>
                  <button
                    className=" text-3xl font-bold text-red-600"
                    onClick={() => setOpen(false)}
                  >
                    <PiX />
                  </button>
                </div>

                <div className="mt-4 font-semibold text-xl">
                  {store.won
                    ? "🎉 Congratulation, you won!"
                    : store.lost
                    ? "💀 You lost! Try again"
                    : `Guess the ${store.wordLength}-letter word`}
                </div>

                {(store.won || store.lost) && (
                  <button
                    onClick={() => {
                      store.init();
                      setOpen(false);
                    }}
                    className="mt-4 px-6 py-2 bg-transparent text-white rounded-lg hover:bg-[#fad8d133] border-[#fad8d1e6] border-2 text-xl transition"
                  >
                    Play Again
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Home;
