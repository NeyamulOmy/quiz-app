import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedAnswersState {
  selectedAnswers: Record<number, string | null>; // Store the last selected answer for each question
  setAnswer: (questionId: number, answer: string | null) => void;
  resetAnswers: () => void;
}

const useSelectedAnswersStore = create<SelectedAnswersState>()(
  persist(
    (set) => ({
      selectedAnswers: {}, // Initialize with an empty object
      setAnswer: (questionId, answer) =>
        set((state) => ({
          selectedAnswers: { ...state.selectedAnswers, [questionId]: answer }, // Update the last selected answer
        })),
      resetAnswers: () => set({ selectedAnswers: {} }), // Reset all answers
    }),
    {
      name: "selected-answers-store", // Key for localStorage
    }
  )
);

export default useSelectedAnswersStore;