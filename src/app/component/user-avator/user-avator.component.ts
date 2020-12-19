import {Component, OnInit} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-avator',
  templateUrl: './user-avator.component.html',
  styleUrls: ['./user-avator.component.css'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class UserAvatorComponent implements OnInit {
  imgUrl: string = "https://vanianjh.github.io/willowCinema/assets/avator.png";
  hovered: true
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  toUserCenter() {
    this.router.navigateByUrl("user/profile")
  }
}
