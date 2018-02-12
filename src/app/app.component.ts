import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedMenu = 'recipes';

  onNavChanged(navigationMenu: string) {
    this.selectedMenu = navigationMenu;
  }
}
