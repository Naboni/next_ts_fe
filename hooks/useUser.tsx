import useSWR from "swr";
import { currentUser } from "../backend-utils/user-utils";

export default function useUser() {
  const { data, error } = useSWR(`/api/user/`, currentUser);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
