import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupQuestionKeys } from "../utils/queryKeys";
import { GroupQuestionService } from "../services/GroupQuestionService";

// Hook to fetch a Group Question by ID
export const useGroupQuestionById = (id) => {
  return useQuery({
    queryKey: [groupQuestionKeys.groupQuestion, id],
    queryFn: () => GroupQuestionService.getGroupQuestionById(id),
    onError: (error) => {
      console.error("Error fetching group question by ID:", error);
    },
  });
};

// Hook to create a new Group Question
export const useCreateGroupQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => GroupQuestionService.createGroupQuestion(payload),
    onSuccess: () => {
      // Invalidate the group questions list query to refetch
      queryClient.invalidateQueries(groupQuestionKeys.groupQuestion);
    },
    onError: (error) => {
      console.error("Error creating group question:", error);
    },
  });
};

// Hook to update an existing Group Question
export const useUpdateGroupQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      GroupQuestionService.updateGroupQuestion(id, payload),
    onSuccess: () => {
      // Invalidate queries related to the updated group question
      queryClient.invalidateQueries(groupQuestionKeys.groupQuestion);
    },
    onError: (error) => {
      console.error("Error updating group question:", error);
    },
  });
};
