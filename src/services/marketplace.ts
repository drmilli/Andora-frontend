import api from "../lib/axios";
import type { Paginated, PublicUserCard } from "./community";

export type JobStatus = "OPEN" | "CLOSED" | "COMPLETED";
export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface JobApplication {
  id: string;
  coverLetter: string;
  bidAmount: number;
  status: ApplicationStatus;
  createdAt: string;
  jobId: string;
  applicantId: string;
  applicant?: PublicUserCard;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: JobStatus;
  createdAt: string;
  userId: string;
  user?: PublicUserCard;
  _count: { applications: number };
  isMine?: boolean;
  myApplication?: { id: string; status: ApplicationStatus } | null;
  /** Only present for the job's owner */
  applications?: JobApplication[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string | null;
  createdAt: string;
  userId: string;
  user: PublicUserCard;
}

export interface MyApplication extends JobApplication {
  job: Job & { user: PublicUserCard };
}

export const fetchJobs = async (opts: { search?: string; page?: number } = {}): Promise<Paginated<Job>> => {
  const res = await api.get("/marketplace/jobs", {
    params: { page: opts.page ?? 1, limit: 20, ...(opts.search ? { search: opts.search } : {}) },
  });
  return res.data;
};

export const fetchMyJobs = async (): Promise<Job[]> => {
  const res = await api.get("/marketplace/jobs/mine");
  return res.data;
};

export const createJob = async (payload: { title: string; description: string; budget: number }): Promise<Job> => {
  const res = await api.post("/marketplace/jobs", payload);
  return res.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/marketplace/jobs/${id}`);
};

export const applyToJob = async (
  jobId: string,
  payload: { coverLetter: string; bidAmount: number }
): Promise<JobApplication> => {
  const res = await api.post(`/marketplace/jobs/${jobId}/apply`, payload);
  return res.data;
};

export const fetchMyApplications = async (): Promise<MyApplication[]> => {
  const res = await api.get("/marketplace/applications/mine");
  return res.data;
};

/** Accepting hires this applicant, closes the job and declines the others. */
export const setApplicationStatus = async (
  applicationId: string,
  status: "ACCEPTED" | "REJECTED"
): Promise<JobApplication> => {
  const res = await api.put(`/marketplace/applications/${applicationId}/status`, { status });
  return res.data;
};

export const fetchServices = async (opts: { search?: string; userId?: string } = {}): Promise<Paginated<Service>> => {
  const res = await api.get("/marketplace/services", {
    params: { limit: 50, ...(opts.search ? { search: opts.search } : {}), ...(opts.userId ? { userId: opts.userId } : {}) },
  });
  return res.data;
};

export const createService = async (payload: {
  title: string;
  description: string;
  price: number;
  category?: string;
}): Promise<Service> => {
  const res = await api.post("/marketplace/services", payload);
  return res.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await api.delete(`/marketplace/services/${id}`);
};
