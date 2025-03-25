// useStudentExamAnswer.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentExamAnswersKeys } from "../utils/queryKeys";
import StudentExamAnswerService from "../services/StudentExamAnswerService ";

// Hook to upsert a single student exam answer (add or update)
export const useUpsertStudentExamAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      if (!payload || typeof payload !== "object") {
        throw new Error(
          "Invalid input: StudentExamAnswerDto is missing or not an object."
        );
      }
      return await StudentExamAnswerService.upsertStudentExamAnswer(payload);
    },
    onSuccess: () => {
      console.info("Student exam answer upserted successfully.");
      // Invalidate related queries to fetch fresh data
      queryClient.invalidateQueries({
        queryKey: studentExamAnswersKeys.studentExamAnswers,
      });
    },
    onError: (error) => {
      console.error(
        "Error upserting student exam answer:",
        error.message || error
      );
    },
  });
};

// Hook to fetch student exam answers by examId and studentId
export const useStudentExamAnswersByExamAndStudent = (examId, studentId) => {
  return useQuery({
    queryKey: ["studentExamAnswers", examId, studentId],
    queryFn: async () => {
      if (!examId || !studentId) throw new Error("Missing examId or studentId");
      return await StudentExamAnswerService.getStudentExamAnswersByExamAndStudent(
        examId,
        studentId
      );
    },
    enabled: false, // ✅ Prevents auto-fetching on mount
    retry: false, // ✅ Avoids unnecessary retries
  });
};
