import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteConformComponent } from './delete-conform/delete-conform.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  //login
  {path:'' ,component:LoginComponent},
  //register
  {path:'register', component:RegisterComponent},
  //dashboard
  {path:'dashboard', component:DashboardComponent},
 
  //transactions
  {path:'transactions', component:TransactionsComponent},
  //pagenotfound
  {path:'**', component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
