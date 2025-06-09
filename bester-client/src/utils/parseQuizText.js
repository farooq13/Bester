export function parseQuizText(text) {
  const quiz = [];
  const lines = text.split("\n").map((line) => line.trim());

  let currentQuestion = null;
  let options = [];
  let answer = null;

  lines.forEach((line) => {
    // Match question line like: **1. Some question here**
    const questionMatch = line.match(/^\*\*\d+\.\s+(.*?)\*\*/);
    if (questionMatch) {
      // Save the last question if valid
      if (currentQuestion && options.length >= 2 && answer !== null) {
        quiz.push({
          question: currentQuestion,
          options,
          correctAnswer: answer,
        });
      }

      // Start new question
      currentQuestion = questionMatch[1];
      options = [];
      answer = null;
      return;
    }

    // Match options like: a) something
    const optionMatch = line.match(/^([a-d])\)\s+(.*)$/i);
    if (optionMatch) {
      options.push(optionMatch[2]);
      return;
    }

    // Match correct answer line like: **Correct Answer:** c) The correct answer
    const answerMatch = line.match(/\*\*Correct Answer:\*\*\s*([a-d])\)/i);
    if (answerMatch) {
      const letter = answerMatch[1].toLowerCase();
      answer = ["a", "b", "c", "d"].indexOf(letter);
    }
  });

  // Push last question
  if (currentQuestion && options.length >= 2 && answer !== null) {
    quiz.push({
      question: currentQuestion,
      options,
      correctAnswer: answer,
    });
  }

  return quiz;
}
