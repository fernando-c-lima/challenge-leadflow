import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LeadsRoutingModule } from './leads-routing-module';
import { LeadListComponent } from './leads-list/leads-list';
import { LeadFormComponent } from './lead-form/lead-form';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    MatTableModule,
    MatIconModule,
    LeadListComponent,
    LeadFormComponent,
    RouterModule.forChild([
      { path: '', component: LeadListComponent },
      { path: 'novo', component: LeadFormComponent },
      { path: ':id', component: LeadFormComponent }
    ])
    
  ]
})
export class LeadsModule { }
