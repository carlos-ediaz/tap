import { useQuery } from "@tanstack/react-query";
import { USER_KEY } from "./queryKeys";
import { getUserById } from "../services/user";

export const useUser = (userId, options = {}) => {
  return useQuery({
    queryKey: [USER_KEY, userId],
    queryFn: () => getUserById(userId),
    options,
  });
};
