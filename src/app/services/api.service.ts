import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options={
 headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //api call for register
  register(uname:any, acno:any, pswd:any){
    const body ={
      uname, //here key and value have same name hence key only need t display otherwise uname:uname
      acno,
      pswd,

    }
    //server call to register an account and return response to register component
    return this.http.post('http://localhost:3000/register',body)//for a post method url and body required
  }



  //login
login(acno:any,pswd:any){

  const body ={
    acno,
    pswd
  }
   //server call to register an account and return response to login component
   return this.http.post('http://localhost:3000/login',body)//for a post method url and body required

} 
//function for appending token to the http header
appendToken(){
  
    //fetch token from local storage
    const token  = localStorage.getItem("token")||''
    //create http header
    var headers = new HttpHeaders()
    if (token) {
      //Append token inside headers
    headers=headers.append('access-token',token)
    //overload
    options.headers=headers
    }
      
    return options
    
 
}

//to get balance
getBalance(acno:any){
  return this.http.get('http://localhost:3000/getbalance/'+acno,this.appendToken())
}

//to deposite
deposit(acno:any,amount:any){
  const body ={
    acno,
    amount
  }
 return this.http.post('http://localhost:3000/deposit',body,this.appendToken())
}
//cash transfer
cashtransfer(toacno:any,amt:any,pswd:any){
const body={
  toacno,
  amt,
  pswd
}
 return this.http.post('http://localhost:3000/cashtransfer',body,this.appendToken())
}

//getAllTransactions
getAllTransactions(){
  return this.http.get('http://localhost:3000/all-transactions',this.appendToken())
}

//deleteAccount api

deleteAccount(acno:number){
  return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())
}

}

