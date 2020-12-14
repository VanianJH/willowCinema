import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hasName = false;
  hasPass = false;
  hasEmail = false;

  private name: string;
  private pass: string;
  private email: string;

  somethingWrong = false;
  wrongMsg : string = "";

  constructor(private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.hasEmail = false;
    this.hasName = false;
    this.hasPass = false;
  }

  private res;
  async register() {
    const res = await this.loginService.getSignUp({username: this.name, password: this.pass, secondPassword: this.pass})
    // this.router.navigateByUrl('frontpage');
    if (res['success'] === true) {
      console.log('success registry');
      this.router.navigateByUrl('login');
    } else {
      this.somethingWrong = true;
      this.wrongMsg = res['message'];
    }
  }

  onKeyName(value: string): void {
    if (value.length > 0) {
      this.hasName = true;
    } else {
      this.hasName = false;
    }
    this.name = value;
  }

  onKeyPass(value: string): void {
    if (value.length > 0) {
      this.hasPass = true;
    } else {
      this.hasPass = false;
    }
    this.pass = value;
  }

  onKeyEmail(value: string): void {
    if (value.length > 0) {
      this.hasEmail = true;
    } else {
      this.hasEmail= false;
    }
    this.email = value;
  }
}
