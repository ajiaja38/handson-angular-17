import { Injectable } from '@angular/core';
import { Boss } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  bosses: Boss[] = [];
  url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getBosses(): Observable<Boss[]> {
    return this.http.get<Boss[]>(this.url);
  }

  getBoss(name: string): Boss {
    return this.bosses.find((data) => data.name === name) as Boss;
  }
}
