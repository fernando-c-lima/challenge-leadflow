export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface TaskItem {
  id: number;
  leadId: number;
  title: string;
  dueDate?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}


export type TaskStatusString = 'Todo' | 'Doing' | 'Done';