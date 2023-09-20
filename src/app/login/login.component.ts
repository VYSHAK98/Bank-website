import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  data="Happy Banking with us"
  data2="enter account number"

  acno:any
  psw:any

  constructor(private rout:Router){}

  ngOnInit(): void {
      
  }
  login(){
    // console.log(this.acno);
    // console.log(this.psw);

    //redirection
   this.rout.navigateByUrl("home")
  }
}
