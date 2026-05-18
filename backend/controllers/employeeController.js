const Employee = require("../models/Employee");


// ADD EMPLOYEE
const addEmployee = async (req, res) => {
  try {

    const {
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    } = req.body;

    if (
      !name ||
      !email ||
      !department ||
      !skills ||
      performanceScore === undefined ||
      experience === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingEmployee =
      await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
  try {

    const employees = await Employee.find();

    res.json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// SEARCH EMPLOYEE
const searchEmployee = async (req, res) => {
  try {

    const { department } = req.query;

    const employees = await Employee.find({
      department,
    });

    res.json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {

    const employee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {

    await Employee.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Employee deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// ANALYTICS
const getAnalytics = async (req, res) => {
  try {

    const totalEmployees =
      await Employee.countDocuments();

    const avgPerformance =
      await Employee.aggregate([
        {
          $group: {
            _id: null,
            average: {
              $avg: "$performanceScore",
            },
          },
        },
      ]);

    const topEmployees = await Employee.find()
      .sort({ performanceScore: -1 })
      .limit(5);

    res.json({
      totalEmployees,

      averagePerformance:
        avgPerformance[0]?.average || 0,

      topEmployees,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// RANKINGS
const getRankings = async (req, res) => {
  try {

    const rankings = await Employee.find()
      .sort({ performanceScore: -1 });

    res.json(rankings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  addEmployee,
  getEmployees,
  searchEmployee,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
  getRankings,
};