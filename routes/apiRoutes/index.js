const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./rolesRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;

// The index.js file acts as a central hub to pull all route folders together.