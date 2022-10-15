import { Component, Input } from '@angular/core';

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.component.html',
})
export class DialogBox {
  constructor() {}
  @Input() content: string = '';
}
