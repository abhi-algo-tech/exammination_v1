import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { curriculumKeys } from "../utils/queryKeys";
import CurriculumService from "../services/CurriculumService ";

// Hook to fetch .curriculum
export const useGetAllCurriculums = () => {
  return useQuery({
    queryKey: curriculumKeys.curriculum,
    queryFn: CurriculumService.getAllCurriculums,
  });
};

// Hook to fetch curriculum by ID
export const useGetCurriculumById = (id) => {
  return useQuery({
    queryKey: curriculumKeys.curriculum,
    queryFn: () => CurriculumService.getCurriculumById(id),
    enabled: !!id, // Prevents query from running if id is undefined/null
  });
};

// Hook to create a new curriculum
export const useCreateCurriculum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (curriculumDto) => {
      if (!curriculumDto) {
        throw new Error("Invalid input: CurriculumDto is required.");
      }
      return CurriculumService.createCurriculum(curriculumDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(curriculumKeys.curriculum);
    },
    onError: (error) => {
      console.error("Error creating curriculum:", error);
    },
  });
};

// Hook to update an existing curriculum
export const useUpdateCurriculum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, curriculumDto }) => {
      if (!id || !curriculumDto) {
        throw new Error("Invalid input: ID and CurriculumDto are required.");
      }
      return CurriculumService.updateCurriculum(id, curriculumDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(curriculumKeys.curriculum);
    },
    onError: (error) => {
      console.error("Error updating curriculum:", error);
    },
  });
};

// Hook to delete a curriculum
export const useDeleteCurriculum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      if (!id) {
        throw new Error("Invalid input: ID is required.");
      }
      return CurriculumService.deleteCurriculum(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(curriculumKeys.curriculum);
    },
    onError: (error) => {
      console.error("Error deleting curriculum:", error);
    },
  });
};
