import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
const priorities = ["LOW", "MEDIUM", "HIGH"];

function validateTask(body, partial = false) {
  const errors = [];
  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) errors.push("Title is required.");
    else if (body.title.trim().length > 120) errors.push("Title must be 120 characters or fewer.");
  }
  if (body.description !== undefined && body.description !== null &&
      (typeof body.description !== "string" || body.description.length > 1000)) {
    errors.push("Description must be 1000 characters or fewer.");
  }
  if (body.status !== undefined && !statuses.includes(body.status)) errors.push("Invalid status.");
  if (body.priority !== undefined && !priorities.includes(body.priority)) errors.push("Invalid priority.");
  if (body.dueDate !== undefined && body.dueDate !== null &&
      (Number.isNaN(Date.parse(body.dueDate)))) errors.push("Invalid due date.");
  return errors;
}

function toTaskData(body) {
  const data = {};
  if (body.title !== undefined) data.title = body.title.trim();
  if (body.description !== undefined) data.description = body.description?.trim() || null;
  if (body.status !== undefined) data.status = body.status;
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  return data;
}

router.get("/", async (req, res, next) => {
  try {
    const { search = "", status = "", priority = "" } = req.query;
    const where = {};
    if (search.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { description: { contains: search.trim() } }
      ];
    }
    if (status && statuses.includes(status)) where.status = status;
    if (priority && priorities.includes(priority)) where.priority = priority;

    const tasks = await prisma.task.findMany({ where, orderBy: [{ createdAt: "desc" }] });
    res.json(tasks);
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid task ID." });
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json(task);
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const errors = validateTask(req.body);
    if (errors.length) return res.status(400).json({ message: errors.join(" ") });
    const task = await prisma.task.create({ data: toTaskData(req.body) });
    res.status(201).json(task);
  } catch (err) { next(err); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid task ID." });
    const errors = validateTask(req.body, true);
    if (errors.length) return res.status(400).json({ message: errors.join(" ") });
    const exists = await prisma.task.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: "Task not found." });
    const task = await prisma.task.update({ where: { id }, data: toTaskData(req.body) });
    res.json(task);
  } catch (err) { next(err); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid task ID." });
    const exists = await prisma.task.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: "Task not found." });
    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } catch (err) { next(err); }
});

export default router;
