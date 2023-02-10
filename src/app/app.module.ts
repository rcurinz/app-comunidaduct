import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { RedesComponent } from './components/redes/redes.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostulacionComponent } from './components/postulacion/postulacion.component';

//primeNG
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ContadorComponent } from './components/contador/contador.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectAdminsComponent } from './pages/select-admins/select-admins.component';
import { MinecraftComponent } from './pages/minecraft/minecraft.component';
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RedesComponent,
    PageNotFoundComponent,
    PostulacionComponent,
    ContadorComponent,
    SpinnerComponent,
    SelectAdminsComponent,
    MinecraftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule,
    SelectButtonModule,
    CardModule,
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
