import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { debounceTime } from 'rxjs/operators';
import { LeadsService } from '../../../core/services/leads.service';
import { Lead } from '../../../core/models/lead.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { LeadFormComponent } from '../lead-form/lead-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [

    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './leads-list.html',
  styleUrl: './leads-list.scss'
})

export class LeadListComponent  implements OnInit, AfterViewInit {

 filterForm!: FormGroup;
  dataSource = new MatTableDataSource<Lead>();
  displayedColumns: string[] = ['name', 'email', 'status', 'createdAt', 'actions'];
  totalItems = 0;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private leadsService: LeadsService,
    private router: Router


 ) {}

 ngOnInit(): void {

    this.filterForm = this.fb.group({
      search: [''],
      status: ['']
    });

    this.filterForm.get('search')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.loadLeads(1, this.paginator?.pageSize));

      this.filterForm.get('status')?.valueChanges
      .subscribe(() => this.loadLeads(1, this.paginator?.pageSize));

 
    this.loadLeads(1, 10);
  }

  ngAfterViewInit(): void {
    
    this.paginator.page.subscribe(() => {
      this.loadLeads(this.paginator.pageIndex + 1, this.paginator.pageSize);
    });

  
  }

 loadLeads(page: number = 1, size: number = 10): void {
  const search = this.filterForm.get('search')?.value;
  const status = this.filterForm.get('status')?.value;

  this.leadsService.list(search, status, page, size).subscribe({
    next: (res: any) => {
      console.log('Leads recebidos:', res);
      this.dataSource.data = res.items;
      this.totalItems = res.totalItems;
      if (this.paginator) {
          this.paginator.length = this.totalItems;
          this.paginator.pageIndex = page - 1; 
        }
  
      
    },
    error: (err) => console.error(err)
  });
}

openLeadForm(lead?: Lead): void {
  if (lead) {

    this.router.navigate(['/leads', lead.id, 'edit']);
  } else {
  
    this.router.navigate(['/leads', 'new']);
  }
}

viewTasks(leadId: number): void {
  this.router.navigate(['/leads', leadId, 'tasks']);
}

deleteLead(leadId: number): void {
  if (confirm('Tem certeza que deseja excluir este Lead e todas as suas Tasks associadas?')) {
    this.leadsService.delete(leadId).subscribe({
      next: () => {

        this.loadLeads(this.paginator.pageIndex + 1, this.paginator.pageSize);
      
      },
      error: (err) => console.error('Erro ao excluir lead:', err)
    });
  }
}

}