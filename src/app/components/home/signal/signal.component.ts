import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Coffee {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface CoffeeCartList {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
})
export class SignalComponent {
  quantity: Signal<number> = signal<number>(1);

  coffees: Coffee[] = [
    {
      id: 1,
      name: 'Cappuccino',
      price: 2,
      stock: 10,
    },
    {
      id: 2,
      name: 'Espresso',
      price: 1.5,
      stock: 15,
    },
    {
      id: 3,
      name: 'Latte',
      price: 3.5,
      stock: 30,
    },
  ];

  listCoffeeSelected = signal<CoffeeCartList[]>([]);

  totalPrice(): number {
    let total: number = 0;

    this.listCoffeeSelected().map((coffee) => {
      total += coffee.price;
    });

    return total;
  }

  addToListCoffeeSelected(coffee: Coffee) {
    this.coffees[coffee.id - 1].stock--;

    const existingCoffeeIndex = this.listCoffeeSelected().findIndex(
      (item) => item.id === coffee.id
    );

    if (existingCoffeeIndex !== -1) {
      this.listCoffeeSelected()[existingCoffeeIndex].quantity += 1;
      this.listCoffeeSelected()[existingCoffeeIndex].price =
        coffee.price * this.listCoffeeSelected()[existingCoffeeIndex].quantity;
      return;
    }

    this.listCoffeeSelected.update((listCoffeeSelected: CoffeeCartList[]) => {
      listCoffeeSelected.push({
        ...coffee,
        quantity: 1,
      });

      return listCoffeeSelected;
    });
  }

  addQtyAtCart(coffee: CoffeeCartList) {
    const findIndex = this.coffees.findIndex((item) => item.id === coffee.id);

    if (findIndex === -1) {
      alert('Coffee Not Found');
      return;
    }

    this.coffees[findIndex].stock--;

    coffee.quantity++;
    coffee.price = this.coffees[coffee.id - 1].price * coffee.quantity;
  }

  removeQtyAtCart(coffee: CoffeeCartList) {
    if (coffee.quantity === 1) {
      this.coffees[coffee.id - 1].stock++;
      const index = this.listCoffeeSelected().indexOf(coffee);

      this.listCoffeeSelected.update((list) => {
        list.splice(index, 1);
        return list;
      });

      return;
    }

    coffee.quantity--;
    coffee.price = this.coffees[coffee.id - 1].price * coffee.quantity;
    this.coffees[coffee.id - 1].stock++;
  }

  buy() {}
}
