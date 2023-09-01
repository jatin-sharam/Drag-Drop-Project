import { Component } from '@angular/core';
import todo from 'src/assets/todo.json';
import inprogress from 'src/assets/inprogress.json';
import onhold from 'src/assets/onhold.json';
import completed from 'src/assets/completed.json';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface Task {
  title: string;
  content: string;
}
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent {
  todo = todo;
  inprogress = inprogress;
  onhold = onhold;
  completed = completed;

  constructor(private dialog: MatDialog) {}
  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { title: '', content: '' } as Task,
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.todo.push(result);
      }
    });
  }
  editTask(task: Task) {
    console.log(
      'Before editing:',
      this.todo,
      this.inprogress,
      this.onhold,
      this.completed
    );
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { title: task.title, content: task.content } as Task,
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        const index = this.todo.indexOf(task);
        if (index !== -1) {
          this.todo[index] = result;
          console.log('After editing:', this.todo);
        }
      }
      if (result) {
        const index = this.onhold.indexOf(task);
        if (index !== -1) {
          this.onhold[index] = result;
          console.log('After editing:', this.onhold);
        }
      }
      if (result) {
        const index = this.inprogress.indexOf(task);
        if (index !== -1) {
          this.inprogress[index] = result;
          console.log('After editing:', this.inprogress);
        }
      }
      if (result) {
        const index = this.completed.indexOf(task);
        if (index !== -1) {
          this.completed[index] = result;
          console.log('After editing:', this.completed);
        }
      }
    });
  }

  deleteTask(task: Task) {
    const index = this.todo.indexOf(task);
    if (index !== -1) {
      this.todo.splice(index, 1);
    }
  }
  deleteTask1(task: Task) {
    const index = this.inprogress.indexOf(task);
    if (index !== -1) {
      this.inprogress.splice(index, 1);
    }
  }
  deleteTask2(task: Task) {
    const index = this.onhold.indexOf(task);
    if (index !== -1) {
      this.onhold.splice(index, 1);
    }
  }
  deleteTask3(task: Task) {
    const index = this.completed.indexOf(task);
    if (index !== -1) {
      this.completed.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
