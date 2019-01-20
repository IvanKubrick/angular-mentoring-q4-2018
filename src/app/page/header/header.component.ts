import { Component } from '@angular/core';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string = 'Ivan Hrushevich';

  constructor(private readonly authService: AuthService) {}

  onLogOffClick(): void {
    this.authService.logout();
  }
}
