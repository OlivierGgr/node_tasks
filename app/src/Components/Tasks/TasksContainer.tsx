import { useState } from "react";
import { CreateForm } from "./CreateFrom";
import { Tasks } from "./Tasks";
import "./Tasks.scss";
import { useGetTasks } from "./useGetTasks";
import { Card } from "antd";

export const TasksContainer = (): JSX.Element => {
  const [refresh, setRefresh] = useState(true);
  const { tasks, isLoading } = useGetTasks(refresh, setRefresh);

  return (
    <Card className="task-container">
      <h2>Tasks</h2>
      <CreateForm setRefresh={setRefresh} />
      {!isLoading && <Tasks tasks={tasks} setRefresh={setRefresh} />}
    </Card>
  );
};
