import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


export interface DialogData {
  animal: string;
  name: string;
}

export class Todo{
  constructor(
      public  name: string,
  ){}
}
export class Done{
  constructor(
      public  name: string,
  ){}
}
export class ListAgent{
  constructor(
      public  name: string,
  ){}
}

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {

  todo: Array<string> = [];
  done: Array<string> = [];
  newTodo: Array<string> = [];

  todoListAgent: ListAgent[] = 
  [
    { name: 'Get to work' },
    { name: 'Pick up groceries' },
    { name: 'Go home' },
    { name: 'Fall asleep' }
  ];
  doneListAgent: ListAgent[] = 
  [
    { name: 'Get up' },
    { name: 'Brush teeth' },
    { name: 'Take a shower' },
    { name: 'Check e-mail' },
    { name: 'Walk dog' }
  ];
  /*todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];*/

  constructor(public dialogRef: MatDialogRef<PartnerListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.todoListAgent.forEach(element => {
      let t = 0;
      this.todo.push(element.name.toString());
    });
    this.doneListAgent.forEach(element => {
      this.done.push(element.name);
    });
  }

  onNoClick(): void {
    let d = this.done;
    let t = this.todo;
    this.dialogRef.close();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  dblclickMove(itemName: string, ...targets: string[]) {
    this[targets[0]] = [
      ...this[targets[1]].splice(this[targets[1]].indexOf(itemName), 1), 
      ...this[targets[0]]
      ];
  }

  autodrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onSearch(inputSearch) {
    this.todo.forEach(element => {
      if(element.includes(inputSearch.value)){
        this.newTodo.push(element);
    }});
  }
}
