import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  getSignUp(registerForm) {
    const res = this.http.post(
      'http://localhost:8080/register',
      registerForm,
      this.options
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }

  getLogin(loginForm) {
    const res = this.http.post(
      'http://localhost:8080/login',
      loginForm,
      this.options
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }

  getCardId(userId) {
    const  res = this.http.get(
      "http://localhost:8080/vip/"+ userId + '/get'
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }

  generateCard(userId) {
    const res = this.http.post(
        'http://localhost:8080/vip/add/directly?userId='+userId+ '&fare=25',
        {},
        this.options
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }

  chargeCard(cardId) {
    const res = this.http.post(
      'http://localhost:8080/vip/charge/directly',
      {
        vipId: cardId,
        amount: 10000
    },
    this.options
    ).pipe(timeout(3000), catchError(error => of({'message': 'Request timeout!'})))
    .toPromise();
    return res;
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  constructor(private http: HttpClient) {
  }
}
