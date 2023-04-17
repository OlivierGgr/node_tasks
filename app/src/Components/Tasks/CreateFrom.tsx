import { useState } from "react";
import { createTask } from "../../api/TaskApi";
import { Button, Input, Space } from "antd";

type CreateFormType = {
  setRefresh: (arg: boolean) => void;
};

export const CreateForm = ({ setRefresh }: CreateFormType): JSX.Element => {
  const [newTask, setNewTask] = useState({
    completed: false,
    name: "",
  });

  const handleClick = async () => {
    await createTask(newTask);
    setRefresh(true);
    setNewTask({ completed: false, name: "" });
  };

  return (
    <Space.Compact style={{ width: "60%" }}>
      <Input
        type="text"
        name="task-name"
        placeholder="Write task here"
        value={newTask.name}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;

          setNewTask((old) => ({
            ...old,
            name: target.value,
          }));
        }}
      />
      {/* <button className="task-create-btn" >
        Create
      </button> */}
      <Button type="primary" onClick={() => handleClick()}>
        Create
      </Button>
    </Space.Compact>
  );
};
