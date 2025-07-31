import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-offline-ui',
  imports: [],
  templateUrl: './offline-ui.component.html',
  styleUrl: './offline-ui.component.css'
})
export class OfflineUiComponent {

   
   @Input({required:true}) isOff:boolean=false

   reload(){
    window.location.reload()
  }
}
