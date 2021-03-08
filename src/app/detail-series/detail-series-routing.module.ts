import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailSeriesPage } from './detail-series.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSeriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailSeriesPageRoutingModule {}
