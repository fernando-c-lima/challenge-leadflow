import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksList } from './tasks-list/tasks-list';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,TasksList
  ],
   exports: [
    TasksList
  ]
})
export class UiModule { }
