import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Todo {
  id: string
  title: string
  addedDate: string
  order: number
}

export interface BaseResponse<T = {}> {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': 'd942cf44-c4bf-4479-b6cd-a2fc814755f8',
    },
  }

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      this.httpOptions
    )
  }

  createTodo(title: string): Observable<BaseResponse<{ item: Todo }>> {
    return this.http.post<BaseResponse<{ item: Todo }>>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      { title },
      this.httpOptions
    )
  }

  deleteTodo(todoId: string): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,
      this.httpOptions
    )
  }
}
