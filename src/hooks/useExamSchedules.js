import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examScheduleKeys } from "../utils/queryKeys";
import ExamScheduleService from "../services/ExamScheduleService";

// Hook to search exam schedules
export const useSearchExamSchedules = ({ customUserId, classId }) => {
  return useQuery({
    queryKey: [examScheduleKeys.examSchedule, "search", customUserId, classId],
    queryFn: async () => {
      return await ExamScheduleService.searchExamSchedules({
        customUserId,
        classId,
      });
    },
    enabled: !!customUserId && !!classId,
    onError: (error) => {
      console.error("Error searching exam schedules:", error);
    },
  });
};

// Hook to update an exam schedule
export const useUpdateExamSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, examScheduleDto }) => {
      return await ExamScheduleService.updateExamSchedule(id, examScheduleDto);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([examScheduleKeys.examSchedule]);
      console.log("Exam schedule updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating exam schedule:", error);
    },
  });
};
