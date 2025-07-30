import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { AlertComponent } from '../../shared/components/ui/alert/alert.component';
import { Router } from '@angular/router';
import { ForgetPassService } from '../../core/services/ForgetPass/forget-pass.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-newpass',
  imports: [ReactiveFormsModule,AlertComponent,TranslatePipe],
  templateUrl: './newpass.component.html',
  styleUrl: './newpass.component.css'
})
export class NewpassComponent implements AfterViewInit {

private readonly forgetPassService=inject(ForgetPassService)
private readonly router=inject(Router)
succesMsg:string=''
errorMsg:string=''
email:string=''
resetPassForm=new FormGroup({
   email:new FormControl<string>('',[Validators.required,Validators.email]),
   newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
})
ngAfterViewInit(): void {
   this.email = localStorage.getItem('email')!;
   this.resetPassForm.get('email')?.setValue(this.email);
  }
  
touched(c:string){
const control = this.resetPassForm.get(`${c}`);
  if (control?.touched || control?.dirty) {
    this.errorMsg = '';
    this.succesMsg = '';
  }
}

reset(){
  
  if(this.resetPassForm.valid){
  this.forgetPassService.resetPass(this.resetPassForm.value).subscribe({
    next:(res)=>{
      
      this.succesMsg='succes'
      console.log(res.token);


      localStorage.setItem('token',res.token)
      localStorage.removeItem('email')
             
          setTimeout(()=>{
         this.router.navigate(['/home'])
          },1000)
    },
    error:(err)=>{
      console.log(err);
      this.errorMsg=err.error.message
      
    }
  })

  }

  
}
}
