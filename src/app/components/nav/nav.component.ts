import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter: number = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.cart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
