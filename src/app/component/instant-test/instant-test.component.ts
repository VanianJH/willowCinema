import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-instant-test',
  templateUrl: './instant-test.component.html',
  styleUrls: ['./instant-test.component.css'],
})
export class InstantTestComponent{
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  bankCardId;
  bankCardPassWord;
  fare;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  
}

