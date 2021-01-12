import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { CommonModule } from '@angular/common';
import { AddCarComponent } from './add-car/add-car.component';
import {EditViacleComponent} from './edit-viacle/edit-viacle.component';
import {Viacle} from './car';

const routes: Routes = [
  { path: 'home', component: EntryComponent },
  {path: 'add', component: AddCarComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'edit', component:EditViacleComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
