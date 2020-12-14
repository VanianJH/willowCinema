import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class BuyTicketService {
  
  nowTicketMsg =  {
    filmName: "", 
    time: "",
    hall: "",
    seat: []
  }


  headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  options = { headers: this.headers };

  setNowTicketMsg(msg) {
    this.nowTicketMsg = msg;
  }
  
  getSeatMsg(sid: string) {
    return this.http.get(
      'http://localhost:8080/ticket/get/occupiedSeats?scheduleId='+sid
    )
  }

  getTicketLock(ticketForm) {
    const res = this.http.post(
      'http://localhost:8080/ticket/lockSeat',
      ticketForm,
      this.options
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }

  vipBuy(ticketId, couponId) {
    const res = this.http.post(
      "http://localhost:8080/ticket/vip/buy?ticketId="+String(ticketId)+"&couponId="+String(couponId),
      {},
      this.options
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }

  getCoupon(ticketId) {
    return this.http.post(
      "http://localhost:8080/ticket/generateOrder?ticketIds="+String(ticketId),
      {},
      this.options
    )
  }

  getUserTickets(userID){
    return this.http.get(
      "http://localhost:8080/ticket/get/"+userID
    )
  }

  getScheduleById(id) {
    return this.http.get(
      "http://localhost:8080/schedule/" + id
    )
  }

  getMovieDetailById(movieId, userId) {
    return this.http.get(
      "http://localhost:8080/movie/"+movieId+"/" + userId
    )
  }

  getUserTicketsDetail(userId, ticketMsgs: any[]){
    this.getUserTickets(userId).subscribe(ticketRes=>{
      if(ticketRes['success']) {
        for(let t of ticketRes['content']) {
          this.getScheduleById(t['scheduleId']).subscribe(scheRes=>{
            if(scheRes['success']) {
              this.getMovieDetailById(scheRes['content']['movieId'], userId).subscribe(
                movieRes=>{
                  if(movieRes['success']) {
                    let ati = {
                      ticketId: t['id'],
                      state: t['state'],
                      movieName: scheRes['content']['movieName'],
                      time: scheRes['content']['startTime'],
                      price: scheRes['content']['fare'],
                      hall: scheRes['content']['hallName'],
                      posterUrl: movieRes['content']['posterUrl'],
                      column: t["columnIndex"],
                      row: t["rowIndex"]
                    }
                    ticketMsgs.push(ati)  
                    console.log(ati)                  
                  } else {

                  }
                }
              )
            } else {

            }
          })
        }
      } else {

      }
    })
    }

  constructor(private http: HttpClient) { }
}
