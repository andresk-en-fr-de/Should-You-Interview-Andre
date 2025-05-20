import React, { useState } from "react";

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
    correct:
      "🤖 Automate boring stuff, save energy for UX fireworks 🎆⚡",
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
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (finished) {
    let message = "";
    if (score === questions.length) {
      message = "✅ Ok. You should definitely reach out to Andrej!";
    } else if (score >= 3) {
      message =
        "📅 Maybe a short online interview? Andrej wears shoes even for Zoom!";
    } else {
      message = "❌ Seems like not the right fit... or is he?";
    }

    return (
      <div className="App">
        <h2>🎯 Quiz Complete!</h2>
        <p>
          You got <b>{score}</b> out of <b>{questions.length}</b>
        </p>
        <p>{message}</p>
        <p className="thank-you">Thank you for answering the quiz 😊</p>
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
    );
  }

  return (
    <div className="App">
      <h2>{questions[current].text}</h2>
      <ul>
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
              setSelected(opt);
              if (opt === questions[current].correct) {
                setScore(score + 1);
              }

              setTimeout(() => {
                if (current === questions.length - 1) {
                  setFinished(true);
                } else {
                  setSelected(null);
                  setCurrent(current + 1);
                }
              }, 500);
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}
