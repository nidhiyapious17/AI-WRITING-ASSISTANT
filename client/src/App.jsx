import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("");

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleToneChange(e) {
    setTone(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>AI Writing Assistant</h2>
      <label>Enter a rough text</label>
      <textarea value={text} onChange={handleTextChange}></textarea>

      <label>Set the tone</label>
      <select value={tone} onChange={handleToneChange}>
        <option value="professional">Professional</option>
        <option value="friendly">Friendly</option>
        <option value="concise">Concise</option>
      </select>

      <button>Improve Text</button>
    </form>
  );
}

export default App;
