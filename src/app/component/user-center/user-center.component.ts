import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BuyTicketService } from 'src/app/service/buy-ticket/buy-ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {

  constructor(private buy: BuyTicketService,
    private cookie: CookieService,
    private route: ActivatedRoute, private router: Router,
    private login: LoginService) { }

  ticketMsgs: any[] = [];

  ngOnInit(): void {
    this.buy.getUserTicketsDetail(JSON.parse(this.cookie.get('userMsg'))['id'], this.ticketMsgs)
  }

  getTicketStatus(state) {
    if (state === 1) {
      return '已完成';
    } else if (state === 2) {
      return '已失效'
    } else if (state === 3) {
      return '已退款'
    } else if (state === 0) {
      return '待支付'
    }
  }

  async payTicket(tid) {
    const res = await this.buy.vipBuy(tid, 0)
    if (res['success']) {
      this.reload()
    } else {
      const res = await this.login.getCardId(JSON.parse(this.cookie.get('userMsg'))['id']);
      if(res['success']) {
        const nres = await this.login.chargeCard(res['content']['id']);
        if(nres['success']) {
          const res = await this.buy.vipBuy(tid, 0)
          if(res['success']) {
            this.reload()
          }
        }
      }
    }
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
