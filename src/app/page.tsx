'use client';
import ProtectedRoute from "@/components/ProtectedRoute";
import useQuestionsStore from "@/store/questionsStore";
import useSelectedAnswersStore from "@/store/selectedAnswersStore"; // Import the updated store
import { useState } from "react";
import { Card, Button, Typography, Space, List, Radio } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  const { questions } = useQuestionsStore();
  const { selectedAnswers, addAnswer, resetAnswers } = useSelectedAnswersStore(); // Use the updated store
  const [tempSelectedAnswers, setTempSelectedAnswers] = useState<Record<number, string | null>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionSelect = (questionId: number, option: string) => {
    setTempSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = () => {
    const calculatedScore = questions.reduce((acc, question) => {
      return acc + (tempSelectedAnswers[question.id] === question.answer ? 1 : 0);
    }, 0);

    // Store all answers in the Zustand store
    Object.entries(tempSelectedAnswers).forEach(([questionId, answer]) => {
      if (answer) {
        addAnswer(Number(questionId), answer); // Add the answer to the history
      }
    });

    setScore(calculatedScore);
  };

  const handleRetakeQuiz = () => {
    setTempSelectedAnswers({}); // Clear temporary answers
    setScore(null);
  };

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center" }}>Quiz</Title>
        {score !== null ? (
          <Card>
            <Title level={3}>Quiz Finished!</Title>
            <Text>Your score: {score} / {questions.length}</Text>
            <Space style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <Button type="primary" onClick={handleRetakeQuiz}>
                Retake Quiz
              </Button>
            </Space>
          </Card>
        ) : (
          <List
            dataSource={questions}
            renderItem={(question, index) => (
              <Card key={question.id} style={{ marginBottom: "20px" }}>
                <Title level={4}>
                  {index + 1}. {question.question}
                </Title>
                <Radio.Group
                  value={tempSelectedAnswers[question.id] || null}
                  onChange={(e) => handleOptionSelect(question.id, e.target.value)}
                >
                  {question.options.map((option) => (
                    <Radio key={option} value={option} style={{ display: "block", marginBottom: "10px" }}>
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
                {selectedAnswers[question.id] && (
                  <Text style={{ marginLeft: "10px", display: "block" }}>
                    Previous Answers: {selectedAnswers[question.id].join(", ")}
                  </Text>
                )}
              </Card>
            )}
          />
        )}
        {score === null && (
          <Space style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              onClick={handleSubmitQuiz}
              disabled={Object.values(tempSelectedAnswers).some((option) => option === null)}
            >
              Submit Quiz
            </Button>
          </Space>
        )}
      </div>
    </ProtectedRoute>
  );
}
