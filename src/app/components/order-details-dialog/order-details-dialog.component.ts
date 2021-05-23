import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private _snackBar: MatSnackBar,
  ) { }

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

  getTotalAmount(): number {
    return this.order.items.map(item => item.price).reduce((a, b) => a + b);
  }

}
