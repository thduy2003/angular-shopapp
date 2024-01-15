import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
import { EmitService } from 'src/app/services/emit.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  token: string = ''
  userResponse?: UserResponse
  userProfileForm: FormGroup
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private tokenService: TokenService, private userService: UserService, private emitService: EmitService) {
    this.userProfileForm = this.formBuilder.group({
      fullname: [''],
      address: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      retype_password: ['', Validators.minLength(3)],
      date_of_birth: ['']
    } , {
      validators: [
        this.passwordMatchValidator()
      ]
    })
   }

  ngOnInit(): void {
    this.token = this.tokenService.getToken() ?? '';
    this.userService.getUserDetail(this.token).subscribe({
      next:(response: any) => {
        this.userResponse = {
          ...response,
          date_of_birth: new Date(response.date_of_birth)
        }
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0,10)
        })
        this.userService.saveUserToLocalStorage(this.userResponse)
      },
      complete: () => {

      },
      error: (err: any) => {
        console.error('failed', err)
      }
    })
  }
  save(): void {
    if(this.userProfileForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        ...this.userProfileForm?.value
      }
      this.userService.updateUserDetail(this.token, updateUserDTO).subscribe({
        next:(response:any) => {
          this.userService.removeUserFromLocalStorage();
          this.tokenService.removeToken();
          //phát đi sự kiện để bên header nhận sự kiện load lại data
          this.emitService.notifyUserChanged();
          this.router.navigate([''])
        },
        error:(err: any) => {
          console.log(err)
        }
      })
    } else {

      if(this.userProfileForm.hasError('passwordMissmatch')) {
        alert('Mật khẩu và mật khẩu gõ lại không chính xác')
      }
    }

  }
  passwordMatchValidator():ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypePassword = formGroup.get('retype_password')?.value
      if(password !== retypePassword) {
        return {passwordMissmatch: true}
      }
      return null;
    }
  }
}
