import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
 showSuccess(message: string) {
    this.showAlert(message, 'swal-success', 'check-circle', '#15803d');
  }

  showError(message: string) {
    this.showAlert(message, 'swal-error', 'times-circle', '#b91c1c');
  }
  private showAlert(message: string, className: string, iconName: string, iconColor: string) {

    Swal.fire({
      html: `
        <p class="font-semibold capitalize">
          ${message}  <span><i class="fas fa-${iconName}" style="color:${iconColor}; font-size: 18px;"></i></span>
        </p>
      `,
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      customClass: {
        popup: className
      },
      didOpen: () => {
        const swalPopup = Swal.getPopup();
        let remainingTime = Swal.getTimerLeft(); 
        let paused = false;

        swalPopup?.addEventListener('mouseenter', () => {
          if (!paused) {
            remainingTime = Swal.getTimerLeft(); 
            Swal.stopTimer(); 
            paused = true;
          }
        });
        swalPopup?.addEventListener('mouseleave', () => {
          if (paused) {
            Swal.resumeTimer(); 
          }
        });
      }
    });

}


}
