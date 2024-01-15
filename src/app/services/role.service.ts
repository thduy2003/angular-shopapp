import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiGetRoles = `${environment.baseUrl}/roles`
  constructor(private http:HttpClient) {

  }
  getRoles():Observable<any>{
    return this.http.get<any[]>(this.apiGetRoles);
  }
}
