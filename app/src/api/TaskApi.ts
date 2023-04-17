import axios from "axios";
import { endpoint } from "./apiUtils";
import { TaskInterface } from "../types/Tasks";

export const getAllTasks = async (): Promise<TaskInterface[] | []> => {
  try {
    const allTasks = (await axios.get(`${endpoint}/tasks/api`))?.data?.tasks;
    return allTasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTask = async (task: any): Promise<void> => {
  try {
    await axios.post(`${endpoint}/tasks/api`, task);
  } catch (error) {
    console.error(error);
  }
};

export const patchTask = async (
  taskId: string | number,
  patchValue: { name?: string; completed?: boolean }
): Promise<void> => {
  try {
    await axios.patch(`${endpoint}/tasks/api/${taskId}`, patchValue);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (task: TaskInterface) => {
  try {
    await axios.delete(`${endpoint}/tasks/api/${task._id}`);
  } catch (error) {
    console.error(error);
  }
};
