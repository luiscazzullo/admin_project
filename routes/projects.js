const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');
router.post('/',
    auth,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    projectController.createProject
)
router.get('/',
    auth,
    projectController.getProjects
)
router.put('/:id',
    auth,
    projectController.updateProject
)
router.delete('/:id',
    auth,
    projectController.deleteProject
)
module.exports = router;