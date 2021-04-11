import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { LoginComponent } from '../login/login.component'


const routes: Routes = [
  { path: 'default', component: LoginComponent }

]
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class LoginRoutingModule {}
