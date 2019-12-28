import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hobby } from '../../models/hobby';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(private http: HttpClient) {

  }

  getUserHobby(id: String): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(`${environment.baseUrl}/v1/hobby/user/${id}/`);
  }

  addHobby(hobby: Hobby): Observable<Hobby> {
    return this.http.post<Hobby>(`${environment.baseUrl}/v1/hobby`, hobby);
  }

  deleteHobby(id: Hobby ,userId: String): Observable<Hobby> {
    return this.http.post<Hobby>(`${environment.baseUrl}/v1/hobby/${id}`,{userId});
  }
}
