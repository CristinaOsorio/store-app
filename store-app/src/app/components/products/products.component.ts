import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductsService, StoreService } from 'src/app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  shoppingCart: Product[] = [];
  total = 0;

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
    });
    this.shoppingCart = this.storeService.shoppingCart;
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
