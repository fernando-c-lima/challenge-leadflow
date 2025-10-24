import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private base = '/api/leads';

  constructor(private http: HttpClient) {}

  list(leadId: number): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.base}/${leadId}/tasks`);
  }

  create(leadId: number, payload: { title: string; dueDate?: string; status?: string }): Observable<number> {
    const statusMap: { [key: string]: number } = {
      'Todo': 0,
      'Doing': 1,
      'Done': 2
    };

    const apiPayload = {
      leadId: leadId,   
      title: payload.title,
      dueDate: payload.dueDate,
      status: payload.status ? statusMap[payload.status] : 0
    };

    return this.http.post<number>(`${this.base}/${leadId}/tasks`, apiPayload);
  }

  update(leadId: number, taskId: number, payload: {
     id: number;
     leadId: number;     
     title: string;
     dueDate?: string;
     status: number 
    }):Observable<void> {


    const apiPayload = {
      id: payload.id,
      leadId: payload.leadId,
      title: payload.title,
      dueDate: payload.dueDate,
      status: payload.status   
    };

    return this.http.put<void>(`${this.base}/${leadId}/tasks/${taskId}`, apiPayload);
  }

  delete(leadId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${leadId}/tasks/${taskId}`);
  }
}
