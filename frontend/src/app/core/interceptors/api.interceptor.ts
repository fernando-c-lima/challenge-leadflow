import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:5088';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `${this.baseUrl}${req.url}` });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
