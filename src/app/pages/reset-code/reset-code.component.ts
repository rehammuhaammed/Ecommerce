import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { Router } from '@angular/router';
import { ForgetPassService } from '../../core/services/ForgetPass/forget-pass.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, AlertComponent,TranslatePipe],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.css'
})
export class ResetCodeComponent {
  private readonly forgetPassService=inject(ForgetPassService)
 private readonly router=inject(Router)


 errorMsg:string=''
 succesMsg:string=''
codeForm=new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\d{5,6}$/)])
})


  touched(c:string){
const control = this.codeForm.get(`${c}`);
  if (control?.touched || control?.dirty) {
    this.errorMsg = '';
    this.succesMsg = '';
  }
}


send(){
  if(this.codeForm.valid){
    console.log(this.codeForm.value);
    this.forgetPassService.verifyCode(this.codeForm.value).subscribe({
      next:(res)=>{
        
        this.errorMsg=''
        this.succesMsg=res.status
        setTimeout(()=>{
          
          this.router.navigate(['/reset-pass'])
          
          
        },1000)
        
      },
      error:(err)=>{
        this.errorMsg=err.error.message
        
        
      }
    })
   
  }
}



}
