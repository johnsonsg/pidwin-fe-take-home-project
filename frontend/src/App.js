import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const solutionsVal = [{ id: 1, word: "games" }];
    const randomIndex = Math.floor(Math.random() * solutionsVal.length);
    setSolution(solutionsVal[randomIndex].word);
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
