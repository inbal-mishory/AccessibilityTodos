import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'add-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './addTodo.component.html',
  styleUrls: ['./addTodo.component.scss']
})
export class AddTodoComponent implements OnInit {
  addTodoForm: FormGroup = new FormGroup({});
  @Output() todoOutput: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addTodoForm = this.fb.group({
      task: new FormControl('', Validators.required),
      completed: new FormControl(false)
    });
  }

  onAddTodo() {
    const todo = this.addTodoForm.getRawValue();
    this.todoOutput.emit(todo);
    this.addTodoForm.reset();
  }
}
