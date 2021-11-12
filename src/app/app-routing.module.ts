import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {SolveTaskComponent} from "./solve-task/solve-task.component";

const routes: Routes = [
  {path:'home' , component: HomepageComponent},
  {path:'' , component: HomepageComponent},
  {path:'add' , component: AddTaskComponent},
  {path:'solveTask' , component: SolveTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
