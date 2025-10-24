import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// Serviços e Models
import { TasksService } from '../../core/services/tasks.service';
import { TaskItem } from '../../core/models/task.model';

@Component({
  selector: 'app-lead-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './lead-tasks.html',
  styleUrls: ['./lead-tasks.scss']
})
export class LeadTasksComponent implements OnInit {
  leadId!: number;
  tasks: TaskItem[] = [];
  taskForm: FormGroup;
  
  statusOptions = [
    { label: 'Todo', value: 'Todo' },
    { label: 'Doing', value: 'Doing' },
    { label: 'Done', value: 'Done' }
];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: [null],
      status: ['Todo', Validators.required]
    });
  }

  ngOnInit() {
  this.leadId = Number(this.route.snapshot.paramMap.get('id'));
  this.loadTasks();

  this.taskForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: [null],
    status: [0, Validators.required] 
  });
}

  loadTasks(): void {
    this.tasksService.list(this.leadId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar tasks', 'Fechar', { duration: 3000 });
      }
    });
  }

  onCreateTask(): void {
  if (this.taskForm.valid) {
    const taskData = {
      title: this.taskForm.get('title')?.value,
      dueDate: this.taskForm.get('dueDate')?.value,
      status: this.taskForm.get('status')?.value,
      leadId: this.leadId
    };

    console.log('Task sendo criada:', taskData);

    this.tasksService.create(this.leadId, taskData).subscribe({
      next: (newTask) => {
        this.snackBar.open('Task criada com sucesso!', 'Fechar', { duration: 3000 });
        this.taskForm.reset({ status: 0 });
        this.loadTasks(); 
      },
      error: (err) => {
        console.error('Erro ao criar task:', err);
        this.snackBar.open('Erro ao criar task', 'Fechar', { duration: 3000 });
      }
    });
  } else {
    this.snackBar.open('Formulário inválido. Preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
  }
}

statusMap: { [key: string]: number } = {
  'Todo': 0,
  'Doing': 1,
  'Done': 2
};


  onUpdateStatus(taskId: number, newStatus: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    
  const updateData = {
    id: taskId,
    leadId: this.leadId,
    title: task.title,
    dueDate: task.dueDate,
    status: this.statusMap[newStatus] 
  };

    this.tasksService.update(this.leadId, taskId, updateData).subscribe({
      next: () => {
        this.snackBar.open('Status atualizado!', 'Fechar', { duration: 2000 });
        this.loadTasks();
      },
      error: (err) => {
        this.snackBar.open('Erro ao atualizar status', 'Fechar', { duration: 3000 });
      }
    });
  }

  onDeleteTask(taskId: number): void {
    if (confirm('Tem certeza que deseja excluir esta task?')) {
      this.tasksService.delete(this.leadId, taskId).subscribe({
        next: () => {
          this.snackBar.open('Task excluída!', 'Fechar', { duration: 3000 });
          this.loadTasks();
        },
        error: (err) => {
          this.snackBar.open('Erro ao excluir task', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

statusReverseMap: { [key: number]: string } = {
  0: 'Todo',
  1: 'Doing',
  2: 'Done'
};


getStatusLabel(status: number): string {
  return this.statusReverseMap[status] ?? 'Todo';
}

  goBack(): void {
    this.router.navigate(['/leads']);
  }
}