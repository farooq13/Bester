import React from "react";
import axios from "axios";
import { useState, useRef } from "react";

export default function Upload({ onFileSelect, onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", "Generate quiz from this document");

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setQuiz(res.data.response);
    } catch (err) {
      console.log("Upload failed!", err);
      alert("Upload failed!");
    }
  };

  // const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);

      if (onUpload) onUpload(file);
    }
  };

  const handleChanage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);

      if (onUpload) onUpload(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col justify-center items-center mt-12 gap-4">
        <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            accept=".pdf, .docx, .txt, .png, .jpg"
            type="file"
            onChange={handleChanage}
            className="hidden"
          />

          <div
            className={`p-4 ${dragActive ? "bg-gray-400" : ""}`}
            onClick={() => inputRef.current.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <p className="border border-gray-500 text-gray-500 px-4 py-16 rounded-md">
              Drag & drop your document here or{" "}
              <span className="text-[16px] underline font-bold text-red-500 hover:cursor-pointer">
                browse
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
