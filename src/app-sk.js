import "./styles.css";
import { useState } from "react";

const questions = [
  {
    text: "Akého vývojára chcete zamestnať?",
    options: [
      "🧍 Tichého písača, ktorý čaká na úlohy z Jiry",
      "🎤 Komunikátora, ktorý vie kódovať, prezentovať a rozumie ľudskej reči",
    ],
    correct:
      "🎤 Komunikátora, ktorý vie kódovať, prezentovať a rozumie ľudskej reči",
  },
  {
    text: "Ako by mal vývojár pristupovať k opakovanej práci?",
    options: [
      "⛓️ Manuálny grind – písanie kódu až do zhorenia klávesnice",
      "Automatizovať repetitívne veci 🤖, šetriť energiu na UX ohňostroje 🎆⚡",
    ],
    correct:
      "Automatizovať repetitívne veci 🤖, šetriť energiu na UX ohňostroje 🎆⚡",
  },
  {
    text: "Aký je Váš postoj k nástrojom ako AI?",
    options: [
      "Všetko musí uchádzač vedieť napísať ručne (bez googlenia, Stack Overflow, copilota).",
      "🚀 Smart nástroje = Smart developeri. Ak deliverujú, tak deliverujú - to je podstatné.",
    ],
    correct:
      "🚀 Smart nástroje = Smart developeri. Ak deliverujú, tak deliverujú - to je podstatné.",
  },
  {
    text: "Preferuješ niekoho, kto...",
    options: [
      "🧱 Zostáva na jednom mieste a v jednom mindsete",
      "🌍 Precestoval kus sveta, hovorí mnohými jazykmi (hovorenými aj programovacími)",
    ],
    correct:
      "🌍 Precestoval kus sveta, hovorí mnohými jazykmi (hovorenými aj programovacími)",
  },
  {
    text: "Aký máš prístup k pohovorom vývojárov?",
    options: [
      "🧮 Ukáž mi len algoritmy a LeetCode skóre",
      "🎆⚡ Ukáž mi schopnosti riešiť problémy a vynaliezavosť",
    ],
    correct:
      "🎆⚡ Ukáž mi schopnosti riešiť problémy a vynaliezavosť",
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
        "✅ Pravdepodobne by ste si mali naplánovať rozhovor s Andrejom hneď teraz!";
    } else if (score >= 3) {
      message =
        "📅 Možno len online pohovor! (Andrej môže byť úplne formálne oblečený – aj topánky 😉)";
    } else {
      message = "❌ Vyzerá v pohode, ale ešte to zvážim.";
    }

    return (
      <div className="App">
        <div className="final-screen">
          <h2>🎯 Kvíz dokončený!</h2>
          <p className="score-line">
            Vyzerá to, že vy a Andrej ste sa zhodli na <b>{score}</b> z{" "}
            <b>{questions.length}</b> náročných otázok
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
            🔄 Spustiť kvíz znova
          </button>
        </div>
        <p className="thank-you">Ďakujem za vyplnenie kvízu 😊</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>{questions[current].text}</h2>
      <ul>
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
          >
            ⬅️ Predchádzajúca
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setCurrent(current + 1);
            }}
            disabled={current === questions.length - 1}
          >
            Ďalej ➡️
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
