import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  imports: [CommonModule, UnauthorizedRoutingModule],
  declarations: [UnauthorizedComponent]
})
export class UnauthorizedModule {}
