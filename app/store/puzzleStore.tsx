import { makeAutoObservable } from "mobx";
import words from "../../words.json";

class PuzzleStore {
  word = "";
  guesses = [];
  currentGuess = 0;
  wordLength = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get won() {
    return this.guesses[this.currentGuess - 1] === this.word;
  }

  get lost() {
    return this.currentGuess >= 6;
  }

  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join("").split("");
  }

  get exactGuesses() {
    return this.word.split("").filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map((word) => word[i])
        .includes(letter);
    });
  }

  get inexactGuesses() {
    return this.word
      .split("")
      .filter((letter) => this.allGuesses.includes(letter));
  }

  init() {
    this.word = words[Math.floor(Math.random() * words.length)];
    this.wordLength = this.word.length;
    this.guesses = new Array(6).fill("");
    this.currentGuess = 0;
  }

  submitGuess() {
    const currentWord = this.guesses[this.currentGuess];
    if (currentWord.length === this.wordLength) {
      this.currentGuess += 1;
    }
  }

  handleKeyup = (e: KeyboardEvent) => {
    if (this.won || this.lost) return;

    if (e.key === "Enter") {
      return this.submitGuess();
    }

    if (e.key === "Backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        -1
      );
      return;
    }

    if (
      this.guesses[this.currentGuess].length < this.wordLength &&
      /^[a-zA-Z]$/.test(e.key)
    ) {
      this.guesses[this.currentGuess] += e.key.toLowerCase();
    }
  };

  handleVirtualKey(char: string) {
    if (this.won || this.lost) return;

    if (char === "Enter") {
      return this.submitGuess();
    }

    if (char === "Backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        -1
      );
      return;
    }

    if (
      this.guesses[this.currentGuess].length < this.wordLength &&
      /^[a-zA-Z]$/.test(char)
    ) {
      this.guesses[this.currentGuess] += char.toLowerCase();

      // Optional: light vibration for mobile
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(20);
      }
    }
  }
}

export default new PuzzleStore();
