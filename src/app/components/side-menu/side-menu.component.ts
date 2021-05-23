import { Component, OnInit } from '@angular/core';

interface MenuItem { title: string, icon: string }

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  selected: string = 'Orders';
  items: MenuItem[] = [
    { title: 'Dashboard', icon: 'pa-dashboard' },
    { title: 'Orders', icon: 'pa-burger' },
    { title: 'Food & Drinks', icon: 'pa-cutlery' },
    { title: 'Messages', icon: 'pa-chatting' },
    { title: 'Settings', icon: 'pa-settings' },
  ];
  otherItems: MenuItem[] = [
    { title: 'Support', icon: 'pa-support' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
