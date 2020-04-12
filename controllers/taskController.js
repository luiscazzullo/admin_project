const Task = require('../models/Task');
const Project = require('../models/Projects');
const { validationResult } = require('express-validator');
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { project } = req.body;
        const isProjectExist = await Project.findById(project);
        if(!isProjectExist) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        if(isProjectExist.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }
        const task = new Task(req.body);
        await task.save();
        res.json({ task })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { project } = req.query;
        const isProjectExist = await Project.findById(project);
        if(!isProjectExist) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        if(isProjectExist.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }
        const tasks = await Task.find({ project }).sort({ pubdate: -1 });
        res.json({ tasks })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { project, name, status } = req.body;
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }
        const isProjectExist = await Project.findById(project);
        if(isProjectExist.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }
        const newTask = {}
        newTask.name = name;
        newTask.status = status;
        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
        res.json({ task })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.query;
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }
        const isProjectExist = await Project.findById(project);
        if(isProjectExist.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
};