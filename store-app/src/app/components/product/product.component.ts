import { Product } from './../../models';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input('product') product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
}
