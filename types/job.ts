export interface Job {
  id: string;
  name: string;
  mobile?: string;
  email?: string;
  address?: string;
  notes?: string;
  number?: number;
  stage: string;
  date: Date;
  toAction?: boolean;
}
