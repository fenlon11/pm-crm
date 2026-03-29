export type PublicJobDTO = {
  id: string;
  title: string;
  description: string | null;
  requirements: string | null;
  location: string;
  salaryRange: string | null;
  department: string | null;
  status: string;
  companyName: string | null;
};
