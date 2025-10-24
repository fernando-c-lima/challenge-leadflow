import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeadDetailRoutingModule } from './lead-detail-routing-module';
import { LeadDetailComponent } from './lead-detail/lead-detail';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LeadDetailRoutingModule,
    RouterModule.forChild([{ path: '', component: LeadDetailComponent }])
  ]
})
export class LeadDetailModule { }
