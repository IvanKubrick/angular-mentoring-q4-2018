import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './store/auth.effects';
import { reducer } from './store/auth.reducer';

@NgModule({
  imports: [StoreModule.forFeature('auth', reducer), EffectsModule.forFeature([AuthEffects])]
})
export class AuthModule {}
