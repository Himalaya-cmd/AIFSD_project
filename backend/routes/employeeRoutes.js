const express = require("express");

const router = express.Router();

const {
  addEmployee,
  getEmployees,
  searchEmployee,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
  getRankings,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");


// ADD EMPLOYEE
router.post("/", protect, addEmployee);


// GET ALL EMPLOYEES
router.get("/", protect, getEmployees);


// SEARCH EMPLOYEE
router.get("/search", protect, searchEmployee);


// ANALYTICS
router.get(
  "/analytics",
  protect,
  getAnalytics
);


// RANKINGS
router.get(
  "/rankings",
  protect,
  getRankings
);


// UPDATE EMPLOYEE
router.put("/:id", protect, updateEmployee);


// DELETE EMPLOYEE
router.delete("/:id", protect, deleteEmployee);

module.exports = router;