import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7168/api/Excel/UpdateExcel';

  constructor(private http: HttpClient) { }

  downloadExcel(): Observable<Blob> {
    return this.http.post(this.apiUrl, {}, { responseType: 'blob' });
  }
}
