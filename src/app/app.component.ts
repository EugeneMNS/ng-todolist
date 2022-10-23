import { Component } from '@angular/core'

interface Fruit {
  id: string
  name: string
  price: number
}

@Component({
  selector: 'inst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fruits: Fruit[] = [
    { id: '1', name: 'Apple', price: 1.99 },
    { id: '2', name: 'Orange', price: 2.99 },
    { id: '3', name: 'Banana', price: 123.99 },
    { id: '4', name: 'Grape', price: 4.99 },
    { id: '5', name: 'Pineapple', price: 5.99 },
    { id: '6', name: 'Strawberry', price: 6.99 },
    { id: '7', name: 'Watermelon', price: 7.99 },
    { id: '8', name: 'Mango', price: 18.99 },
    { id: '9', name: 'Peach', price: 9.99 },
  ]
}
