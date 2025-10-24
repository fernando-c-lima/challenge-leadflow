import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Lead,LeadStatus } from '../../../core/models/lead.model';
import { LeadsService } from '../../../core/services/leads.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [
  
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule

  ],
  templateUrl: './lead-form.html',
  styleUrl: './lead-form.scss'
})

export class LeadFormComponent implements OnInit, OnChanges{

  @Input() lead?: Lead; 
  @Output() save = new EventEmitter<any>();

  form!: FormGroup;

  statusOptions: string[] = ['New', 'Qualified', 'Won', 'Lost'];

  constructor(
    private fb: FormBuilder,
    private leadsService: LeadsService,
    private snackBar: MatSnackBar,
    private router: Router

  ){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['New', Validators.required],

   
    });
  } 


  createLeadDirectly() {
  if (!this.form.valid) {
    this.form.markAllAsTouched();
    return;
  }


  const statusValue = this.form.get('status')?.value;
  console.log('🎯 Status selecionado no form:', statusValue);

  if (this.lead?.id) {
 
    const formData: any = {};

    
    const name = this.form.get('name')?.value;
    const email = this.form.get('email')?.value;

    if (name) formData.name = name;
    if (email) formData.email = email;


    formData.status = this.convertStatusToNumber(statusValue);

    console.log('✏️ Atualizando lead com:', formData);

    this.leadsService.update(this.lead.id, formData).subscribe({
      next: () => {
        this.snackBar.open('Lead atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/leads']); 
      },
      error: (err) => {
        console.error('❌ Erro ao atualizar lead:', err);
        this.snackBar.open('Erro ao atualizar lead.', 'Fechar', { duration: 3000 });
      }
    });

  } else {
 
    const formData = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      status: statusValue 
    };

    console.log('🚀 Criando lead com:', formData);

    this.leadsService.create(formData).subscribe({
      next: (newLead) => {
        console.log('✅ Lead criado com sucesso:', newLead);
        this.snackBar.open('Lead criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/leads']); 
      },
      error: (err) => {
        console.error('❌ Erro ao criar lead:', err);
        this.snackBar.open('Erro ao criar lead.', 'Fechar', { duration: 3000 });
      }
    });
  }
}

  ngOnInit(): void {
  console.log('✅ LeadFormComponent inicializado');
  console.log('Lead recebido:', this.lead);
  console.log('Form válido?', this.form.valid);
  console.log('Form valores:', this.form.value);
    setTimeout(() => {
    console.log('🔄 Formulário após timeout (deve estar conectado):', this.form.valid);
  }, 0);
  }


private convertStatusToString(status: number): string {
  switch (status) {
    case 0: return 'New';
    case 1: return 'Qualified';
    case 2: return 'Won';
    case 3: return 'Lost';
    default: return 'New';
  }
}

private convertStatusToNumber(status: string): number {
  switch (status) {
    case 'New': return 0;
    case 'Qualified': return 1;
    case 'Won': return 2;
    case 'Lost': return 3;
    default: return 0;
  }
}

ngOnChanges(changes: SimpleChanges): void {
  console.log('🔄 ngOnChanges - lead:', this.lead);
  
  if (changes['lead'] && this.lead) {
    console.log('📝 Preenchendo formulário com lead:', this.lead);
    
    const statusString = this.convertStatusToString(this.lead.status);
    
    this.form.patchValue({
      name: this.lead.name,
      email: this.lead.email,
      status: statusString,
    });
    
    console.log('✅ Formulário preenchido:', this.form.value);
  }
}

 goBack(): void {
    this.router.navigate(['/leads']);
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
}