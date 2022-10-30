import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _url: string = environment.apiUrl;
  private _profileView = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {
  }

  showProfile(show: boolean): void {
    this._profileView.next(show)
  }
  listenProfile(): Observable<boolean> {
    return this._profileView.asObservable();
  }

  login(user: UserLogin): Observable<any> {
    const headers = {
      'Content-Type': 'application/json'
    }

    return this.client.post<any>(`${this._url}api/user/login`, user, { headers })
  }
}
