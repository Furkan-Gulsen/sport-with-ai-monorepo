import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast/toast-service';
import { CreateWorkoutModal } from '../../modals/create-workout-modal/create-workout-modal.component';
import { WorkoutDTO, ActivityDayDTO, ActivityDTO } from '../../interfaces';
import { WorkoutService } from '../../services/workout.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../../containers/dialog/dialog-box.component';
import { ActivityService } from '../../services/activity.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EditWorkoutModal } from '../../modals/edit-workout-modal/edit-workout-modal.component';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss'],
})
export class SportComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    private workoutService: WorkoutService,
    private activityService: ActivityService,
    private readonly dialog: MatDialog
  ) {}
  public workouts: WorkoutDTO[] = [];
  public selectedWorkout!: WorkoutDTO;
  public selectedDay!: ActivityDayDTO;
  public activities: ActivityDTO[] = [];
  public selectedActivity!: ActivityDTO;
  public isVisibleActivites: boolean = false;
  public isVisibleActivityDay: boolean = false;

  ngOnInit(): void {
    this.getWorkouts();
    this.getAllActivities();
  }

  public getWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(
      (workouts: any) => {
        this.workouts = workouts;
      },
      (err: HttpErrorResponse) => {
        this.toastService.errorToast(err.error.message);
      }
    );
  }

  public selectWorkout(selectedWorkout: WorkoutDTO) {
    this.selectedWorkout = selectedWorkout;
    this.isVisibleActivites = false;
    this.isVisibleActivityDay = true;
  }

  public selectDay(selectedDay: ActivityDayDTO) {
    this.selectedDay = selectedDay;
    this.isVisibleActivites = true;
  }

  public getSelectedDayIDs() {
    return this.selectedDay.activities;
  }

  public getSelectedWorkoutActivityDays(): ActivityDayDTO[] {
    if (!this.selectedWorkout) {
      return [];
    } else {
      return this.selectedWorkout.activityDays!;
    }
  }

  public getAllActivities(): void {
    this.activityService.getActivities().subscribe((activities: any) => {
      this.activities = activities;
    });
  }

  public createActivityDay(): void {
    if (this.selectedWorkout) {
      const dialogRef = this.dialog.open(DialogBox);
      dialogRef.componentInstance.content = `Are you sure you want to create a new activity day?`;
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.workoutService
            .createActivityDay(this.selectedWorkout.id!)
            .subscribe(
              (res: any) => {
                const index: number = this.workouts.findIndex(
                  (workout) => workout.id == this.selectedWorkout.id!
                );
                this.workouts[index].activityDays?.push(res);
              },
              (err: any) => {
                this.toastService.errorToast(err.error.message);
              }
            );
        }
      });
    } else {
      this.toastService.errorToast(
        'There is a problem. Please try again later.'
      );
    }
  }

  public deleteActivityDay(): void {
    if (this.selectedWorkout && this.selectedWorkout.activityDays!.length > 0) {
      const dialogRef = this.dialog.open(DialogBox);
      dialogRef.componentInstance.content = `Are you sure you want to delete this activity day?`;
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.workoutService
            .deleteActivityDay(this.selectedWorkout.id!)
            .subscribe(
              (res: any) => {
                const index: number = this.workouts.findIndex(
                  (workout) => workout.id == this.selectedWorkout.id!
                );
                const length: number =
                  this.workouts[index].activityDays!.length;
                this.workouts[index].activityDays?.splice(length - 1, 1);
              },
              (err: any) => {
                this.toastService.errorToast(err.error.message);
              }
            );
        }
      });
    } else {
      this.toastService.errorToast(
        'There is a problem. Please try again later.'
      );
    }
  }

  public checkDeleteButtonVisible(): boolean {
    if (this.selectedWorkout && this.selectedWorkout.activityDays!.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public editWorkout(): void {
    const modalRef = this.modalService.open(EditWorkoutModal, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.currentForm = {
      name: this.selectedWorkout.name,
      kind: this.selectedWorkout.kind,
      information: this.selectedWorkout.information,
      imageURL: this.selectedWorkout.imageURL,
      id: this.selectedWorkout.id,
    };
    modalRef.result.finally(() => {
      this.ngOnInit();
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.selectedDay.activities!,
      event.previousIndex,
      event.currentIndex
    );
    this.updateActivityDay();
  }

  public createWorkout(): void {
    const modalRef = this.modalService.open(CreateWorkoutModal, {
      centered: true,
      size: 'md',
    });
    modalRef.result.then(() => {
      this.getWorkouts();
    });
  }

  public removeActivityIDInActivityDay(activity: ActivityDTO): void {
    const dialogRef = this.dialog.open(DialogBox);
    dialogRef.componentInstance.content = `Are you sure you want to remove ${activity.name} ?`;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.activityService
          .removeActivityInActivityDay(this.selectedDay.id!, activity.id!)
          .subscribe(
            (res: any) => {
              this.isVisibleActivites = false;
              this.isVisibleActivityDay = false;
              this.ngOnInit();
            },
            (err) => {
              this.toastService.errorToast(err.error.message);
            }
          );
      }
    });
  }

  public addActivity(): void {
    if (this.selectedActivity) {
      const dialogRef = this.dialog.open(DialogBox);
      dialogRef.componentInstance.content = `Are you sure you want to add ${this.selectedActivity.name} ?`;
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.activityService
            .addActivityInActivityDay(
              this.selectedDay.id!,
              this.selectedActivity.id!
            )
            .subscribe(
              (res: any) => {
                this.isVisibleActivites = false;
                this.isVisibleActivityDay = false;
                this.ngOnInit();
              },
              (err) => {
                this.toastService.errorToast(err.error.message);
              }
            );
        }
      });
    } else {
      this.toastService.errorToast('Select an activity.');
    }
  }

  public updateActivityDay(): void {
    if (this.selectedDay && this.selectedDay.activities) {
      this.workoutService
        .updateActivityDay({
          id: this.selectedDay.id!,
          activiteIDs: this.selectedDay.activities!.map(
            (activity: any) => activity.id
          ),
        })
        .subscribe(
          (res: any) => {},
          (err) => {
            this.toastService.errorToast(err.error.message);
          }
        );
    }
  }
}
