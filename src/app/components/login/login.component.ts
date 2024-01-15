import { EmitService } from 'src/app/services/emit.service';
import { TokenService } from './../../services/token.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginDTO } from '../../dtos/user/login.dto';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm") registerForm!: FormGroup;
  phoneNumber: string = '';
  password: string = '';
  selectedRole: Role | undefined = undefined
  roles: Role[] | undefined = undefined
  rememberMe: boolean = false;
  userResponse?: UserResponse
  constructor(private router:Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
    private emitService: EmitService
  ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {

        alert(error?.error?.message)
      }
    })

  }
  login() {
    // const message = `${this.phone} - ${this.password} - ${this.fullName} - ${this.dateOfBirth}`;
    // alert("You pressed register with data: " + message);
    const loginData: LoginDTO ={
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1

    }
    this.userService.login( loginData)
    .subscribe({
      next:(response: any) => {
        const{token} = response;
        if(this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next:(response:any) => {
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth)
              }
              this.userService.saveUserToLocalStorage(this.userResponse)
              //phát đi sự kiện để bên header nhận sự kiện load lại data
          this.emitService.notifyUserChanged();
          if(this.userResponse?.role.name === "ADMIN") {
            this.router.navigate(['/admin'])
          } else if(this.userResponse?.role.name === "USER") {
            this.router.navigate(['/'])
          }
           debugger
            },
            complete: () => {

            },

            error: (error: any) => {
              alert(error.error.message)
            }
          })
        }

      },
      complete:() => {

      },
      error: (error: any) => {

       alert(`Cannot login, error: ${error?.error?.message}`)
      }
    })
  }

}
