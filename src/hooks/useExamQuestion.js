// useExamQuestion.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { examQuestionKeys } from "../utils/queryKeys";
import ExamQuestionService from "../services/ExamQuestionService";

// Hook to update exam question statuses
export const useUpdateExamQuestionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (examQuestionDtos) => {
      if (!examQuestionDtos || !examQuestionDtos.length) {
        throw new Error("Invalid input: ExamQuestionDtos list is missing.");
      }
      return ExamQuestionService.updateExamQuestionStatuses(examQuestionDtos);
    },
    onSuccess: () => {
      // Invalidate queries related to exam questions after update
      queryClient.invalidateQueries(examQuestionKeys.examQuestion);
    },
    onError: (error) => {
      console.error("Error updating exam question statuses:", error);
    },
  });
};
