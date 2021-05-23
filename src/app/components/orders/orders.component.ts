import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { Item, Order } from '../../models/order';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  @Input() isMobile: boolean = false;

  search: string = '';
  filterReceived: boolean = false;
  filterPreparing: boolean = false;
  filterReady: boolean = false;

  items: Item[] = [
    { name: 'Margherita Pizza - Medium', quantity: 2, price: 20 },
    { name: 'Chicken Cheese Burger - Large', quantity: 1, price: 8 },
    { name: 'French Fries - Large', quantity: 1, price: 7 },
    { name: 'Pepsi - 2L', quantity: 1, price: 5 },
    { name: 'Veg Sandwich', quantity: 1, price: 5 },
  ];
  orders: Order[] = [
    { id: 634871, customerName: 'Rick Harry', deliveryAddress: '#45, 2nd Main Road, Adyar, Chennai -600 412', status: 'received', items: [...this.items, ...this.items, ...this.items, ...this.items] },
    { id: 634874, customerName: 'Marty McFly', deliveryAddress: '#45, 2nd Main Road, Adyar, Chennai -600 412', status: 'preparing', items: this.items },
    { id: 634877, customerName: 'Forrest Gump', deliveryAddress: '#45, 2nd Main Road, Adyar, Chennai -600 412', status: 'preparing', items: this.items },
    { id: 634880, customerName: 'Barry', deliveryAddress: '#45, 2nd Main Road, Adyar, Chennai -600 412', status: 'ready', items: this.items },
  ];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }



  getTotalAmount(order: Order): number {
    return order.items.map(item => item.price).reduce((a, b) => a + b);
  }

  isNoOrders(): boolean {
    return !this.orders.some(order => this.shouldShow(order.status) && order.customerName.toLowerCase().trim().includes(this.search.toLowerCase().trim()));
  }

  shouldShow(status: 'received' | 'preparing' | 'ready'): boolean {
    if ((!this.filterReceived && !this.filterPreparing && !this.filterReady)
      || (this.filterReceived && status === 'received')
      || (this.filterPreparing && status === 'preparing')
      || (this.filterReady && status === 'ready')) {
      return true;
    }
    return false;
  }

  changeStatus(order: Order): void {
    const status = order.status;
    if (order.status === 'received') {
      order.status = 'preparing';
    } else if (order.status === 'preparing') {
      order.status = 'ready';
    }
    const displayStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    let snackBarRef = this._snackBar.open(`Order status updated to "${displayStatus}"`, 'Undo', { duration: 5000, panelClass: 'snackky', horizontalPosition: 'end' });
    snackBarRef.onAction().subscribe(() => { order.status = status; snackBarRef.dismiss(); });
  }

  openOrderDetails(order: Order): void {
    this.dialog.open(OrderDetailsDialogComponent, {
      panelClass: 'order-details-dialog',
      autoFocus: false,
      data: order,
    });
  }

}
