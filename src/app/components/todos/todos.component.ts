import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BaseResponse, Todo, TodosService } from '../../services/todos.service'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todo[]>
  error = ''

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos()
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100)
    const title = 'Angular ' + randomNumber
    this.todosService.createTodo(title)
  }

  deleteTodo() {
    const todoId = '857e80be-c852-49c4-9183-ae6a78aab5a7'
    this.todosService.deleteTodo(todoId)
  }
}
