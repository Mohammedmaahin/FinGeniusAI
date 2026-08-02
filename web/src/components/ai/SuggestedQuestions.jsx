const questions = [
  "How can I save more money?",
  "Am I spending too much?",
  "How can I reach my goals faster?",
  "Give me a monthly budget.",
  "How healthy are my finances?",
  "How should I reduce expenses?",
];

const SuggestedQuestions = ({ onAsk }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onAsk(q)}
          className="rounded-full bg-[#1F2937] px-4 py-2 text-white hover:bg-blue-600"
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;