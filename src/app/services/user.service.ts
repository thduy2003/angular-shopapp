import { LoginDTO } from './../dtos/user/login.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../dtos/user/register.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.baseUrl}/users/register`;
  private apiLogin = `${environment.baseUrl}/users/login`;
  private apiUserDetail = `${environment.baseUrl}/users/details`;
  private apiConfig = {
    headers: this.createHeaders()
  }
  constructor( private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
   return new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'vi'
  })
  }
  register(registerDTO: RegisterDTO): Observable<any>{

    return this.http.post(this.apiRegister, registerDTO, this.apiConfig)
  }
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig)
  }
  getUserDetail(token: string) {
    return this.http.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  updateUserDetail(token: string, updatedUserDTO: UpdateUserDTO) {
   let userResponse = this.getUserFromLocalStorage();
   return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`, updatedUserDTO, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
   })

  }
  saveUserToLocalStorage(userResponse?: UserResponse) {
    try {
        if(userResponse == null || !userResponse) {
          return;
        }
        const userResponseJSON = JSON.stringify(userResponse);
        localStorage.setItem('user', userResponseJSON)
        console.log('User response saved to local storage');
    } catch(error) {
        console.error("Error saving user to local storage", error);
    }
  }
  getUserFromLocalStorage(): UserResponse | null{
    try {
      const userResponseJSON = localStorage.getItem('user')
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      const userResponse = JSON.parse(userResponseJSON);
      console.log('User response retrieved from local storage');
      return userResponse
    } catch(error) {
      console.error("Error retrieving user response from local storage", error)
      return null;
    }
  }

  removeUserFromLocalStorage(): void {
    try{
      localStorage.removeItem('user')
      console.log('user data removed from local storage');
    }
    catch (error) {
console.error("Error removing user from local storage", error);
    }
  }
}
