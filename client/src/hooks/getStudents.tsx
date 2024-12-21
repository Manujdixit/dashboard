import { useState, useEffect } from "react";
import axios from "axios";
import type { Student } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useFetchStudents = (page: number, limit: number) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const select = useSelector((state: RootState) => state.students);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/api/students`, {
        params: { page, limit },
      });
      setStudents(response.data.students);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [select, page, limit]);

  return { students, loading, error, fetchStudents, totalPages };
};
