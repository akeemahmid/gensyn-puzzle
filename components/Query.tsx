"use client";

import { observer } from "mobx-react-lite";

const Querypage = observer(({ store }) => {
  const querty = ["qwertyu", "iopasdf", "ghjklzx", "cvbnm"];

  return (
    <div className="mt-6 select-none">
      {querty.map((row, i) => (
        <div key={i} className="flex justify-center gap-2 mb-2">
          {row.split("").map((char, j) => {
            const exactGuesses = store.exactGuesses ?? [];
            const inexactGuesses = store.inexactGuesses ?? [];
            const allGuesses = store.allGuesses ?? [];

            const bgcolor = exactGuesses.includes(char)
              ? "bg-green-400"
              : inexactGuesses.includes(char)
              ? "bg-yellow-400"
              : allGuesses.includes(char)
              ? "bg-gray-400"
              : "bg-gray-500";

            return (
              <button
                key={j}
                onClick={() => store.handleVirtualKey(char)}
                className={`flex md:h-12 md:w-12 w-10 h-10  items-center justify-center rounded-md font-semibold uppercase ${bgcolor} active:scale-95 transition`}
              >
                {char}
              </button>
            );
          })}
        </div>
      ))}

      {/* Extra row for Enter & Backspace */}
      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => store.handleVirtualKey("Enter")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold active:scale-95 transition"
        >
          Enter
        </button>
        <button
          onClick={() => store.handleVirtualKey("Backspace")}
          className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold active:scale-95 transition"
        >
          ⌫
        </button>
      </div>
    </div>
  );
});

export default Querypage;
