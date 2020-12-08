import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
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

  login(): void {
    this.router.navigateByUrl('/');
  }
}
