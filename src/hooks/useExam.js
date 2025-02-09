// useExam.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examKeys } from "../utils/queryKeys";
import ExamService from "../services/examService";
// Hook to fetch all exams with pagination and sorting

export const useExams = ({
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
      examKeys.exam,
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
        const data = await ExamService.getAllExams({
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
        console.error("Error fetching exams:", error);
        throw error;
      }
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch a single exam by ID
export const useExamById = (id) => {
  return useQuery({
    queryKey: [examKeys.exam, id],
    queryFn: () => ExamService.getExamById(id),
    enabled: !!id, // Prevents query execution if id is falsy
    onError: (error) => {
      console.error("Error fetching exam by ID:", error);
    },
  });
};

// Hook to create a new exam
export const useCreateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => ExamService.createExam(payload),
    onSuccess: () => {
      // Invalidate the exams list query to refetch
      queryClient.invalidateQueries(examKeys.exam);
    },
    onError: (error) => {
      console.error("Error creating exam:", error);
    },
  });
};

// Hook to update an existing exam by ID
export const useUpdateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ExamService.updateExam(data.id, data.payload),
    onSuccess: (data) => {
      // Invalidate the exams list and the specific exam cache
      queryClient.invalidateQueries(examKeys.exam);
      queryClient.invalidateQueries([examKeys.exam, data.id]);
    },
    onError: (error) => {
      console.error("Error updating exam:", error);
    },
  });
};
