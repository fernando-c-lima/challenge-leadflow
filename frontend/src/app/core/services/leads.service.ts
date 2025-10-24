import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  private base = '/api/leads';

  constructor(private http: HttpClient) {}

  list(search?: string, status?: string, page?: number, size?: number): Observable<Lead[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);
    if (page != null) params = params.set('pageNumber', String(page));
    if (size != null) params = params.set('pageSize', String(size));
    return this.http.get<Lead[]>(this.base, { params });
  }

  getById(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.base}/${id}`);
  }

  create(payload: { name: string; email: string; status?: string }): Observable<number> {
    const statusMap: { [key: string]: number } = {
    'New': 0,
    'Qualified': 1,
    'Won': 2,
    'Lost': 3
  };

    const apiPayload = {
      name: payload.name,
      email: payload.email,
      status: payload.status ? statusMap[payload.status] : 0 
    };

    console.log('📤 Enviando para API:', apiPayload);
    return this.http.post<number>(this.base, apiPayload);
    }

    update(id: number, payload: { name: string; email: string; status: number }): Observable<void> {
      console.log('🔍 Status recebido:', payload.status, 'Tipo:', typeof payload.status);

      const apiPayload = {
        id: id,
        name: payload.name,
        email: payload.email,
        status: payload.status 
      };

      console.log('📤 Payload completo enviado:', JSON.stringify(apiPayload, null, 2));
      return this.http.put<void>(`${this.base}/${id}`, apiPayload);
    }

      delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
      }
    }
