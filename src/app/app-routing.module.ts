import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

import{ServicesComponent} from './components/services/services.component'
import { SigninFormComponent } from './forms/signin-form/signin-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';


const routes: Routes = [
  {path: 'signup' , component:SignupFormComponent},
  {path: 'signin' , component:SigninFormComponent},
  {path:'about' , component:AboutComponent},
  {path:'services' , component: ServicesComponent},
  {path: 'home', component:HomeComponent},
  {path:' ', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
