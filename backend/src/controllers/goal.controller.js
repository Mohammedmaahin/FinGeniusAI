import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
} from "../services/goal.service.js";

import { goalSchema } from "../validations/goal.validation.js";

export const addGoal = async (req, res) => {
  try {
    const data = goalSchema.parse(req.body);

    const goal = await createGoal(req.user.id, data);

    res.status(201).json({
      success: true,
      goal
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

export const fetchGoals = async (req, res) => {

  const goals = await getGoals(req.user.id);

  res.json({
    success: true,
    goals
  });

};

export const editGoal = async (req, res) => {

  const goal = await updateGoal(
    req.params.id,
    req.user.id,
    req.body
  );

  res.json({
    success: true,
    goal
  });

};

export const removeGoal = async (req, res) => {

  await deleteGoal(
    req.params.id,
    req.user.id
  );

  res.json({
    success: true,
    message: "Goal deleted successfully"
  });

};