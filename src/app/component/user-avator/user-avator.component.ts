import {Component, OnInit} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-user-avator',
  templateUrl: './user-avator.component.html',
  styleUrls: ['./user-avator.component.css'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class UserAvatorComponent implements OnInit {
  imgUrl: string = "../../../assets/robot.png";

  constructor() {
  }

  ngOnInit(): void {
  }

}
