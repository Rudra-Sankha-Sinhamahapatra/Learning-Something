import { Router } from "express";
import { createUser, getAvgSalaryByCity, getTopSkills, getUsersWithPosts } from "../controllers/user";

const router = Router();

router.post("/create", createUser);
router.get("/avg-salary", getAvgSalaryByCity);
router.get("/top-skills", getTopSkills);
router.get("/with-posts", getUsersWithPosts);

export default router;