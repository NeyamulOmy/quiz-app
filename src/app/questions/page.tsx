'use client';
import AdminOnlyRoute from '@/components/AdminOnlyRoute';
import useQuestionsStore from '@/store/questionsStore';
import React, { useState } from 'react';
import { Card, Button, Typography, Input, Space, Form, Select, Modal } from 'antd';
import { CheckOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

export default function Page() {
  const { questions, addQuestion, updateQuestion, removeQuestion } = useQuestionsStore();
  const [editedQuestions, setEditedQuestions] = useState<Record<number, { options: string[]; answer: string }>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

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
      setSaving((prev) => ({ ...prev, [questionId]: true }));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateQuestion({
        ...questionToUpdate,
        options: editedQuestions[questionId].options || questionToUpdate.options,
        answer: editedQuestions[questionId].answer || questionToUpdate.answer,
      });
      setSaving((prev) => ({ ...prev, [questionId]: false }));
      setEditedQuestions((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    setQuestionToDelete(questionId);
    setDeleteModalVisible(true);
  };

  const confirmDeleteQuestion = () => {
    if (questionToDelete !== null) {
      removeQuestion(questionToDelete);
      setQuestionToDelete(null);
      setDeleteModalVisible(false);
    }
  };

  const handleAddQuestion = () => {
    if (
      newQuestion.question.trim() &&
      newQuestion.options.every((option) => option.trim()) &&
      newQuestion.answer.trim()
    ) {
      addQuestion({ ...newQuestion, id: Date.now() });
      setNewQuestion({ question: '', options: ['', '', '', ''], answer: '' });
      setIsModalOpen(false);
    } else {
      alert('Please fill out all fields and select a correct answer.');
    }
  };

  return (
    <AdminOnlyRoute>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Manage Questions</Title>

        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Question
            </Button>
          </div>

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
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSaveChanges(q.id)}
                    icon={saving[q.id] ? <CheckOutlined /> : undefined}
                    loading={saving[q.id]}
                  >
                    {saving[q.id] ? 'Saved' : 'Save Changes'}
                  </Button>
                  <Button
                    type="default"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    Delete
                  </Button>
                </Space>
              </Form>
            </Card>
          ))}
        </Space>

        <Modal
          title="Add New Question"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form layout="vertical">
            <Form.Item label="Question">
              <Input
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                placeholder="Enter question"
              />
            </Form.Item>
            <Form.Item label="Options">
              <Space direction="vertical" style={{ width: '100%' }}>
                {newQuestion.options.map((option, index) => (
                  <Input
                    key={index}
                    value={option}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        options: newQuestion.options.map((opt, i) => (i === index ? e.target.value : opt)),
                      })
                    }
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </Space>
            </Form.Item>
            <Form.Item label="Correct Answer">
              <Select
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
            <Button type="primary" onClick={handleAddQuestion} block>
              Add Question
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Confirm Deletion"
          open={deleteModalVisible}
          onOk={confirmDeleteQuestion}
          onCancel={() => setDeleteModalVisible(false)}
          okText="Yes"
          okType="danger"
          cancelText="No"
        >
          <p>Are you sure you want to delete this question? This action cannot be undone.</p>
        </Modal>
      </div>
    </AdminOnlyRoute>
  );
}