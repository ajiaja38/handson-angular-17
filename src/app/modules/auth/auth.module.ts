import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MoodPipe } from './pipes/mood.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    MoodPipe,
  ],
  imports: [CommonModule],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    MoodPipe,
  ],
})
export class AuthModule {}
