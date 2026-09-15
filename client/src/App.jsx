import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  return (
    <form>
      <h2>AI Writing Assistant</h2>
      <labl>Enter a rough text</labl>
      <textarea></textarea>

      <label>Set the tone</label>
      <select>
        <option>Professional</option>
        <option>Friendly</option>
        <option>Concise</option>
      </select>

      <button>Improve Text</button>
    </form>
  );
}

export default App;
