import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BaseResponse, Todo, TodosService } from '../../services/todos.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = []
  error = ''
  subscriptions: Subscription = new Subscription()

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.getTodos()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getTodos() {
    this.subscriptions.add(
      this.todosService.getTodos().subscribe({
        next: res => {
          this.todos = res
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.message
        },
      })
    )
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100)
    const title = 'Angular ' + randomNumber
    this.subscriptions.add(
      this.todosService.createTodo(title).subscribe(res => {
        const newTodo = res.data.item
        this.todos.unshift(newTodo)
      })
    )
  }

  deleteTodo() {
    const todoId = '5560c4a0-344e-4c96-8619-9f1b670aa906'
    this.subscriptions.add(
      this.todosService.deleteTodo(todoId).subscribe(() => {
        this.todos = this.todos.filter(tl => tl.id !== todoId)
      })
    )
  }
}
