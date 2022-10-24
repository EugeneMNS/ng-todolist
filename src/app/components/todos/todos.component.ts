import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

interface Todo {
  id: string
  title: string
  addedDate: string
  order: number
}

interface BaseResponse<T = {}> {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = []
  httpOptions = {
    withCredentials: true,
    headers: {
      'api-key': 'd942cf44-c4bf-4479-b6cd-a2fc814755f8',
    },
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTodos()
  }
  getTodos() {
    this.http
      .get<Todo[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', this.httpOptions)
      .subscribe((res: Todo[]) => {
        this.todos = res
      })
  }
  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100)
    const title = 'Angular ' + randomNumber
    this.http
      .post<BaseResponse<{ item: Todo }>>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title },
        this.httpOptions
      )
      .subscribe(res => {
        const newTodo = res.data.item
        this.todos.unshift(newTodo)
      })
  }

  deleteTodo() {
    const todoId = 'ec672b5b-8955-44fa-a1c6-228574a4cd87'
    this.http
      .delete<BaseResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,
        this.httpOptions
      )
      .subscribe(() => {
        this.todos = this.todos.filter(tl => tl.id !== todoId)
      })
  }
}
