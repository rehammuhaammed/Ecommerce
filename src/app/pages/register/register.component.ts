import { Component } from '@angular/core';
import{FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registerForm:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword:new FormControl(null),
})
submit():void{
  console.log(this.registerForm);
  
}


}