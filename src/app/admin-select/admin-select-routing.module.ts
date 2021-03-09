import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSelectPage } from './admin-select.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSelectPageRoutingModule {}
