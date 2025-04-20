'use client';
import AdminOnlyRoute from '@/components/AdminOnlyRoute';
import useQuestionsStore from '@/store/questionsStore';
import React, { useState } from 'react';
import { Card, Button, Typography, Input, Space, Form, Select } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

export default function Page() {
  const { questions, updateQuestion } = useQuestionsStore();
  const [editedQuestions, setEditedQuestions] = useState<Record<number, { options: string[]; answer: string }>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({}); // Track saving state for each question

  const handleOptionChange = (questionId: number, index: number, value: string) => {
    setEditedQuestions((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        options: prev[questionId]?.options.map((opt, i) => (i === index ? value : opt)) || questions.find((q) => q.id === questionId)?.options.map((opt, i) => (i === index ? value : opt)) || [],
      },
    }));
  };

  const handleCorrectAnswerChange = (questionId: number, correctAnswer: string) => {
    setEditedQuestions((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer: correctAnswer,
      },
    }));
  };

  const handleSaveChanges = async (questionId: number) => {
    const questionToUpdate = questions.find((q) => q.id === questionId);
    if (questionToUpdate && editedQuestions[questionId]) {
      setSaving((prev) => ({ ...prev, [questionId]: true })); // Set saving state to true
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for saving
      updateQuestion({
        ...questionToUpdate,
        options: editedQuestions[questionId].options || questionToUpdate.options,
        answer: editedQuestions[questionId].answer || questionToUpdate.answer,
      });
      setSaving((prev) => ({ ...prev, [questionId]: false })); // Reset saving state
      setEditedQuestions((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  return (
    <AdminOnlyRoute>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Manage Questions</Title>

        <Space direction="vertical" style={{ width: '100%' }}>
          {questions.map((q) => (
            <Card key={q.id} title={`Question: ${q.question}`} style={{ marginBottom: '20px' }}>
              <Form layout="vertical">
                <Form.Item label="Options">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {q.options.map((option, index) => (
                      <Input
                        key={index}
                        value={editedQuestions[q.id]?.options?.[index] || option}
                        onChange={(e) => handleOptionChange(q.id, index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                  </Space>
                </Form.Item>
                <Form.Item label="Correct Answer">
                  <Select
                    value={editedQuestions[q.id]?.answer || q.answer}
                    onChange={(value) => handleCorrectAnswerChange(q.id, value)}
                  >
                    {(editedQuestions[q.id]?.options || q.options).map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  onClick={() => handleSaveChanges(q.id)}
                  icon={saving[q.id] ? <CheckOutlined /> : undefined}
                  loading={saving[q.id]} // Show loading spinner
                >
                  {saving[q.id] ? 'Saved' : 'Save Changes'}
                </Button>
              </Form>
            </Card>
          ))}
        </Space>
      </div>
    </AdminOnlyRoute>
  );
}
