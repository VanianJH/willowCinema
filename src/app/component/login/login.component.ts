import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasName = false;
  hasPass = false;

  private name: string;
  private pass: string;

  somethingWrong = false;
  wrongMsg = "";

  constructor(private router: Router, 
    private loginService: LoginService,
    private cookies: CookieService) { }

  ngOnInit(): void {
    this.hasName = false;
    this.hasPass = false;
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

  async login() {
    const res = await this.loginService.getLogin({username: this.name, password: this.pass})
    if(res['success']) {
      const userMsg = res['content']
      console.log("userMsg: ", userMsg)
      this.cookies.set('userMsg', JSON.stringify(userMsg))

      const cardRes = await this.loginService.generateCard(userMsg['id']);
      if(cardRes['success']) {
        const chargeRes = await this.loginService.chargeCard(cardRes['content']['id'])
        console.log('charge success: ', chargeRes)
      } else {
        console.log(cardRes)
      }

      this.router.navigateByUrl('/frontpage');
    } else {
      this.somethingWrong = true;
      this.wrongMsg = res['message'];
    }
  }


}
