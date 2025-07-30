import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() control!: AbstractControl;
  @Input() fieldName!: string;
  @Input() form!: FormGroup;

}