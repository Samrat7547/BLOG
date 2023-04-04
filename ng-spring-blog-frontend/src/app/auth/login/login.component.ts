import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginPayload } from '../login-payload';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginPayload!: LoginPayload;
  
  constructor(private authService: AuthService, private router: Router){
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  onSubmit(){
    this.loginPayload.username = this.loginForm.get('username')!.value;
    this.loginPayload.password = this.loginForm.get('password')!.value;

    this.authService.login(this.loginPayload)
    .subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/home');
      } else {
        console.log('Login failed');
      }
    });
  }

}
