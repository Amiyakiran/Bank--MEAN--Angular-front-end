import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import party from "party-js";
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

cashtransfersuccessmsg:string=''
cashtransfererrormsg:string=''
user:string=''
acno:Number=0
iscollapse:boolean=true
balance:Number=0
logoutDiv:boolean=false
Acno:any=""
deleteconform:boolean=false
deleteSpinnerDiv:boolean=false
depositForm = this.fb.group({
  amount:['', [Validators.required, Validators.pattern('[0-9]*')]]

})
depositMsg:string=''

cashTransferForm = this.fb.group({
  toacno:['',[Validators.required, Validators.pattern('[0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
})
constructor(private api:ApiService,private fb:FormBuilder,private router:Router){

}

ngOnInit(){
  if(!localStorage.getItem("token")){
    alert("please Login")
  //navigate to login page
  this.router.navigateByUrl('')
  }
  //to fetch the username from local storage
  if (localStorage.getItem("username")) {
    this.user = localStorage.getItem("username")||''
  }
   
}
 //read more or less
  collapse(){
    this.iscollapse=!this.iscollapse
  }
getBalance(){
  //to fetch the username from local storage
  if (localStorage.getItem("acno")) {
    this.acno = JSON.parse(localStorage.getItem("acno")||'')
    this.api.getBalance(this.acno)
    .subscribe((result:any)=>{
      console.log(result);
      this.balance= result.balance
      
    })
  }
  
}

//deposite
deposit(){
  if(this.depositForm.valid){
    let amount = this.depositForm.value.amount
    this.acno = JSON.parse(localStorage.getItem("acno")||'')
    this.api.deposit(this.acno,amount)
    .subscribe(
      //incase of success
      (result:any)=>{
      console.log(result);
      this.depositMsg=result.message
      setTimeout(()=>{
        this.depositForm.reset()
        this.depositMsg=''
      },2000)
    },
    //case of failure
    (result:any)=>{
      this.depositMsg=result.error.message
    })
  }
  else{
    alert('Invalid Form')
  }
}
//showconfetti
showconfetti(source:any){
  party.confetti(source);
}


//transfer
transfer(){
  if(this.cashTransferForm.valid){
    let toacno = this.cashTransferForm.value.toacno
    let amt = this.cashTransferForm.value.amount
    let pswd = this.cashTransferForm.value.pswd
///make an api call
   this.api.cashtransfer(toacno,amt,pswd)
   .subscribe(
    //success
    (result:any)=>{
      console.log(result);
      
      this.cashtransfersuccessmsg=result.message
      setTimeout(()=>{
        this.cashtransfersuccessmsg=""
      },4000)
      
    },
    //error
    (result:any)=>{
      this.cashtransfererrormsg=result.error.message
      setTimeout(()=>{
        this.cashtransfererrormsg=""
      },4000)
      
    }
   )
  }
  else{
    alert('invalid Form')
  }
}
//to clear the cash transfer form
clearCashtransferForm(){
  this.cashtransfersuccessmsg=""
  this.cashtransfererrormsg=""
  this.cashTransferForm.reset()
}

//to logout

logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("acno")
  localStorage.removeItem("username")
  this.logoutDiv = true
  setTimeout(()=>{
    //navigate to login page
  this.router.navigateByUrl('')
  this.logoutDiv=false
  },3000);
}

//delete account
deleteAccountFromNavBar(){
  this.Acno = localStorage.getItem('acno')
  this.deleteconform = true
}


//canel the delete account
onCancel(){
  this.Acno=""
  this.deleteconform=false
}

onDelete(event:any){
  let deleteAcno = JSON.parse(event)
  this.api.deleteAccount(deleteAcno)
  .subscribe((result:any)=>{
    this.Acno=""
    localStorage.removeItem("token")
    localStorage.removeItem("acno")
    localStorage.removeItem("username")
    this.deleteSpinnerDiv = true
    setTimeout(()=>{
      //navigate to login page
    this.router.navigateByUrl('')
    this.deleteSpinnerDiv = false
    },4500);
  },
  (result:any)=>{
    alert(result.error.message)
  }
  )
}
}
