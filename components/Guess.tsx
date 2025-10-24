const Guesspage = ({ isGuessed, guess, word }) => {
  const length = word.length;

  return (
    <div
      className="mb-2 grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length }).map((_, i) => {
        const bgColor = !isGuessed
          ? "bg-black"
          : guess[i] === word[i]
          ? "bg-green-500"
          : word.includes(guess[i])
          ? "bg-yellow-400"
          : "bg-gray-700";

        return (
          <div
            key={i}
            className={`flex h-13 w-13 md:h-16 md:w-16 items-center justify-center border border-[#fad8d1e6] font-bold uppercase text-white ${bgColor}`}
          >
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
};

export default Guesspage;
