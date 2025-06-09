import React from "react";
import { useState } from "react";
import Upload from "./Upload";
import Quiz from "./Quiz";
import axios from "axios";
import { parseQuizText } from "../../utils/parseQuizText";

export default function Home() {
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "prompt",
      `Generate ${numQuestions} unique multiple-choice questions from this document. Each should have 4 options and one correct answer. Avoid repeating previous versions.`
    );
    formData.append("numQuestions", numQuestions);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const parseQuiz = parseQuizText(res.data.quiz);
      console.log("Raw quiz data:", res.data.quiz);
      console.log("Parse Quiz:", parseQuiz);
      setQuiz(parseQuiz);
      setQuizStarted(true);
    } catch (err) {
      console.log("Upload failed!", err);
    } finally {
      setLoading(false);
    }
  };

  if (quizStarted) {
    return <Quiz quizData={quiz} />;
  }

  return (
    <div className="flex justify-center">
      <div className="mt-20 max-w-4xl text-center">
        <h2 className="text-orange-700 font-bold text-4xl md:text-5xl">
          Stay sharp, think fast, and have fun!
        </h2>

        <Upload onFileSelect={handleFileSelect} />
        {file && <p className="mt-2 text-sm text-gray-700">Selected: {file.name}</p>}

        <div className="my-4">
          <label htmlFor="numQuestions" className="mr-2 font-medium">
            Number of Questions:
          </label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            min={1}
            max={20}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="border rounded px-3 py-1 w-20"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`ml-64 mr-64 whitespace-nowrap mt-6 px-12 py-3 text-lg rounded-md transition font-semibold border-2 border-gray-900 flex items-center justify-center gap-2 ${
            file && !loading
              ? "text-gray-900 hover:bg-gray-900 hover:text-white"
              : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>
    </div>
  );
}
