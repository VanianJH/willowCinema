import { Component, Input, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { timeInterval } from 'rxjs/operators';
import { UserService } from 'src/app/service/User/user.service';
@Component({
  selector: 'app-charge-modal',
  templateUrl: './charge-modal.component.html',
  styleUrls: ['./charge-modal.component.css']
})
export class ChargeModalComponent {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, 
              private userService: UserService,
              private message: NzMessageService) {}

  @Input()
  cardId;
  @Input()
  father;


  bankCardId: string;
  bankCardPassWord: string;
  fare: string;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  charge() {
    if(this.bankCardPassWord==='123123' && Number(this.fare)>0) {
      this.isCharging = true;

      this.userService.chargeCard(this.cardId, Number(this.fare)).subscribe(res=>{
        if(res['success']) {
          this.father.updateMsg()
          this.cancel()
        } else {
          this.isCharging = false;
          this.message.error('信息不正确，充值失败！')
        }
      })
    } else {
      this.message.warning('请填写正确信息')
    }
  }


  cancel() {
    this.isCharging = false;
    this.modalRef.hide()
  }
  isCharging = false;

}
