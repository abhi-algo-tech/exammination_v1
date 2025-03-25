import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { examResultKeys } from "../utils/queryKeys";
import ExamResultService from "../services/ExamResultService";

/**
 * Hook to create an exam result
 */
export const useCreateExamResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ studentId, examId }) => {
      if (!studentId || !examId) throw new Error("Missing studentId or examId");
      return await ExamResultService.createExamResult(studentId, examId);
    },
    onSuccess: () => {
      console.info("✅ Exam result created successfully.");
      queryClient.invalidateQueries({ queryKey: [examResultKeys.examResult] });
    },
    onError: (error) => {
      console.error("❌ Error creating exam result:", error);
    },
  });
};

/**
 * Hook to fetch an exam result by exam ID and student ID
 * @param {number} examId - Exam ID
 * @param {number} studentId - Student ID
 */
export const useExamResultByExamAndStudent = (examId, studentId) => {
  if (!examId || !studentId) {
    console.warn("⚠️ Missing examId or studentId. Skipping query.");
    return {
      data: undefined,
      isLoading: false,
      isError: false,
      isSuccess: false,
    }; // Changed null to undefined, added isSuccess
  }

  return useQuery({
    queryKey: [examResultKeys.examResult],
    queryFn: () =>
      ExamResultService.getExamResultByExamAndStudent(examId, studentId),
    enabled: Boolean(examId && studentId),
    retry: false,
    onError: (error) => {
      console.error("❌ Error fetching exam result:", error);
    },
  });
};
