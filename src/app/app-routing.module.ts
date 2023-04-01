import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RedesComponent } from './components/redes/redes.component';
import { PostulacionComponent } from './components/postulacion/postulacion.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContadorComponent } from './components/contador/contador.component';
import { SelectAdminsComponent } from './pages/select-admins/select-admins.component';
import { MinecraftComponent } from './pages/minecraft/minecraft.component';
import { CountAdminsComponent } from './pages/count-admins/count-admins.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { AdminsDashComponent } from './pages/admins-dash/admins-dash.component';
import { SisComponent } from './pages/sis/sis.component';
import { AdmisAdminComponent } from './pages/admis-admin/admis-admin.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { ControlAsistenciaComponent } from './pages/control-asistencia/control-asistencia.component';
import { ConcursoComponent } from './pages/concurso/concurso.component';


import { AuthGuard } from '@guards/auth.guard';
import { RedirectGuard } from '@guards/redirect.guard';

const routes: Routes = [
  { path: '', component: RedesComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'redes', component: RedesComponent },
  { path: 'postulacion', component: PostulacionComponent},
  { path: 'contador', component: ContadorComponent},
  { path: 'select-admins', component: SelectAdminsComponent},
  { path: 'minecraft', component: MinecraftComponent},
  { path: 'count-admins', component: CountAdminsComponent},
  { path: 'concurso/:id', component: ConcursoComponent },
  { path: 'concurso', component: ConcursoComponent },
  { path: 'rutas', component: RutasComponent},
  { 
    path: 'admins',
    canActivate: [RedirectGuard], 
    component: AdminsComponent,
  },
  { 
    path: 'sis',
    canActivate: [AuthGuard], 
    component: SisComponent,
    children: [
      { path: 'admins-dash', component: AdminsDashComponent},
      { path: 'admins-admin', component: AdmisAdminComponent},
      { path: 'reuniones',  component:  ControlAsistenciaComponent}
  ]
  
},
  { path: '**',  component:  PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
