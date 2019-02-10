import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [],
  providers: [AuthService],
  imports: [CommonModule]
})
export class CoreModule {}
