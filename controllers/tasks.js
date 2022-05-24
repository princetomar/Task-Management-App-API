const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No Task with ID : ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    // if such task exists
    if (!task) {
      return res.status(404).json({ msg: `No Task with ID : ${taskID}` });
    }

    res.status(200).json({ msg: `Task with ID : ${taskID} deleted` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // While updating, the task should not be empty. So that's why we are using options here after req.body in findOneAndUpdate.
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No Task with ID : ${taskID}` });
    }

    res.status(200).json({ msg: `Task with ID : ${taskID} updated`, task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// exporting as an object because we want to export multiple functions
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
