import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface Page {
  title: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {}

  public pages: Page[] = [];

  ngOnInit(): void {
    this.pages = [
      {
        title: 'Home',
        url: '/home',
      },
      {
        title: 'Social Media',
        url: '/social-media',
      },
      {
        title: 'Sport',
        url: '/sport',
      },
      {
        title: 'Activities',
        url: '/activities',
      },
      {
        title: 'Privacy Policy',
        url: '/privacy-policy',
      },
      {
        title: 'Users',
        url: '/users',
      },
      {
        title: 'Logs',
        url: '/logs',
      },
    ];
  }

  getActivePage(pageURL: any): string {
    if (this.router.url == pageURL) {
      return 'nav-link active-page link-dark';
    }
    return 'nav-link link-light';
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['login']);
  }

  public changePage(page: Page) {}
}
