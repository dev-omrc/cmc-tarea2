import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DESComponent } from './des/des.component';
import { HomeComponent } from './home/home.component';
import { OTPComponent } from './otp/otp.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'one-time-pad',
    component: OTPComponent
  },
  {
    path: 'des',
    component: DESComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
