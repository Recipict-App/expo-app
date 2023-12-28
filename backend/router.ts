import express from "express";
import { createUser, getUser } from "./controllers/userController";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUser);

export default router;

