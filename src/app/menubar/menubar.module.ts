import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';

import { MenubarModule } from 'primeng/primeng';

import { MenubarContainer } from './menubar.container';
import { MenubarService } from './menubar.service';
import { MenubarEffects } from './menubar.effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(MenubarEffects),
    MenubarModule,
  ],
  declarations: [
    MenubarContainer,
  ],
  providers: [
    MenubarService,
  ],
  exports: [
    MenubarContainer,
  ]
})
export class AppMenubarModule { }
