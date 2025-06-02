import "./styles.css";
import { useState } from "react";

const questions = [
  {
    text: "What kind of developer are you hiring?",
    options: [
      "🧍 A quiet typer who waits for Jira tickets",
      "🎤 A communicator who can code, present, and interpret human languages",
    ],
    correct:
      "🎤 A communicator who can code, present, and interpret human languages",
  },
  {
    text: "How should your dev approach repetitive work?",
    options: [
      "⛓️ Manual grind – typing till the keyboard melts",
      "🤖 Automate boring stuff, save energy for UX fireworks 🎆⚡",
    ],
    correct: "🤖 Automate boring stuff, save energy for UX fireworks 🎆⚡",
  },
  {
    text: "What’s your view on Copilot-like tools?",
    options: [
      "🧠 They’re cheating! Real devs type everything.",
      "🚀 Smart tools = smart devs. Let the machine do its thing.",
    ],
    correct: "🚀 Smart tools = smart devs. Let the machine do its thing.",
  },
  {
    text: "Do you prefer someone who...",
    options: [
      "🧱 Stays in one place and one mindset",
      "🌍 Has seen the world, speaks many languages (both spoken and coded)",
    ],
    correct:
      "🌍 Has seen the world, speaks many languages (both spoken and coded)",
  },
  {
    text: "What’s your vibe when interviewing devs?",
    options: [
      "🧮 Just show me algorithms and LeetCode scores",
      "🎆⚡ Show me problem-solving skills and resourcefulness",
    ],
    correct: "🎆⚡ Show me problem-solving skills and resourcefulness",
  },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  if (finished) {
    const finalScore = score;
    let message = "";

    if (score === questions.length) {
      message =
        "✅ Ok. You should probably schedule some time to reach him right now!";
    } else if (score >= 3) {
      message =
        "📅 Ok. Maybe just online interview! (Andrej can be fully formally dressed! - Shoes included 😉)";
    } else {
      message = "❌ Seems cool, but I will think about it";
    }

    return (
      <div className="App">
        <div className="final-screen">
          <h2>🎯 Quiz Complete!</h2>
          <p className="score-line">
            Looks like you and Andrej agreed on <b>{score}</b> out of{" "}
            <b>{questions.length}</b> tough questions
          </p>

          <p className="final-message">{message}</p>
          <button
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setScore(0);
              setFinished(false);
            }}
          >
            🔄 Restart Quiz
          </button>
        </div>
        <p className="thank-you">Thank you for answering the quiz 😊</p>
      </div>
    );
  }

  return (
    <div className="App">
      {" "}
      <h2>{questions[current].text}</h2>
      <ul>
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
          >
            ⬅️ Previous
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setCurrent(current + 1);
            }}
            disabled={current === questions.length - 1}
          >
            Next ➡️
          </button>
        </div>

        {questions[current].options.map((opt, i) => (
          <li
            key={i}
            className={`answer-option ${
              selected === opt
                ? opt === questions[current].correct
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => {
              const isCorrect = opt === questions[current].correct;
              const newScore = isCorrect ? score + 1 : score;

              if (current === questions.length - 1) {
                setScore(newScore);
                setSelected(opt);
                // Delay finishing just one tick to ensure score updates
                setTimeout(() => setFinished(true), 0);
              } else {
                setScore(newScore);
                setSelected(null);
                setCurrent(current + 1);
              }
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}
