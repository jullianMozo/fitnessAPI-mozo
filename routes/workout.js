const express = require('express');
const workoutController = require('../controllers/workout');
const { verify } = require('../auth');

const router = express.Router();

// Create a new workout
router.post('/', verify, workoutController.createWorkout);

// Get all workouts for the logged-in user
router.get('/', verify, workoutController.getUserWorkouts);

// Get a single workout by ID
router.get('/:id', verify, workoutController.getWorkoutById);

// Update a workout
router.patch('/:id', verify, workoutController.updateWorkout);

// Delete a workout
router.delete('/:id', verify, workoutController.deleteWorkout);

module.exports = router;
