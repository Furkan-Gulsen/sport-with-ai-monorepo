import { Component } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public loaderService: LoaderService) {}
}
