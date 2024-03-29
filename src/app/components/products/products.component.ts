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
  offset: number = 0;
  limit: number = 10;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetailsProduct(product: Product) {
    // this.productChosen = product;
    this.statusDetail = 'loading';
    this.productService.getProduct(product.id).subscribe(
      (product) => {
        this.productChosen = product;
        this.toggleProductDetail();
        this.statusDetail = 'success';
      },
      (error) => {
        this.statusDetail = 'error';
        window.alert(error);
      }
    );
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
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore(): void {
    this.productService
      .getProductByPage(this.offset, this.limit)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
