const Task = require("../models/Task");

// GET /api/dashboard — stats + all tasks for logged-in user
exports.getDashboard = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.session.userId }).sort({ createdAt: -1 });

        const stats = {
            total: tasks.length,
            pending: tasks.filter(t => t.status === "Pending").length,
            inProgress: tasks.filter(t => t.status === "In Progress").length,
            completed: tasks.filter(t => t.status === "Completed").length
        };

        res.json({
            success: true,
            userName: req.session.userName,
            stats,
            tasks
        });

    } catch (error) {
        console.log("getDashboard error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/tasks — all tasks with optional search & filter
exports.getAllTasks = async (req, res) => {
    try {
        const { search, status } = req.query;
        const query = { user: req.session.userId };

        if (search && search.trim()) {
            query.title = { $regex: search.trim(), $options: "i" };
        }

        if (status && ["Pending", "In Progress", "Completed"].includes(status)) {
            query.status = status;
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.json({ success: true, tasks });

    } catch (error) {
        console.log("getAllTasks error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/tasks/:id — single task (ownership verified by middleware)
exports.getTask = (req, res) => {
    res.json({ success: true, task: req.task });
};

// POST /tasks — create new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: "Task title is required" });
        }

        const validStatuses = ["Pending", "In Progress", "Completed"];
        const taskStatus = validStatuses.includes(status) ? status : "Pending";

        const task = await Task.create({
            title: title.trim(),
            description: description ? description.trim() : "",
            status: taskStatus,
            user: req.session.userId
        });

        res.status(201).json({ success: true, message: "Task created successfully", task });

    } catch (error) {
        console.log("createTask error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// PUT /tasks/:id — update task (ownership verified by middleware)
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: "Task title is required" });
        }

        const validStatuses = ["Pending", "In Progress", "Completed"];
        const taskStatus = validStatuses.includes(status) ? status : req.task.status;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                description: description ? description.trim() : "",
                status: taskStatus
            },
            { new: true }
        );

        res.json({ success: true, message: "Task updated successfully", task: updatedTask });

    } catch (error) {
        console.log("updateTask error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// DELETE /tasks/:id — delete task (ownership verified by middleware)
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Task deleted successfully" });

    } catch (error) {
        console.log("deleteTask error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
