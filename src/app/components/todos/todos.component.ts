import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

interface Todo {
  id: string
  title: string
  addedDate: string
  order: number
}
@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTodos()
  }
  getTodos() {
    this.http
      .get<Todo[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        withCredentials: true,
        headers: {
          'api-key': 'd942cf44-c4bf-4479-b6cd-a2fc814755f8',
        },
      })
      .subscribe((res: Todo[]) => {
        this.todos = res
      })
  }
}
