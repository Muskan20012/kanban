
import { Component, VERSION, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../Models/board.model';
import { Column } from '../Models/column.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  newColumnName = '';
  newTask = '';
  selectedColumn = '';
  name = 'Angular Material ' + VERSION.major + ' Kanban board';

  public board: Board = new Board('Test Board', [
    new Column('Todo', '21', [
    ]),
    new Column('In Progess', '32', [
      
    ])
  ]);

  // Initialize an array of newTask variables, one for each column
  newTasks: { [key: string]: string } = {};

  constructor(private auth: AngularFireAuth,private router:Router) {}

  ngOnInit(): void {
    // Initialize newTask variables for each column
    this.board.columns.forEach((column) => {
      this.newTasks[column.id] = '';
    });
  }
  logout(){
        return this.auth.signOut().then(()=>{
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        })
      }
  public dropGrid(event: CdkDragDrop<string[]>): void {
  moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
}
        
  public drop(event: CdkDragDrop<string[]>): void {
            if (event.previousContainer === event.container) {
              moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            } else {
              const taskToMove = event.item.data; 
              transferArrayItem(event.previousContainer.data,

                  event.container.data,
                  event.previousIndex,
                  event.currentIndex
              );
            }
          
            //   transferArrayItem(event.previousContainer.data,
            //       event.container.data,
            //       event.previousIndex,
            //       event.currentIndex);
            // }
          }
          
  // Method to add a new task to the selected column
  addTask(column: Column) {
    const newTask = this.newTasks[column.id];
    if (newTask.trim() !== '') {
      column.tasks.push(newTask);
      this.newTasks[column.id] = ''; // Clear the input field for this column
    }
  }
  addColumn() {
        if (this.newColumnName.trim() !== '') {
          const newColumn = new Column(this.newColumnName, 'uniqueId', []); // Generate a unique ID
          this.board.columns.push(newColumn);
          this.newColumnName = ''; // Clear the input field
        }
      }
      getConnectedColumnIds(): string[] {
          return this.board.columns.map((c) => c.id);
        }
  // ...
}
