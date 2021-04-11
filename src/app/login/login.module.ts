import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular'

import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    LoginRoutingModule,
    HttpClientModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    CommonModule,
    NativeScriptCommonModule,
    HttpClientModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule

  ],
  declarations: [ LoginComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
