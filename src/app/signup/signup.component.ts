import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../bankService/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  pswCheck: any = false

  //model for sign up form
  signupForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    cpsw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout: Router, private fb: FormBuilder, private ds: DataService) { }

  ngOnInit(): void {

  }
  //methods
  signup() {
    // console.log(this.signupForm.value.acno);
    var path = this.signupForm.value
    var acno = path.acno
    var uname = path.uname
    var psw = path.psw
    var cpsw = path.cpsw
    if (this.signupForm.valid) {
      if (psw == cpsw) {
        this.pswCheck = false
        //api call
        this.ds.accountCreate(acno, psw, uname).subscribe({

          next: (result: any) => {
            alert(result.message)
            this.rout.navigateByUrl('')
          },
          error: (result: any) => {
            alert(result.error.message)
            this.rout.navigateByUrl('')
          }
        })
      }
      else {
        this.pswCheck = true
      }
    }
    else {
      alert('invalid')
    }
    // alert("signup worked")
    // this.rout.navigateByUrl("")
  }
}
