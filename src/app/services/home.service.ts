import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IComment } from '../interfaces/comment';
import { BYPASS_LOGGING } from '../shared/constants/context.constant';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  urlComment: string = 'https://jsonplaceholder.typicode.com/comments';
  JWT_TOKEN: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuZ3VsYXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjUxNjIzOTAyMn0.SLoP03tbQ_14HuxjyB8cMQBbAWkd9cT6qu1GyJx221g';
  JWT_TOKEN_REFRESH: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuZ3VsYXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjUxNjIzOTAyMn0.SLoP03tbQ_14HuxjyB8cMQBbAWkd9cT6qu1GyJx221g';

  constructor(private readonly http: HttpClient) {}

  getAllTodo(): Observable<any> {
    return this.http.get(this.url, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getAllComment(postId: number, email: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.urlComment, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        postId,
        email,
      },
      context: new HttpContext().set(BYPASS_LOGGING, true),
    });
  }

  getAuthToken() {
    return `Bearer ${this.JWT_TOKEN}`;
  }

  setAuthToken(token: string) {
    this.JWT_TOKEN = token;
  }

  getRefreshToken(): Observable<string> {
    return of(`Bearer ${this.JWT_TOKEN_REFRESH}`);
  }
}
