import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addStudent } from "../store/slices/studentSlice";
import type { Student } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export const useAddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    courses: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    onSuccess?: () => void
  ) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newStudent: Student = {
        name: formData.name,
        cohort: formData.cohort,
        courses: formData.courses,
        dateJoined: new Date().toISOString().split("T")[0],
        lastLogin: new Date().toISOString().split("T")[0],
        status: "active",
      };

      const response = await axios.post(`${BASE_URL}/api/students`, newStudent);

      dispatch(addStudent(response.data));

      setFormData({
        name: "",
        cohort: "",
        courses: "",
      });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};
