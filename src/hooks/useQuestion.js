import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionKeys } from "../utils/queryKeys";
import QuestionService from "../services/QuestionService";

// Hook to fetch a single question by ID
export const useQuestionById = (id) => {
  return useQuery({
    queryKey: [questionKeys.question, id],
    queryFn: () => QuestionService.getQuestionById(id),
    onError: (error) => {
      console.error("Error fetching question by ID:", error);
    },
  });
};

// Hook to create a new question
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => QuestionService.createQuestion(payload),
    onSuccess: () => {
      // Invalidate the questions list query to refetch
      queryClient.invalidateQueries(questionKeys.question);
    },
    onError: (error) => {
      console.error("Error creating question:", error);
    },
  });
};

// Hook to update an existing question by ID
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => QuestionService.updateQuestion(data.id, data.payload),
    onSuccess: (data) => {
      // Invalidate the questions list and the specific question cache
      queryClient.invalidateQueries(questionKeys.question);
      queryClient.invalidateQueries([questionKeys.question, data.id]);
    },
    onError: (error) => {
      console.error("Error updating question:", error);
    },
  });
};
