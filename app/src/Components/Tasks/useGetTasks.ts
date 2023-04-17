import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/TaskApi";
import { TaskInterface } from "../../types/Tasks";

type useGetTasksResponse = {
  tasks: TaskInterface[];
  isLoading: boolean;
};
export const useGetTasks = (
  refresh: boolean,
  setRefresh: (arg: boolean) => void
): useGetTasksResponse => {
  const [tasks, setTasks] = useState<Array<TaskInterface>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!refresh) return;
    getTasks();
    setRefresh(false);
  }, [refresh, setRefresh]);

  const getTasks = async () => {
    try {
      setTasks(await getAllTasks());
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return { tasks, isLoading };
};
