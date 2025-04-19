import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedAnswersState {
  selectedAnswers: Record<number, string[]>; // Store an array of answers for each question
  addAnswer: (questionId: number, answer: string) => void;
  resetAnswers: () => void;
}

const useSelectedAnswersStore = create<SelectedAnswersState>()(
  persist(
    (set) => ({
      selectedAnswers: {}, // Initialize with an empty object
      addAnswer: (questionId, answer) =>
        set((state) => ({
          selectedAnswers: {
            ...state.selectedAnswers,
            [questionId]: [...(state.selectedAnswers[questionId] || []), answer], // Append the new answer
          },
        })),
      resetAnswers: () => set({ selectedAnswers: {} }), // Reset all answers
    }),
    {
      name: "selected-answers-store", // Key for localStorage
    }
  )
);

export default useSelectedAnswersStore;