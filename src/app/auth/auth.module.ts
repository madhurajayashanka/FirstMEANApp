import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";


@NgModule({
declarations:[
  LoginComponent,
  SignupComponent,
],
  imports:[
    AngularMaterialModule,
    FormsModule,
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule{}
