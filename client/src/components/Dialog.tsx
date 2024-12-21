import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAddStudent } from "../hooks/addStudent";

export const Dialogg = () => {
  const [open, setOpen] = useState(false);
  const { formData, handleChange, handleSubmit, loading, error } =
    useAddStudent();

  const handleSuccess = async () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <div>Add New Student</div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div>
            <form
              onSubmit={(event) => handleSubmit(event, handleSuccess)}
              className="space-y-4"
            >
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="mt-4" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
