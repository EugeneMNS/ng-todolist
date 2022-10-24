import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { environment } from '../../environments/environment'

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
  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])
  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': environment.apiKey,
    },
  }

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions)
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  createTodo(title: string) {
    return this.http
      .post<BaseResponse<{ item: Todo }>>(
        `${environment.baseUrl}/todo-lists`,
        { title },
        this.httpOptions
      )
      .pipe(
        map(res => {
          const newTodo = res.data.item
          const stateTodos = this.todos$.getValue()
          return [newTodo, ...stateTodos]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  deleteTodo(todoId: string) {
    return this.http
      .delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}`, this.httpOptions)
      .pipe(
        map(() => {
          return this.todos$.getValue().filter(tl => tl.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
