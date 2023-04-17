import { useState } from "react";
import { TaskInterface } from "../../types/Tasks";
import "./Tasks.scss";
import { deleteTask, patchTask } from "../../api/TaskApi";
import { Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

export const Task = ({ task, setRefresh }: any): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleValidation = async (task: TaskInterface) => {
    setIsEditing(false);
    await patchTask(task._id, { name: taskName });
    setRefresh(true);
  };

  const handleCompletion = async () => {
    await patchTask(task._id, { completed: !task.completed });
    setRefresh(true);
  };

  const handleDeletion = async () => {
    await deleteTask(task);
    setRefresh(true);
  };

  return isEditing ? (
    <li className="task">
      <Input
        type="text"
        value={taskName}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setTaskName(target.value);
        }}
      />
      <div>
        <span onClick={() => handleValidation(task)}>
          <CheckOutlined style={{ color: "#04d354", fontSize: "1.25rem" }} />
          <CloseOutlined
            style={{ color: "#1890ff", fontSize: "1.25rem" }}
            onClick={() => setIsEditing(false)}
          />
        </span>
      </div>
    </li>
  ) : (
    <li className={`task ${task.completed && "completed"}`}>
      <span className="task-name" onClick={() => handleCompletion()}>
        {task.name}
      </span>
      <div className="task-actions">
        {task.completed ? (
          <EditOutlined style={{ color: "grey" }} />
        ) : (
          <EditOutlined onClick={() => setIsEditing(true)} />
        )}

        <DeleteOutlined
          style={{ color: "#b50811" }}
          onClick={() => handleDeletion()}
        />
      </div>
    </li>
  );
};

export const Tasks = ({ tasks, setRefresh }: any): JSX.Element => {
  if (tasks?.length === 0) return <></>;

  return (
    <div className="tasks-list">
      {tasks.map((task: TaskInterface) => {
        return <Task task={task} key={task._id} setRefresh={setRefresh} />;
      })}
    </div>
  );
};
