import { Component, OnInit, ɵɵInputTransformsFeature } from '@angular/core';
import { DataService } from '../bankService/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // reactive form for money transfer
  transferForm=this.fb.group({
    rAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })
  name: any = ''
  acno: any = ''
  balance: any = ''
  message:any=''
  msgClr:any=true


  constructor(private ds: DataService,private fb: FormBuilder,private dp:DatePipe) { }


  ngOnInit(): void {
    // // check date present or not in ls
    if (localStorage.getItem('currentUname')) {
      this.name = localStorage.getItem("currentUname")

    }
  }

  getbalance() {
    // acno ls
    if (localStorage.getItem('currentAcno')) {
      this.acno = JSON.parse(localStorage.getItem('currentAcno') || "")
      // balance
      this.ds.getBalance(this.acno).subscribe({
        next: (result: any) => {
          this.balance = result.message
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })
    }
  }

  getProfile() {
    if (localStorage.getItem('currentAcno')) {
      this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
      // console.log(this.acno);
      // console.log(this.name);
    }
  }

  moneyTransfer(){
    if(this.transferForm.valid){
      var path=this.transferForm.value
      var rAcno=path.rAcno
      var amnt=path.amnt
      var psw=path.psw
      // console.log(rAcno);
      // sender acno
      if (localStorage.getItem('currentAcno')) {
        this.acno=JSON.parse(localStorage.getItem('currentAcno') || '')
        // console.log(this.acno); 
      } 
      // date
      const date=new Date()
      // console.log(date);
      var latestDate=this.dp.transform(date,"medium")
      // console.log(latestDate);
      if(this.acno==rAcno){
        this.message="sender and received account number are same"
        this.msgClr=false
      }
      else{
        //api
        this.ds.moneyTransferApi(this.acno,rAcno,amnt,psw,latestDate).subscribe({
          next:(result:any)=>{
            // alert(result.message)
            this.message=result.message
            this.msgClr=true
          },
          error:(result:any)=>{
            // alert(result.error.message)
            this.message=result.error.message
            this.msgClr=false
          }
        })
      }
    }
    else{
      this.message="invalid form"
      this.msgClr=false
    }
  }
}
