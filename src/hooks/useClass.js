import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classKeys } from "../utils/queryKeys";
import ClassService from "../services/ClassService ";

// Hook to fetch all classes
export const useGetAllClasses = () => {
  return useQuery({
    queryKey: classKeys.classes,
    queryFn: ClassService.getAllClasses,
  });
};

// Hook to fetch a class by ID
export const useGetClassById = (id) => {
  return useQuery({
    queryKey: classKeys.classes,
    queryFn: () => ClassService.getClassById(id),
    enabled: !!id, // Only fetch if ID is available
  });
};

// Hook to create a class
export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classDto) => ClassService.createClass(classDto),
    onSuccess: () => {
      queryClient.invalidateQueries(classKeys.classes); // Refresh class list
    },
    onError: (error) => {
      console.error("Error creating class:", error);
    },
  });
};

// Hook to update a class
export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, classDto }) => ClassService.updateClass(id, classDto),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(classKeys.classes); // Refresh updated class
      queryClient.invalidateQueries(classKeys.classes); // Refresh class list
    },
    onError: (error) => {
      console.error("Error updating class:", error);
    },
  });
};

// Hook to delete a class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ClassService.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries(classKeys.classes); // Refresh class list
    },
    onError: (error) => {
      console.error("Error deleting class:", error);
    },
  });
};
