import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg:string=''
  successMsg:boolean=false

  //group for login
  loginForm = this.fb.group({
    //array
    acno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
    //controlname and name is mentioned in html page
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }

  login(){
    if(this.loginForm.valid){
      //alert('Login Successfull !')
   /*  console.log(this.loginForm); */
    let acno = this.loginForm.value.acno
    //console.log(acno);
    let pswd = this.loginForm.value.pswd
    //console.log(pswd);
      
    
    //login api call
      this.api.login(acno,pswd).subscribe(
        //success
        (result:any)=>{
          this.successMsg= true
          //store username in local storage
          localStorage.setItem("username",result.username)
          //store acno in local storage
          localStorage.setItem("acno",JSON.stringify(result.acno))
          //store token in the local storage
          localStorage.setItem("token",result.token)
        //alert(result.message)
        setTimeout(()=>{
          //navigate to login page
        this.router.navigateByUrl('dashboard')
        },2000)
        
        
       },
       //client side error - account already exist)
       (result:any)=>{
        this.errorMsg = result.error.message
       }
    )
    }
    else{
      alert('Invalid Entry')
    }
    

    
  }
}
