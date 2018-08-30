import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { fakeBackendProvider } from './helpers/fake.backend';
import { MockBackend } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';

const route: Routes = [
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent  , canActivate: [AuthGuard , AdminAuthGuard]},
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    NoAccessComponent,
    LoginComponent,
    NotFoundComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(route),
    HttpModule
  ],
  exports: [ RouterModule ],
  providers: [
    BaseRequestOptions,
    fakeBackendProvider,
    MockBackend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
