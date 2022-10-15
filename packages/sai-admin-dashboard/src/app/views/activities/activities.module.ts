import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ActivitiesComponent],
})
export class ActivitiesModule {}
