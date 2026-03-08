import type { Product } from "./product.model";

interface CartItem {
    product: Product;
    quantity: number;
}

export class Cart {
    constructor(public listProduct: CartItem[]) { }

    getTotalItems(): number {
        return this.listProduct.reduce((total, item) => total + item.quantity, 0);
    }

    getFinalPrice(): number {
        return this.listProduct.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    addItem(product: Product, quantity: number = 1): void {
        let exists = this.listProduct.some(item => {
            if (item.product.id === product.id) {
                item.quantity += quantity;
                return true;
            }
            return false;
        });

        if (!exists) {
            this.listProduct.push({ product, quantity });
        }
    }
}