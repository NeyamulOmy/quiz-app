import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockQuestions } from "@/data/mockData"; // Import mock questions

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface QuestionsState {
  questions: Question[];
  addQuestion: (question: Question) => void;
  removeQuestion: (id: number) => void;
  updateQuestion: (updatedQuestion: Question) => void;
}

const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set) => ({
      questions: mockQuestions, // Initialize with mock questions
      addQuestion: (question) =>
        set((state) => ({
          questions: [...state.questions, question],
        })),
      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),
      updateQuestion: (updatedQuestion) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q
          ),
        })),
    }),
    {
      name: "questions-store", // Key for localStorage
    }
  )
);

export default useQuestionsStore;