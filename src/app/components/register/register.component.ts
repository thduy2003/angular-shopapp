import { Component, OnInit, AfterViewInit, ViewChild, NgZone, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild("registerForm") registerForm!: FormGroup;
  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private zone: NgZone, private router: Router, private userService: UserService) {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }

  register() {
    // const message = `${this.phone} - ${this.password} - ${this.fullName} - ${this.dateOfBirth}`;
    // alert("You pressed register with data: " + message);

    const registerData: RegisterDTO ={
      "fullname": this.fullName,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1,

    }
    const headers = new  HttpHeaders({'Content-Type': 'application/json'});
    this.userService.register( registerData)
    .subscribe({
      next:(response: any) => {

        this.router.navigate(['/login'])
      },
      complete:() => {

      },
      error: (error: any) => {

       alert(`Cannot register, error: ${error.error}`)
      }
    })
  }

  checkPasswordMatch() {
    this.zone.run(() => {
      if (this.registerForm && this.registerForm.controls['retypePassword']) {
        if (this.password !== this.retypePassword) {
          this.registerForm.controls['retypePassword'].setErrors({'passwordMismatch': true});
        } else {
          this.registerForm.controls['retypePassword'].setErrors(null);
        }
      }
    });
  }

  checkAge() {
    this.zone.run(() => {
      if(this.dateOfBirth) {



        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }


        if (age < 18) {
          this.registerForm.controls['dateOfBirth'] &&  this.registerForm.controls['dateOfBirth'].setErrors({'invalidAge': true});
        } else {
          this.registerForm.controls['dateOfBirth'] &&  this.registerForm.controls['dateOfBirth'].setErrors(null);
        }
      }

    });
  }

  ngAfterViewInit(): void {
    this.checkPasswordMatch();
    this.checkAge();
  }

  ngOnInit(): void {
    // Initialize your form controls here if needed
  }
}
