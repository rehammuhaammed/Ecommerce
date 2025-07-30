import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AlertComponent,RouterLink,TranslatePipe],
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

  touched(c:string){
const control = this.loginForm.get(`${c}`);
  if (control?.touched || control?.dirty) {
    this.errorMsg = '';
    this.succesMsg = '';
  }
}



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
