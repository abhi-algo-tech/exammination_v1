import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionKeys } from "../utils/queryKeys";
import QuestionService from "../services/questionService";

// Hook to fetch all questions with pagination and sorting
export const useQuestions = ({
  page = 0,
  size = 10,
  sortBy = "createdOn",
  sortDirection = "asc",
  examId,
  subjectId,
  difficultyLevel,
  statusId,
  search,
}) => {
  return useQuery({
    queryKey: [
      questionKeys.question,
      page,
      size,
      sortBy,
      sortDirection,
      examId,
      subjectId,
      difficultyLevel,
      statusId,
      search,
    ],
    queryFn: async () => {
      try {
        const data = await QuestionService.getAllQuestions({
          page,
          size,
          sortBy,
          sortDirection,
          examId,
          subjectId,
          difficultyLevel,
          statusId,
          search,
        });
        return data;
      } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
      }
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch a single question by ID
export const useQuestionById = (id) => {
  return useQuery({
    queryKey: [questionKeys.question, id],
    queryFn: () => questionService.getQuestionById(id),
    onError: (error) => {
      console.error("Error fetching question by ID:", error);
    },
  });
};

// Hook to create a new question
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => questionService.createQuestion(payload),
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
    mutationFn: (data) => questionService.updateQuestion(data.id, data.payload),
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
