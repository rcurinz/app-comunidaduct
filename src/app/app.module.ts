import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { RedesComponent } from './components/redes/redes.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostulacionComponent } from './components/postulacion/postulacion.component';
import { AdmisAdminComponent } from './pages/admis-admin/admis-admin.component';
import { StickersPageComponent } from './pages/stickers-page/stickers-page.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { AdminUtilsComponent } from './pages/admin-utils/admin-utils.component';
import { ContadorComponent } from './components/contador/contador.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectAdminsComponent } from './pages/select-admins/select-admins.component';
import { MinecraftComponent } from './pages/minecraft/minecraft.component';
import { CountAdminsComponent } from './pages/count-admins/count-admins.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { AdminsDashComponent } from './pages/admins-dash/admins-dash.component';
import { SisComponent } from './pages/sis/sis.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { ControlAsistenciaComponent } from './pages/control-asistencia/control-asistencia.component';
import { ReunionCreateComponent } from './components/reunion-create/reunion-create.component';
import { ConcursoComponent } from './pages/concurso/concurso.component';
import { SorteosComponent } from './pages/sorteos/sorteos.component';


//Interceptors
import { TokenInterceptor } from '@interceptors/token.interceptor';


//primeNG
import { CheckboxModule} from 'primeng/checkbox';
import { SelectButtonModule} from 'primeng/selectbutton';
import { CardModule} from 'primeng/card';
import { DataViewModule} from 'primeng/dataview';
import { MenubarModule} from 'primeng/menubar';
import { ButtonModule} from 'primeng/button';
import { DialogModule} from 'primeng/dialog';
import { CalendarModule} from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DragDropModule } from 'primeng/dragdrop';
import { PickListModule } from 'primeng/picklist';
import { ToastModule } from 'primeng/toast';

import {DataTablesModule} from 'angular-datatables';



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
    MinecraftComponent,
    CountAdminsComponent,
    AdminsComponent,
    AdminsDashComponent,
    SisComponent,
    NavBarComponent,
    AdmisAdminComponent,
    RutasComponent,
    ControlAsistenciaComponent,
    ReunionCreateComponent,
    ConcursoComponent,
    SorteosComponent,
    PruebasComponent,
    AdminUtilsComponent,
    StickersPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    SelectButtonModule,
    CardModule,
    DialogModule,
    DataViewModule,
    CalendarModule,
    MenubarModule,
    DataTablesModule,
    AccordionModule,
    InputSwitchModule,
    InputTextModule,
    RatingModule,
    TagModule,
    ImageModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,
    ProgressSpinnerModule,
    DragDropModule,
    PickListModule,
    ToastModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
