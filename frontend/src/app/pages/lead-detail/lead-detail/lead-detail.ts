

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Importe ActivatedRoute e Router
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Para o formulário de Tasks
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Lead } from '../../../core/models/lead.model';
import { TaskItem, TaskStatus } from '../../../core/models/task.model';
import { LeadsService } from '../../../core/services/leads.service';
import { TasksService } from '../../../core/services/tasks.service';



// Imports do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeadFormComponent } from '../../leads/lead-form/lead-form';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.html',
  styleUrls: ['./lead-detail.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    LeadFormComponent, 
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
})
export class LeadDetailComponent implements OnInit {
  @ViewChild(LeadFormComponent) leadFormComponent!: LeadFormComponent;
  lead$: Observable<Lead | null> = new Observable();

  isEditMode: boolean = false;
  leadId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leadService: LeadsService,
    private taskService: TasksService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {

  }

 ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  console.log('ID Parameter:', idParam);
  
  if (idParam === 'new') {
    this.isEditMode = false;
    this.leadId = null;
    this.lead$ = new Observable(subscriber => {
      subscriber.next(null);
      subscriber.complete();
    });
  } else if (idParam && !isNaN(Number(idParam))) {
    this.isEditMode = true;
    this.leadId = Number(idParam);
    this.lead$ = this.leadService.getById(this.leadId);
   
    this.lead$.subscribe(lead => {
      if (lead && lead.id) this.leadId = lead.id;
    });
  } else {
    console.error('ID inválido na rota:', idParam);
    this.router.navigate(['/leads']);
  }
}

  debugSave(event: any) {
  console.log('🎯 EVENTO SAVE CAPTURADO!', event);
  console.log('💡 Chamando onLeadSave...');
  this.onLeadSave(event);
}

  onLeadSave(leadData: any): void {
  const id = leadData.id ?? this.leadId;

  if (id) {
   
    this.leadService.update(id, leadData).subscribe({
      next: () => {
        this.snackBar.open('Lead atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/leads']);
      },
      error: () => this.snackBar.open('Erro ao atualizar lead.', 'Fechar', { duration: 3000 })
    });
  } else {

    this.leadService.create(leadData).subscribe({
      next: () => {
        this.snackBar.open('Lead criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/leads']);
      },
      error: () => this.snackBar.open('Erro ao criar lead.', 'Fechar', { duration: 3000 })
    });
  }
}


//   ngAfterViewInit() {
//   console.log('🔍 LeadDetailComponent view inicializada');
//   console.log('📝 isEditMode:', this.isEditMode);
//   console.log('👀 Componente LeadForm está no DOM?', document.querySelector('app-lead-form'));
// }
  
}