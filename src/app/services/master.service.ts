import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IClass {
  name: string;
  class: string;
}

export interface IClassData {
  name: string;
  class: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private readonly http: HttpClient) {}

  getSum(a: number, b: number): number {
    return a + b;
  }

  postClass(iClass: IClass): Observable<IClassData> {
    return this.http.post<IClassData>(
      'https://jsonplaceholder.typicode.com/posts',
      iClass
    );
  }

  getTodos(id: number): Observable<ITodo> {
    return this.http.get<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
