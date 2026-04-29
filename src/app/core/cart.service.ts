import { computed, Injectable, signal } from '@angular/core';
import { Product } from '@catalog/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<Product[]>([]);

  get cart() {
    return this.cartItems.asReadonly();
  }

  add(product: Product) {
    this.cartItems.update((oldCart) => [...oldCart, product]);
  }

  remove(product: Product) {
    this.cartItems.update((oldCart) => oldCart.filter((p) => p.id !== product.id));
  }

  get cartTotal() {
    return computed(() => this.cartItems().reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0));
  }
}
