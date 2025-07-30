import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AlertComponent,RouterLink,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {

 private readonly authService=inject(AuthService)
 private readonly router=inject(Router)
 succesMsg:string=''
 errorMsg:string=''

registerForm:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword:new FormControl(null,[Validators.required]),
},{ validators: this.confirmPass })

confirmPass(group:AbstractControl){
  const pass=group.get('password')?.value
  const rePass=group.get('rePassword')?.value
    if(pass===rePass){
      return null;
    }else{
      return {mismatch:true}
    }
  
}



submit():void{
  if(this.registerForm.valid){
  this.authService.signup(this.registerForm.value).subscribe({
    next:(res)=>{
      //navigate to login
      setTimeout(()=>{
         this.router.navigate(['/login'])
      },1000)
     
      console.log(res);
      this.errorMsg=''
      this.succesMsg=res.message
      
      
    },
    error:(err)=>{
       //show error massege
      
       this.succesMsg=''
      this.errorMsg=err.error.message
     
      
    }
  })
  }
  else{
    this.registerForm.markAllAsTouched()
  }


  
}





}