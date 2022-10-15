import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ToastService } from '../../services/toast/toast-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../../containers/dialog/dialog-box.component';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    private appService: AppService,
    private toastService: ToastService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPrivacyPolicy();
  }
  public content: string = '';

  public getPrivacyPolicy(): void {
    this.appService.getPrivacyPolicy().subscribe((res: any) => {
      if (res) {
        this.content = res.content;
      }
    });
  }

  public changeContent(newContent: string): void {
    this.content = newContent;
  }

  public editPrivacyPolicy(): void {
    const dialogRef = this.dialog.open(DialogBox);
    dialogRef.componentInstance.content = `Do you want to update the Privacy Policy?`;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appService
          .editPrivacyPolicy({
            content: this.content,
          })
          .subscribe(() => {
            this.toastService.successToast(
              'The update was performed successfully.'
            );
          });
      }
    });
  }
}
