import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      );
      setQuestions(response.data.questions);
    } catch (e) {
      alert("Failed to generate question.lease try again.");
    } finally {
      setLoading(true);
    }
  };
  return (
    <div className="p-6">
      <div className="relativ flex flex-col gap-4">
        <div className="relative flex flex-col mb-12">
          <label htmlFor="fileUplad" className="cursor-pointer inline-bloc text-[20px]">
            Upload Document
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="absolute top-[5px] left-0 text-gray-900 text-[20px]"
          />
        </div>
        <button
          onClick={handleUpload}
          className="p-3 w-fit h-fit whitespace-nowrap text-[16px] text-gray-900 hover:bg-gray-900 hover:text-white border-2 border-gray-900 rounded-md"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}
