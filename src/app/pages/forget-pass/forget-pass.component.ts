import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { ForgetPassService } from '../../core/services/ForgetPass/forget-pass.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule, AlertComponent,TranslatePipe],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent  {


 private readonly forgetPassService=inject(ForgetPassService)
 private readonly router=inject(Router)
 succesMsg:string=''
 errorMsg:string=''
 email:string=''
 
  forgetForm=new FormGroup({
    email:new FormControl<string>('',[Validators.required,Validators.email])

})

touched(){
const control = this.forgetForm.get('email');
  if (control?.touched || control?.dirty) {
    this.errorMsg = '';
    this.succesMsg = '';
  }
}


sendCode(){
 if(this.forgetForm.valid){
    this.forgetPassService.forgetpass(this.forgetForm.value).subscribe({
    next:(res)=>{
      // console.log(res);
      this.errorMsg=''
      this.succesMsg=res.message
      setTimeout(()=>{
        this.router.navigate(['/verify-code'])
      },1000)

      this.email=this.forgetForm.get('email')?.value!

      
      localStorage.setItem('email',this.email)

      
    },
    error:(err)=>{
      // console.log(err.error.message);
      this.errorMsg=err.error.message

     
      
    }
  })
 }
  
}




}
