import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeaderAndFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra đường dẫn hiện tại, nếu là '/admin' thì ẩn header và footer
        this.showHeaderAndFooter = !event.url.startsWith('/admin');
      }
    });
  }

  ngOnInit(): void {
  }

}
