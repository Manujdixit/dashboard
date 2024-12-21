export interface Student {
  id?: string;
  name: string;
  cohort: string;
  courses: string;
  dateJoined: string;
  lastLogin: string;
  status: "active" | "inactive";
}

export interface subjects {
  id: string;
  name: string;
}

export interface Class {
  id: string;
  name: string;
  subjects: subjects[];
}

export interface Session {
  id: string;
  year: string;
  name: string;
  isActive: boolean;
}
