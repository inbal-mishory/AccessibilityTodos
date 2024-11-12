import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AddTodoComponent} from "../addTodo/addTodo.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

interface Todo {
  task: string;
  completed: boolean;
  id: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    AddTodoComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  todosList: Todo[] = [
    {
      task: 'Create a repository for the project',
      id: 1,
      completed: true
    },
    {
      task: 'Create an Angular skeleton app',
      id: 2,
      completed: true
    },
    {
      task: 'Check app for accessibility',
      id: 3,
      completed: true
    }
  ];

  todoForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({});
    this.todosList.forEach(todo => {
      this.todoForm.addControl(`completed-${todo.id}`, new FormControl(todo.completed));
    });
  }

  deleteTodo(todo: number) {
    this.todosList = this.todosList.filter((item: Todo) => item.id !== todo);
  };

  addTodo(event: any) {
    const index = Math.round(Math.random() * 1000);
    const newTodo = {
      task: event.task,
      id: index,
      completed: false
    };
    this.todoForm.addControl(`completed-${newTodo.id}`, new FormControl(newTodo.completed));
    this.todosList.push(newTodo);
  }

  completed(todo: Todo) {
    todo.completed = !todo.completed;
  }
}
