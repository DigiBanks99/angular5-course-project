import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navigationSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  navigationChanged(navigationMenu: string) {
    this.navigationSelected.emit(navigationMenu);
  }
}
