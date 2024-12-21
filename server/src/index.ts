import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";

export const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/students", async (req, res) => {
  try {
    const { name, cohort, courses, dateJoined, lastLogin } = req.body;
    const status = randomInt(0, 2) === 0 ? "active" : "inactive";

    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        courses,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status,
      },
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const page = parseInt(String(req.query.page)) || 1;
    const limit = parseInt(String(req.query.limit)) || 10;
    const skip = (page - 1) * limit;

    const students = await prisma.student.findMany({
      skip,
      take: limit,
    });

    const totalStudents = await prisma.student.count();

    res.status(200).json({
      students,
      pagination: {
        totalItems: totalStudents,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/students/filter", async (req, res) => {
  try {
    const { cohort, courses } = req.query;

    const students = await prisma.student.findMany({
      where: {
        cohort: typeof cohort === "string" ? cohort : undefined,
        courses: typeof courses === "string" ? courses : undefined,
      },
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
