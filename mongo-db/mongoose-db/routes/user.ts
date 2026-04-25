import { Router } from "express";
import { createUser, getAvgSalaryByCity, getTopSkills } from "../controllers/user";

const router = Router();

router.post("/create", createUser);
router.get("/avg-salary", getAvgSalaryByCity);
router.get("/top-skills", getTopSkills);

export default router;