export type LeadStatus = 'New' | 'Qualified' | 'Won' | 'Lost';

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  tasksCount?: number;
}


export type LeadStatusString = 'New' | 'Qualified' | 'Won' | 'Lost';