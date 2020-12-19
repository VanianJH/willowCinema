import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { tick } from '@angular/core/testing';
import { baseUrl } from "../baseUrl"
@Injectable({
  providedIn: 'root'
})
export class BuyTicketService {
  nowTicketMsg = {
    filmName: "",
    time: "",
    hall: "",
    seat: []
  }


  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  setNowTicketMsg(msg) {
    this.nowTicketMsg = msg;
  }

  getSeatMsg(sid: string) {
    return this.http.get(
      baseUrl + '/ticket/get/occupiedSeats?scheduleId=' + sid
    )
  }

  getTicketLock(ticketForm) {
    const res = this.http.post(
      baseUrl + '/ticket/lockSeat',
      ticketForm,
      this.options
    ).pipe(timeout(8000), catchError(error => of({ 'message': 'Request timeout!' })))
      .toPromise();
    return res;
  }

  vipBuy(orderId, ticketIds, couponId) {
    const res = this.http.post(
      baseUrl + "/ticket/vip/buy?orderId=" + orderId + "&ticketId=" + ticketIds + "&couponId=" + String(couponId),
      {},
      this.options
    ).pipe(timeout(8000), catchError(error => of({ 'message': 'Request timeout!' })))
      .toPromise();
    return res;
  }

  getCoupon(ticketId) {
    return this.http.post(
      baseUrl + "/ticket/generateOrder?ticketIds=" + String(ticketId),
      {},
      this.options
    )
  }

  getUserTickets(userID) {
    return this.http.get(
      baseUrl + "/ticket/get/" + userID
    )
  }
  getUserOrders(userID) {
    return this.http.get(
      baseUrl + "/ticket/get/orders/" + userID
    )
  }
  getScheduleById(id) {
    return this.http.get(
      baseUrl + "/schedule/" + id
    )
  }

  getMovieDetailById(movieId, userId) {
    return this.http.get(
      baseUrl + "/movie/" + movieId + "/" + userId
    )
  }

  getUserOrdersDetail(userId, orderMsgs: any[]) {
    this.getUserOrders(userId).subscribe(
      orderRes => {
        if (orderRes['success']) {
          for (let order of orderRes['content']) {
            this.getScheduleById(order['tickets'][0]['scheduleId']).subscribe(
              scheduleRes => {
                if (scheduleRes['success']) {
                  orderMsgs.push(
                    {
                      orderId: order['orderId'],
                      tickets: order['tickets'].map(t => {
                        return {
                          id: t['id'],
                          col: t['columnIndex'],
                          row: t['rowIndex']
                        }
                      }),
                      ticketsId: order['tickets'].map(t => t['id']),
                      state: order['state'],
                      movieName: scheduleRes['content']['movieName'],
                      time: scheduleRes['content']['startTime'],
                      price: Number(scheduleRes['content']['fare']) * order['tickets'].length,
                      hall: scheduleRes['content']['hallName'],
                      // posterUrl: "https://images.weserv.nl/?url=" + scheduleRes['content']['posterUrl'],

                      posterUrl: scheduleRes['content']['posterUrl'],
                    }
                  );
                  console.log(orderMsgs)
  }})}

}})}

  constructor(private http: HttpClient) { }
}
