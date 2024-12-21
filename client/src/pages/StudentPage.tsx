import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialogg } from "@/components/Dialog";
import { useFetchStudents } from "@/hooks/getStudents";
import Loading from "@/components/Loading";

const formatdate = (date: string) => {
  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return dateObject.toLocaleDateString("en-US", options);
};

const StudentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { students, loading, error, totalPages } = useFetchStudents(
    currentPage,
    limit
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen w-full flex flex-col gap-2">
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <h1>Session</h1>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Session</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>2024-2025</DropdownMenuItem>
              <DropdownMenuItem>2025-2026</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <h1>Class</h1>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Class</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Class 9</DropdownMenuItem>
              <DropdownMenuItem>Class 10</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Dialogg />
      </div>
      <div className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Cohort</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.cohort}</TableCell>
                <TableCell>{student.courses}</TableCell>
                <TableCell>{formatdate(student.dateJoined)}</TableCell>
                <TableCell>{formatdate(student.lastLogin)}</TableCell>
                <TableCell>
                  {student.status === "active" ? (
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="h-3 w-3 bg-rose-500 rounded-full"></div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between px-4 py-2">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StudentPage;
