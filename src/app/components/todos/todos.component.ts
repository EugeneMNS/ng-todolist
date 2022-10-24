import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseResponse, Todo, TodosService } from '../../services/todos.service'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = []

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.getTodos()
  }
  getTodos() {
    this.todosService.getTodos().subscribe(res => {
      this.todos = res
    })
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100)
    const title = 'Angular ' + randomNumber
    this.todosService.createTodo(title).subscribe(res => {
      const newTodo = res.data.item
      this.todos.unshift(newTodo)
    })
  }

  deleteTodo() {
    const todoId = '5560c4a0-344e-4c96-8619-9f1b670aa906'
    this.todosService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(tl => tl.id !== todoId)
    })
  }
}
