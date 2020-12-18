import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-charge-modal',
  templateUrl: './charge-modal.component.html',
  styleUrls: ['./charge-modal.component.css']
})
export class ChargeModalComponent {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  bankCardId;
  bankCardPassWord;
  fare;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  charge() {}

  isCharging = false;

}
