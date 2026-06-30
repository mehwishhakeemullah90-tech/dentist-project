const express = require("express");
const router = express.Router();
const path = require("path");
const { isAuthenticated, isAuthenticatedAPI, isTaskOwner } = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

// ===================== PAGE ROUTES (serve HTML) =====================

// Dashboard
router.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

// All tasks (same dashboard view)
router.get("/tasks", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

// New task form — must come BEFORE /tasks/:id
router.get("/tasks/new", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/tasks/new.html"));
});

// Edit task form — must come BEFORE /tasks/:id
router.get("/tasks/:id/edit", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/tasks/edit.html"));
});

// Task detail page
router.get("/tasks/:id", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/tasks/show.html"));
});

// ===================== API ROUTES (return JSON) =====================

// Dashboard data
router.get("/api/dashboard", isAuthenticatedAPI, taskController.getDashboard);

// All tasks with search & filter
router.get("/api/tasks", isAuthenticatedAPI, taskController.getAllTasks);

// Single task
router.get("/api/tasks/:id", isAuthenticatedAPI, isTaskOwner, taskController.getTask);

// Create task
router.post("/tasks", isAuthenticatedAPI, taskController.createTask);

// Update task
router.put("/tasks/:id", isAuthenticatedAPI, isTaskOwner, taskController.updateTask);

// Delete task
router.delete("/tasks/:id", isAuthenticatedAPI, isTaskOwner, taskController.deleteTask);

module.exports = router;
