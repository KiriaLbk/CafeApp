import { NgModule } from '@angular/core';
import { AuthRoutingModule, routingComponents } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckLoginService } from './check.login.service';
import { ErrorsService } from './form/form.errors.service';
import { CloudsDirective } from './directives/animation/clouds/clouds.directive';
import { ScrollDirective } from './directives/animation/scroller/scroll.directive';
import { HiddenDirective } from './directives/eye/hidden/hidden.directive';
import { httpInterceptorProviders } from './http-interceptors';



@NgModule({
  declarations: [
    routingComponents,
    ScrollDirective,
    CloudsDirective,
    HiddenDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    CheckLoginService,
    ErrorsService,
    httpInterceptorProviders
  ]
})
export class AuthModule { }
