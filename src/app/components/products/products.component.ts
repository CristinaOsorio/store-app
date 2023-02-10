import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { CreateProductDTO, UpdateProductDTO } from './../../models';
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
  date = new Date(2023, 1, 1);
  showProductDetail = false;
  productChosen!: Product;

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

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetailsProduct(product: Product) {
    this.productChosen = product;
    this.toggleProductDetail();
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Titulo',
      price: 150,
      images: [''],
      description: 'Hola mundo',
      categoryId: 1,
    };
    this.productService.create(product).subscribe((data) => {
      this.products.push(data);
    });
  }

  updateProduct() {
    const product: UpdateProductDTO = {
      title: 'Titulo Change',
      description: 'Hola mundo Change',
    };
    const id = this.productChosen.id;
    this.productService.update(id, product).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );

      this.products[productIndex] = data;
      console.log(this.products[productIndex]);
      console.log(data);
      this.productChosen = data;
    });
  }
}
