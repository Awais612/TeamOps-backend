import chalk from "chalk";

const colors = [
  chalk.red,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
];

const LETTERS: Record<string, string[]> = {
  b: ["### ", "#  #", "### ", "#  #", "### "],
  z: ["####", "   #", "  # ", " #  ", "####"],
  c: [" ###", "#   ", "#   ", "#   ", " ###"],
  "7": ["####", "   #", "  # ", " #  ", " #  "],
  "2": [" ###", "   #", " ###", "#   ", "####"],
  "6": [" ###", "#   ", "####", "#  #", " ###"],
  " ": ["    ", "    ", "    ", "    ", "    "],
};

const textToGrid = (text: string) => {
  const rows = Array(5)
    .fill("")
    .map(() => "");
  for (const char of text) {
    const pattern = LETTERS[char] || LETTERS[" "];
    pattern.forEach((line, i) => {
      rows[i] += line + "  "; 
    });
  }
  return rows;
};

export const animateText = (text: string) => {
  const rows = textToGrid(text);
  const interval = setInterval(() => {
    console.clear();
    rows.forEach((row) => {
      let line = "";
      for (const ch of row) {
        if (ch === "#") {
          const color = colors[Math.floor(Math.random() * colors.length)];
          line += color("*");
        } else {
          line += " ";
        }
      }
      console.log(line);
    });
  }, 200);

  return () => clearInterval(interval);
};
