const express = require('express');
const workoutController = require('../controllers/workout');
const { verify } = require('../auth');

const router = express.Router();

// Create a new workout
router.post('/addWorkout', verify, workoutController.createWorkout);

// Get all workouts for the logged-in user
router.get('/getMyWorkouts', verify, workoutController.getUserWorkouts);

// Get a single workout by ID
router.put('/completeWorkoutStatus/:id', verify, workoutController.updateWorkoutStatus);

// Update a workout
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout);

// Delete a workout
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);

module.exports = router;
