'use client';
import AdminOnlyRoute from '@/components/AdminOnlyRoute'
import useQuestionsStore from '@/store/questionsStore';
import React from 'react'

export default function page() {
    const { questions, addQuestion, removeQuestion, updateQuestion } = useQuestionsStore();

  // Example usage
  const handleAddQuestion = () => {
    addQuestion({
      id: 4,
      question: "What is the speed of light?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      answer: "300,000 km/s",
    });
  };
  return (
    <AdminOnlyRoute>
        <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>{q.question}</li>
        ))}
      </ul>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
    </AdminOnlyRoute>
    
  )
}
