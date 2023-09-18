import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  data="Happy Banking with us"
  data2="enter account number"

  constructor(){}

  ngOnInit(): void {
      
  }
  login(){
    alert("login clicked")
  }
  acnoChange(event:any){

    console.log(event.target.value);
    
  }

  pswChange(event:any){
    console.log(event.target.value);
    
  }
}
