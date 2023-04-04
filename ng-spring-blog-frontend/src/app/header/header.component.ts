import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  logout() {
    this.authService.logout();
  }

}
