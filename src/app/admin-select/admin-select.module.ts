import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSelectPageRoutingModule } from './admin-select-routing.module';

import { AdminSelectPage } from './admin-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSelectPageRoutingModule
  ],
  declarations: [AdminSelectPage]
})
export class AdminSelectPageModule {}
