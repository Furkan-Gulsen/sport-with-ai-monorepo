import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateActivityModal } from 'src/app/modals/create-activity-modal/create-activity-modal.component';
import { ActivityService } from '../../services/activity.service';
import { ToastService } from '../../services/toast/toast-service';
import { ActivityDTO } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../../containers/dialog/dialog-box.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    private activityService: ActivityService,
    private readonly dialog: MatDialog
  ) {}

  public activities: ActivityDTO[] = [];

  ngOnInit(): void {
    this.getActivities();
  }

  public getActivities(): void {
    this.activityService.getActivities().subscribe(
      (activities: any) => {
        this.activities = activities;
      },
      (err: HttpErrorResponse) => {
        this.toastService.errorToast(err.error.message);
      }
    );
  }

  public createActivity(): void {
    const modalRef = this.modalService.open(CreateActivityModal, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.modalType = 'create';
    modalRef.result.then((res: boolean) => {
      if (res == true) {
        this.getActivities();
      }
    });
  }

  public editActivityModal(activity: ActivityDTO): void {
    const modalRef = this.modalService.open(CreateActivityModal, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.modalType = 'update';
    modalRef.componentInstance.currentForm = activity;
    modalRef.result.then((res: boolean) => {
      if (res == true) {
        this.toastService.successToast(
          'The update was performed successfully.'
        );
        this.getActivities();
      }
    });
  }

  public deleteActivityModal(activity: ActivityDTO): void {
    const dialogRef = this.dialog.open(DialogBox);
    dialogRef.componentInstance.content = `Are you sure you want to delete this activity: ${activity.name!}?`;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.activityService
          .deleteActivity(activity.id!)
          .subscribe((res: any) => {
            this.getActivities();
          });
      }
    });
  }
}
