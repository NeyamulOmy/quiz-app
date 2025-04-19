'use client';
import AdminOnlyRoute from '@/components/AdminOnlyRoute';
import useQuestionsStore from '@/store/questionsStore';
import React, { useState } from 'react';
import { Card, Button, Typography, Input, Space, List, Radio, Form, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

export default function Page() {
  const { questions, addQuestion, removeQuestion, updateQuestion } = useQuestionsStore();
  const [newQuestion, setNewQuestion] = useState({
    id: 0,
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

  const handleCorrectAnswerChange = (questionId: number, correctAnswer: string) => {
    const questionToUpdate = questions.find((q) => q.id === questionId);
    if (questionToUpdate) {
      updateQuestion({ ...questionToUpdate, answer: correctAnswer });
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    removeQuestion(questionId);
  };

  const handleAddQuestion = () => {
    if (
      newQuestion.question.trim() &&
      newQuestion.options.every((option) => option.trim()) &&
      newQuestion.answer.trim()
    ) {
      addQuestion({ ...newQuestion, id: Date.now() }); // Use timestamp as unique ID
      setNewQuestion({
        id: 0,
        question: '',
        options: ['', '', '', ''],
        answer: '',
      });
    } else {
      alert('Please fill out all fields and select a correct answer.');
    }
  };

  return (
    <AdminOnlyRoute>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Manage Questions</Title>

        {/* List of Questions */}
        <List
          dataSource={questions}
          renderItem={(q) => (
            <Card
              key={q.id}
              title={q.question}
              extra={
                <Button danger onClick={() => handleDeleteQuestion(q.id)}>
                  Delete
                </Button>
              }
              style={{ marginBottom: '20px' }}
            >
              <Radio.Group
                value={q.answer}
                onChange={(e) => handleCorrectAnswerChange(q.id, e.target.value)}
              >
                {q.options.map((option) => (
                  <Radio key={option} value={option} style={{ display: 'block', marginBottom: '10px' }}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Card>
          )}
        />

        {/* Add New Question */}
        <Card title="Add New Question" style={{ marginTop: '20px' }}>
          <Form layout="vertical">
            <Form.Item label="Question">
              <Input
                placeholder="Enter question"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Options">
              <Space direction="vertical" style={{ width: '100%' }}>
                {newQuestion.options.map((option, index) => (
                  <Input
                    key={index}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        options: newQuestion.options.map((opt, i) => (i === index ? e.target.value : opt)),
                      })
                    }
                  />
                ))}
              </Space>
            </Form.Item>
            <Form.Item label="Correct Answer">
              <Select
                placeholder="Select Correct Answer"
                value={newQuestion.answer}
                onChange={(value) => setNewQuestion({ ...newQuestion, answer: value })}
              >
                {newQuestion.options.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleAddQuestion} block>
                Add Question
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AdminOnlyRoute>
  );
}
