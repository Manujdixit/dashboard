import { app } from "../index";
import { randomInt } from "crypto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.post("/api/students", async (req, res) => {
  try {
    let { name, cohort, courses, dateJoined, lastLogin, status } = req.body;
    const statusbool = randomInt(0, 1);
    if (statusbool === 0) {
      status = "active";
    } else {
      status = "inactive";
    }
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
