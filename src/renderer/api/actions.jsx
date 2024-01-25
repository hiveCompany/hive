import { useQuery } from "react-query";
import useHiveFetch from "./useHiveFetch";

function useData() {
  const hiveFetch = useHiveFetch();
  return useQuery(["hive_actions"], () => {
    const body = {
      category: "hive_actions",
      action: "get_all",
    };
    return hiveFetch(body);
  });
}

export default {
  useData,
};
