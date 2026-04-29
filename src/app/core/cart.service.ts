import { Injectable } from '@angular/core';
import { Product } from '@catalog/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: Product[] = [];

  add(product: Product) {
    this.cart.push(product);
  }

  remove(product: Product) {
    this.cart = this.cart.filter((p) => p.id !== product.id);
  }

  get cartTotal() {
    return this.cart.reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }
}
