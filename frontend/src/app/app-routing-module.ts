  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { LeadTasksComponent } from './pages/lead-tasks/lead-tasks';

  const routes: Routes = [
    { path: '', redirectTo: 'leads', pathMatch: 'full' },
    {
      path: 'leads',
      loadChildren: () => import('./pages/leads/leads-module').then(m => m.LeadsModule)
    },
    {
      path: 'leads/:id',
      loadChildren: () =>
        import('./pages/lead-detail/lead-detail-module').then((m) => m.LeadDetailModule),
    },
    {
      path: 'leads/:id/edit', 
      loadChildren: () =>
        import('./pages/lead-detail/lead-detail-module').then((m) => m.LeadDetailModule),
    },
    {
    path: 'leads/:id/tasks',
    component: LeadTasksComponent 
  }

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
