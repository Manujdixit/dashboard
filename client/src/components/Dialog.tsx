import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useState } from "react";
import { addStudent } from "@/store/slices/studentSlice";

export const Dialogg = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    courses: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStudent = {
      id: crypto.randomUUID(),
      name: formData.name,
      cohort: formData.cohort,
      courses: formData.courses.split(",").map((course) => course.trim()),
      dateJoined: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
      status: "active" as const,
    };

    dispatch(addStudent(newStudent));
    setFormData({ name: "", cohort: "", courses: "" });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <Plus />
            <div>Add New Student</div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Cohort</label>
                <input
                  type="text"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                  placeholder="Enter cohort"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Courses</label>
                <input
                  type="text"
                  name="courses"
                  value={formData.courses}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                  placeholder="Enter courses (comma-separated)"
                  required
                />
              </div>
              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
