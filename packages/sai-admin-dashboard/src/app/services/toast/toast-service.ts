import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  successToast(
    textOrTpl: string | TemplateRef<any>,
    delay: number = 5000
  ): void {
    this.show(textOrTpl, {
      delay: delay,
      classname: 'bg-success text-light',
    });
  }

  warnToast(textOrTpl: string | TemplateRef<any>, delay: number = 5000): void {
    this.show(textOrTpl, {
      delay: delay,
      classname: 'bg-warning text-dark',
    });
  }

  errorToast(textOrTpl: string | TemplateRef<any>, delay: number = 5000): void {
    this.show(textOrTpl, {
      delay: delay,
      classname: 'bg-danger text-light',
    });
  }

  remove(toast: any, delay: number) {
    if (this.toasts.length > 5) {
      this.toasts.splice(0, 1);
    }
    setTimeout(() => {
      let index = this.toasts.indexOf(toast);

      if (index >= 0) {
        this.toasts.splice(index, 1);
      }
    }, delay);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
