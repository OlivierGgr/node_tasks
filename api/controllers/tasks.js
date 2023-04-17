const Task = require("./models/Task");

const getAllTasks = async (_, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    tasks,
  });
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.body.id;
    const task = await Task.findById(id);
    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    res.status(204).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  patchTask,
  deleteTask,
};
