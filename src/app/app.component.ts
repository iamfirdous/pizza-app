import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('side') sidenav?: MatSidenav;
  isMobile: boolean = false;

  constructor(private iconService: IconService) { }

  ngOnInit() {
    this.iconService.registerIcons();
    window.dispatchEvent(new Event('resize'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 500) {
      this.sidenav?.close();
      this.isMobile = true;
    } else {
      this.sidenav?.open();
      this.isMobile = false;
    }
  }
}
