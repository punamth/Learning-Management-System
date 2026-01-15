import type{ FC } from "react";
import {useState } from "react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number; 
}

const sampleQuestions: Question[] = [
  {
    id: "q1",
    question: "What does TS stand for?",
    options: ["TypeScript", "TinyScript", "TextScript", "TestScript"],
    correct: 0,
  },
  {
    id: "q2",
    question: "Which hook is used for state in React?",
    options: ["useEffect", "useState", "useReducer", "useContext"],
    correct: 1,
  },
];

const TestView: FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qId: string, optionIndex: number) => {
    setAnswers({ ...answers, [qId]: optionIndex });
  };

  const score = Object.keys(answers).reduce((acc, key) => {
    const q = sampleQuestions.find((q) => q.id === key);
    if (q && answers[key] === q.correct) return acc + 1;
    return acc;
  }, 0);

  return (
    <section className="bg-blue-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Course Test</h1>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            {sampleQuestions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">{q.question}</h2>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={q.id}
                        value={i}
                        onChange={() => handleChange(q.id, i)}
                        className="text-teal-400"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="bg-teal-400 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-teal-500"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Your Score: {score}/{sampleQuestions.length}</h2>
            <p className="text-gray-700">
              {score === sampleQuestions.length
                ? "Excellent! You got all correct!"
                : "Keep learning and try again to improve your score."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestView;
