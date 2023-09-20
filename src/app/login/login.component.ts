import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  data="Happy Banking with us"
  data2="enter account number"

  acno:string=""
  psw:string=""

  constructor(){}

  ngOnInit(): void {
      
  }
  login(){
    console.log(this.acno);
    console.log(this.psw);
    
    
    
  }
}
