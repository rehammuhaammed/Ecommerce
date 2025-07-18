import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
constructor(private flowbiteService: FlowbiteService) {}

 private readonly router=inject(Router)
 private readonly authService=inject(AuthService)

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  islogged=input<boolean>(true)

  signout(){
    // 1)remove token
    localStorage.removeItem('token')

    // 2)remove userData

    this.authService.UserData=null

    // console.log(this.authService.UserData);
    


    // 3)navigate to login
    this.router.navigate(['/login'])





  }

}
