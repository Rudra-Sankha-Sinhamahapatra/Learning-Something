import type { Request, Response } from "express";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAvgSalaryByCity = async (req: Request, res: Response) => {
    try {
        const { city, minSalary } = req.query;

        const matchStage: any = {};

        if (city) matchStage.city = city;
        if (minSalary) matchStage.salary = { $gte: Number(minSalary) };


        const result = await User.aggregate([
            { $match: matchStage },

            {
                $group: {
                    _id: "$city",
                    avgSalary: { $avg: "$salary" },
                    count: { $sum: 1 },
                },
            },

            {
                $project: {
                    _id: 0,
                    city: "$_id",
                    avgSalary: 1,
                    count: 1
                },
            },

            {
                $sort: { avgSalary: -1 },
            }
        ]);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTopSkills = async (req: Request, res: Response) => {
    try {
        const result = await User.aggregate([
            { $unwind: {"path": "$skills", "preserveNullAndEmptyArrays": true } },

            {
                $group: {
                    _id: "$skills",
                    count: { $sum: 1 },
                },
            },

            {
                $project: {
                    _id: 0,
                    skill: "$_id",
                    count: 1,
                },
            },

            { $sort: { count: -1 } },
        ]);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}