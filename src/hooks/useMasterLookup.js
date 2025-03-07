// useMasterLookup.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { masterLookupKeys } from "../utils/queryKeys";
import MasterLookupService from "../services/MasterLookupService ";

// Hook to fetch all master lookup entries
export const useGetAllMasterLookups = () => {
  return useQuery({
    queryKey: masterLookupKeys.Lookup,
    queryFn: MasterLookupService.getAllMasterLookups,
  });
};

// Hook to fetch master lookup by ID
export const useGetMasterLookupById = (id) => {
  return useQuery({
    queryKey: masterLookupKeys.Lookup,
    queryFn: () => MasterLookupService.getMasterLookupById(id),
    enabled: !!id, // Prevents query from running if id is undefined/null
  });
};

export const useGetMasterLookupByType = (type) => {
  return useQuery({
    queryKey: ["lookup", type],
    queryFn: async () => {
      // console.log(
      //   "Fetching data for type:",
      //   type,
      //   "at:",
      //   new Date().toLocaleTimeString()
      // );
      try {
        const response = await MasterLookupService.getMasterLookupByType(type);
        return response;
      } catch (error) {
        console.error("Error in useGetMasterLookupByType:", error);
        throw error;
      }
    },
    enabled: Boolean(type),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });
};

// Hook to create a new master lookup entry
export const useCreateMasterLookup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (masterLookupDto) => {
      if (!masterLookupDto) {
        throw new Error("Invalid input: MasterLookupDto is required.");
      }
      return MasterLookupService.createMasterLookup(masterLookupDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(masterLookupKeys.Lookup);
    },
    onError: (error) => {
      console.error("Error creating master lookup entry:", error);
    },
  });
};

// Hook to update an existing master lookup entry
export const useUpdateMasterLookup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, masterLookupDto }) => {
      if (!id || !masterLookupDto) {
        throw new Error("Invalid input: ID and MasterLookupDto are required.");
      }
      return MasterLookupService.updateMasterLookup(id, masterLookupDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(masterLookupKeys.Lookup);
    },
    onError: (error) => {
      console.error("Error updating master lookup entry:", error);
    },
  });
};

// Hook to delete a master lookup entry
export const useDeleteMasterLookup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      if (!id) {
        throw new Error("Invalid input: ID is required.");
      }
      return MasterLookupService.deleteMasterLookup(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(masterLookupKeys.Lookup);
    },
    onError: (error) => {
      console.error("Error deleting master lookup entry:", error);
    },
  });
};
