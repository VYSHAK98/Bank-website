import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../bankService/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout: Router, private fb: FormBuilder, private ds: DataService) { }

  ngOnInit(): void {

  }
  login() {
    var path = this.loginForm.value
    var acno = path.acno
    var psw = path.psw
    if (this.loginForm.valid) {
      this.ds.accountLogin(acno, psw).subscribe({
        next: (result: any) => {

          //store acno in local storage
          localStorage.setItem('currentAcno', JSON.stringify(acno))
          localStorage.setItem('currentUname', result.currentUser)
          localStorage.setItem('token', JSON.stringify(result.token))

          alert(result.message)
          // redirection
          this.rout.navigateByUrl('home')
        },
        error: (result: any) => {
          alert(result.error.message)
          this.rout.navigateByUrl('')
        }
      })
    }
    else {
      alert('invalid form')
    }
  }
}
