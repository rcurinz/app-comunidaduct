import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RedesComponent } from './components/redes/redes.component';
import { PostulacionComponent } from './components/postulacion/postulacion.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContadorComponent } from './components/contador/contador.component';

const routes: Routes = [
  { path: '', component: RedesComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'redes', component: RedesComponent },
  { path: 'postulacion', component: PostulacionComponent},
  { path: 'contador', component: ContadorComponent},

  { path: '**',  component:  PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
