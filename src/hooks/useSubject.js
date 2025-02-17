import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subjectKeys } from "../utils/queryKeys";
import SubjectService from "../services/SubjectService";

// Hook to fetch all subjects
export const useGetAllSubjects = () => {
  return useQuery({
    queryKey: subjectKeys.subject,
    queryFn: SubjectService.getAllSubjects,
  });
};

// Hook to fetch a subject by ID
export const useGetSubjectById = (id) => {
  return useQuery({
    queryKey: subjectKeys.subject,
    queryFn: () => SubjectService.getSubjectById(id),
    enabled: !!id, // Only fetch if ID is available
  });
};

// Hook to create a subject
export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subjectDto) => SubjectService.createSubject(subjectDto),
    onSuccess: () => {
      queryClient.invalidateQueries(subjectKeys.subject); // Refresh subject list
    },
    onError: (error) => {
      console.error("Error creating subject:", error);
    },
  });
};

// Hook to update a subject
export const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, subjectDto }) =>
      SubjectService.updateSubject(id, subjectDto),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(subjectKeys.subject); // Refresh updated subject
      queryClient.invalidateQueries(subjectKeys.subject); // Refresh subject list
    },
    onError: (error) => {
      console.error("Error updating subject:", error);
    },
  });
};

// Hook to delete a subject
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => SubjectService.deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries(subjectKeys.subject); // Refresh subject list
    },
    onError: (error) => {
      console.error("Error deleting subject:", error);
    },
  });
};
