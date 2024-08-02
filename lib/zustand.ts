import { create } from "zustand";
import { Job, Invoice } from "@prisma/client";
import getJobs from "@/actions/getJobs";
import { getJob as getJobAction } from "@/actions/getJob";

// Update the Job type to include invoices
type JobWithInvoices = Job & { invoices: Invoice[] };

interface JobState {
  jobs: Job[];
  job: JobWithInvoices | null;
  isLoading: boolean;
  error: string | null;
  selectedJob: Job | null;
  getJobs: () => Promise<void>;
  getJob: (id: string) => Promise<void>;
  updateJobs: (jobs: Job[]) => void;
  updateJob: (updatedJob: Partial<Job>) => void;
  updateJobRows: (updatedJob: Partial<Job>) => void;
  setSelectedJob: (job: Job | null) => void;
  startLoading: () => void;
  stopLoading: () => void;
  addNewJob: (job: Job) => void;
  clearJob: () => void;
  setJobs: (jobs: Job[]) => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  job: null,
  isLoading: false,
  error: null,
  selectedJob: null,
  setJobs: (jobs) => set({ jobs, isLoading: false }),

  getJobs: async () => {
    set({ isLoading: true });
    try {
      const response = await getJobs();
      set({ jobs: response, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch jobs", isLoading: false });
    }
  },
  getJob: async (id: string) => {
    set({ isLoading: true, error: null });
    console.log("getJob called with id:", id);
    try {
      const job = await getJobAction(id);
      console.log("Job fetched:", job);
      if (job) {
        set({ job, isLoading: false });
      } else {
        set({ job: null, error: "Job not found", isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      set({ job: null, error: "Failed to fetch job", isLoading: false });
    }
  },

  updateJobs: (jobs) => set({ jobs }),
  updateJob: (updatedJob) =>
    set((state) => {
      const updatedJobs = state.jobs.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      );
      const updatedSelectedJob =
        state.selectedJob && state.selectedJob.id === updatedJob.id
          ? { ...state.selectedJob, ...updatedJob }
          : state.selectedJob;
      const updatedCurrentJob =
        state.job && state.job.id === updatedJob.id
          ? { ...state.job, ...updatedJob }
          : state.job;

      return {
        jobs: updatedJobs,
        selectedJob: updatedSelectedJob,
        job: updatedCurrentJob,
      };
    }),
  updateJobRows: (updatedJob) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      ),
    })),
  setSelectedJob: (job) => set({ selectedJob: job }),
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  addNewJob: (newJob) =>
    set((state) => ({
      jobs: [newJob, ...state.jobs],
      selectedJob: newJob,
    })),
  clearJob: () => set({ job: null, isLoading: false, error: null }),
}));
