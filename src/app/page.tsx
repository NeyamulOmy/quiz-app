'use client';
import ProtectedRoute from "@/components/ProtectedRoute";
import useQuestionsStore from "@/store/questionsStore";
import { useState } from "react";
import { Card, Button, Typography, Space, List, Radio } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  const { questions } = useQuestionsStore();
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string | null>>(
    questions.reduce((acc, question) => ({ ...acc, [question.id]: null }), {})
  );
  const [score, setScore] = useState<number | null>(null);

  const handleOptionSelect = (questionId: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = () => {
    const calculatedScore = questions.reduce((acc, question) => {
      return acc + (selectedOptions[question.id] === question.answer ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
  };

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center" }}>Quiz</Title>
        {score !== null ? (
          <Card>
            <Title level={3}>Quiz Finished!</Title>
            <Text>Your score: {score} / {questions.length}</Text>
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
                  onChange={(e) => handleOptionSelect(question.id, e.target.value)}
                  value={selectedOptions[question.id]}
                >
                  {question.options.map((option) => (
                    <Radio key={option} value={option} style={{ display: "block", marginBottom: "10px" }}>
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              </Card>
            )}
          />
        )}
        {score === null && (
          <Space style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              onClick={handleSubmitQuiz}
              disabled={Object.values(selectedOptions).some((option) => option === null)}
            >
              Submit Quiz
            </Button>
          </Space>
        )}
      </div>
    </ProtectedRoute>
  );
}
