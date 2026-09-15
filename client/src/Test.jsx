import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3001";

export default function App() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function improveText() {
    if (!text.trim()) {
      setError("Enter some rough text first.");
      return;
    }
    setIsLoading(true);
    setError("");
    setCopied(false);
    setResult("");
    try {
      const response = await fetch(`${API_URL}/api/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data.result);
    } catch (err) {
      setError(err.message || "Could not improve the text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="app">
      <h1>AI Writing Assistant</h1>
      <label>Rough text</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a rough message..."
        maxLength={4000}
        rows={8}
      />
      <small>{text.length}/4000 characters</small>
      <label>Tone</label>
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="professional">Professional</option>
        <option value="friendly">Friendly</option>
        <option value="concise">Concise</option>
      </select>
      <button onClick={improveText} disabled={isLoading}>
        {isLoading ? "Improving..." : "Improve text"}
      </button>
      {error && (
        <section className="error" role="alert">
          <p>{error}</p>
          <button onClick={improveText} disabled={isLoading}>
            Retry
          </button>
        </section>
      )}
      {result && (
        <section className="result">
          <h2>Improved text</h2>
          <p>{result}</p>
          <button onClick={copyResult}>{copied ? "Copied" : "Copy"}</button>
        </section>
      )}
    </main>
  );
}
