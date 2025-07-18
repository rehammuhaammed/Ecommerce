import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  errorMsg:string=''
  succesMsg:string=''



  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })



  logIn(){

    
   if(this.loginForm.valid){
     this.authService.signin(this.loginForm.value).subscribe({
      next:(res)=>{
        // console.log(res);
         

        //1)show massege
        this.errorMsg=''
        this.succesMsg=res.message


        //2) save token to localstorage
        localStorage.setItem('token',res.token)
        // 3)decode token and save it in Userdata
        this.authService.decodeToken()

        //4) navigate to home
          setTimeout(()=>{
         this.router.navigate(['/home'])
          },1000)

        
      },
      error:(err)=>{
        // console.log(err);
        
        this.succesMsg=''
        this.errorMsg=err.error.message
        
      }
    })
   }else{
    this.loginForm.markAllAsTouched()
   }

    
  }





}
