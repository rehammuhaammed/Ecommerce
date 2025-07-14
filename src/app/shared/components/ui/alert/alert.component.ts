import { Component, Input } from '@angular/core';
import{FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-alert',
  imports: [ReactiveFormsModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() signupForm!:FormGroup


}