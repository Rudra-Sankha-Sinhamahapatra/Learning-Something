import { Router } from "express";
import { createUser, getAvgSalaryByCity } from "../controllers/user";

const router = Router();

router.post("/create", createUser);
router.get("/avg-salary", getAvgSalaryByCity);

export default router;