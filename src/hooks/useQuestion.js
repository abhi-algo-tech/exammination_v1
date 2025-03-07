import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionKeys } from "../utils/queryKeys";
import QuestionService from "../services/questionService";

export const useQuestions = ({
  page = 0,
  size = 10,
  sortBy = "createdOn",
  sortDirection = "asc",
  subjectId,
  classId,
  curriculumId,
  statusId,
  search,
}) => {
  return useQuery({
    queryKey: [
      "questions", // Unique key for the questions query
      page,
      size,
      sortBy,
      sortDirection,
      subjectId,
      classId,
      curriculumId,
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
          subjectId,
          classId,
          curriculumId,
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
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

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

// Hook to download question template
export const useDownloadTemplate = () => {
  return useMutation({
    mutationFn: () => QuestionService.downloadTemplate(),
    onError: (error) => {
      console.error("Error downloading template:", error);
    },
  });
};

// Hook to upload questions from a file
export const useUploadQuestions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, curriculumId, classesId, subjectId }) =>
      QuestionService.uploadQuestions(file, curriculumId, classesId, subjectId),
    onSuccess: () => {
      // Invalidate the questions list query after upload
      queryClient.invalidateQueries(questionKeys.question);
    },
    onError: (error) => {
      console.error("Error uploading questions:", error);
    },
  });
};
