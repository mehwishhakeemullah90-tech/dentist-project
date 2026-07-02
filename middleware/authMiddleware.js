// ── Generic session guard (kept for any future use) ────────────────────────
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) return next();
    res.redirect("/login");
};

const isAuthenticatedAPI = (req, res, next) => {
    if (req.session && req.session.userId) return next();
    res.status(401).json({ success: false, message: "Please login to continue" });
};

// ── Admin ──────────────────────────────────────────────────────────────────
const isAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) return next();
    res.redirect("/admin-login-page");
};

const isAdminAPI = (req, res, next) => {
    if (req.session && req.session.isAdmin) return next();
    res.status(401).json({ success: false, message: "Admin access required" });
};

// ── Doctor ─────────────────────────────────────────────────────────────────
const isDoctor = (req, res, next) => {
    if (req.session && req.session.isDoctor) return next();
    res.redirect("/login");
};

const isDoctorAPI = (req, res, next) => {
    if (req.session && req.session.isDoctor) return next();
    res.status(401).json({ success: false, message: "Doctor access required" });
};

// ── Assistant ───────────────────────────────────────────────────────────────
const isAssistant = (req, res, next) => {
    if (req.session && req.session.isAssistant) return next();
    res.redirect("/login");
};

const isAssistantAPI = (req, res, next) => {
    if (req.session && req.session.isAssistant) return next();
    res.status(401).json({ success: false, message: "Assistant access required" });
};

module.exports = {
    isAuthenticated,
    isAuthenticatedAPI,
    isAdmin,
    isAdminAPI,
    isDoctor,
    isDoctorAPI,
    isAssistant,
    isAssistantAPI
};
