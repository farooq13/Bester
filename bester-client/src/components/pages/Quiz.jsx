import React from 'react';
import { useState } from "react"

export default function Quiz({ quizData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Guard against empty or invalid quizData
  if (!quizData || quizData.length === 0 || !quizData[currentQuestion]) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        No quiz data available.
      </div>
    );
  }

  const current = quizData[currentQuestion];

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    setSelectedOption(index);
    setShowExplanation(true);

    const correctSound = new Audio("/correct.wav");
    const wrongSound = new Audio("/wrong.wav");

    if (index === current.correctAnswer) {
      correctSound.play();
    } else {
      wrongSound.play();
    }

    setTimeout(() => {
      if (index === current.correctAnswer) {
        setScore((prev) => prev + 1);
      }

      setSelectedOption(null);
      setShowExplanation(false);

      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowScore(true);
      }
    }, 2200);
  };

  const handleNext = () => {
    if (selectedOption === current.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    setShowExplanation(false);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="mt-16 p-4 text-center font-semibold text-3xl">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="mt-2 text-lg">
          You scored {score} out of {quizData.length}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-all"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">
        Question {currentQuestion + 1} of {quizData.length}
      </h3>
      <p className="mb-6 font-medium">{current.question}</p>

      {current.options.map((option, index) => {
        let optionClass = "bg-white";

        if (selectedOption !== null) {
          if (index === selectedOption) {
            optionClass =
              index === current.correctAnswer
                ? "bg-green-300"
                : "bg-red-300";
          } else if (index === current.correctAnswer) {
            optionClass = "bg-green-200";
          }
        }

        return (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={selectedOption !== null}
            className={`block w-full text-left border px-4 py-2 mb-3 rounded-md ${optionClass}`}
          >
            {option}
          </button>
        );
      })}

      {showExplanation && current.explanation && (
        <div className="mt-4 text-sm italic text-gray-700 border-t pt-3">
          <strong>Explanation:</strong> {current.explanation}
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`mt-4 px-6 py-2 rounded-md ${
          selectedOption !== null
            ? "bg-gray-900 text-white hover:bg-gray-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {currentQuestion + 1 < quizData.length ? "Next" : "Finish"}
      </button>
    </div>
  );
}
