const Workout = require('../models/Workout');

// Create a new workout
exports.createWorkout = async (req, res) => {
    try {
        const workout = new Workout({
            user: req.user.id,
            ...req.body
        });
        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all workouts for the logged-in user
exports.getUserWorkouts = async (req, res) => {
    try {
        let workouts;

        // Check if the user is an admin
        if (req.user.isAdmin) {
            // If admin, get all workouts
            workouts = await Workout.find();
        } else {
            // If not admin, get workouts for the logged-in user only
            workouts = await Workout.find({ user: req.user.id });
        }

        res.json({ workouts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateWorkoutStatus = async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { status: req.body.status },
            { new: true }
        );
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Update a workout
exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found or not authorized' });
        }
        res.json({ message: "workout status updated successfully", workout });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found or not authorized' });
        }
        res.json({ message: 'Workout deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
