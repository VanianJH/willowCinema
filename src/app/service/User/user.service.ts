import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';
import { Movie } from 'src/app/interface/movie';
import { baseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getUserProfile(userId) {
    return this.http.get(
      baseUrl + "/user/profile/"+userId
    )
  }

  saveUserProfile(userId, msg) {
    return this.http.post(
      baseUrl + "/user/profile/"+userId,
      {profile: msg},
      this.options
    )
  }
}
