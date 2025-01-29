export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: ResumeContent;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface ResumeContent {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    website?: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }[];
  skills: string[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
}