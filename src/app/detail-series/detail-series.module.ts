import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailSeriesPageRoutingModule } from './detail-series-routing.module';

import { DetailSeriesPage } from './detail-series.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailSeriesPageRoutingModule
  ],
  declarations: [DetailSeriesPage]
})
export class DetailSeriesPageModule {}
