import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityDTO } from '../../interfaces';
import { ActivityService } from '../../services/activity.service';
import { ToastService } from '../../services/toast/toast-service';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.scss'],
})
export class CreateActivityModal implements OnInit {
  constructor(
    private toastService: ToastService,
    public activeModal: NgbActiveModal,
    public activityService: ActivityService
  ) {}
  public activityFormGroup!: FormGroup;
  public file!: File | any;
  public isLoading: boolean = false;
  public modalType: string = 'create';
  public currentForm!: ActivityDTO;
  public imageURL!: string;

  ngOnInit(): void {
    console.log(this.currentForm);

    this.setActivityFormGroup();
  }

  public setActivityFormGroup(): void {
    if (typeof this.currentForm === 'undefined') {
      this.activityFormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        numberOfRepetitions: new FormControl(null, Validators.required),
        isAI: new FormControl(false, Validators.required),
        imageURL: new FormControl('', Validators.required),
        calorie: new FormControl(0, Validators.required),
      });
    } else {
      this.activityFormGroup = new FormGroup({
        name: new FormControl(this.currentForm.name, Validators.required),
        numberOfRepetitions: new FormControl(
          this.currentForm.numberOfRepetitions,
          Validators.required
        ),
        calorie: new FormControl(this.currentForm.calorie, Validators.required),
        isAI: new FormControl(this.currentForm.isAI, Validators.required),
        imageURL: new FormControl(
          this.currentForm.imageURL,
          Validators.required
        ),
      });
    }
    this.setImageURL();
  }

  public setImageURL(): void {
    this.imageURL = this.activityFormGroup.get('imageURL')?.value;
  }

  public handleFileInput(event: any) {
    try {
      const name: string = event.target.files[0].name;
      this.setImageURL();
      const splitted: string[] = name.split('.');
      if (
        !['jpeg', 'png', 'jpg', 'gif'].includes(splitted[splitted.length - 1])
      ) {
        this.toastService.errorToast(
          `The file ${name} could not be uploaded. The file is invalid or not supported. Allowed types: .jpg .jpeg .png `
        );
        const imagePostElement: any = document.getElementById('cover-image');
        imagePostElement.value = '';
        this.file = undefined;
      } else {
        this.file = event.target.files[0];
      }
    } catch (error) {
      this.file = undefined;
      const imagePostElement: any = document.getElementById('cover-image');
      imagePostElement.value = '';
      this.toastService.errorToast(
        `There is a problem. Please try again later.`
      );
    }
  }

  private sendActivity() {
    if (this.modalType == 'create') {
      this.activityService
        .createActivity(this.activityFormGroup.getRawValue())
        .subscribe(
          (res: any) => {
            this.toastService.successToast(
              'The activity was created successfully.'
            );
            this.isLoading = false;
            this.activeModal.close(true);
          },
          (err: any) => {
            this.isLoading = false;
            this.toastService.errorToast(
              `There is a problem. Please try again later.`
            );
          }
        );
    } else {
      let updateFormData = this.activityFormGroup.getRawValue();
      updateFormData.id = this.currentForm.id;
      this.activityService.updateActivity(updateFormData).subscribe(
        (res: any) => {
          this.toastService.successToast(
            'The activity was updated successfully.'
          );
          this.isLoading = false;
          this.activeModal.close(true);
        },
        (err: any) => {
          this.isLoading = false;
          this.toastService.errorToast(
            `There is a problem. Please try again later.`
          );
        }
      );
    }
  }

  public createActivity(): void {
    this.isLoading = true;
    if (
      this.activityFormGroup.get('name')?.valid &&
      this.activityFormGroup.get('numberOfRepetitions')?.valid
    ) {
      // string to boolean for isAI prop
      const isAI: string = this.activityFormGroup.get('isAI')?.value;
      this.activityFormGroup
        .get('isAI')
        ?.setValue(isAI === 'true' ? true : false);
      // Start create activity process

      if (typeof this.file !== 'undefined') {
        this.activityService.uploadImage(this.file!.name, this.file).subscribe(
          (s3Object: any) => {
            this.activityFormGroup.get('imageURL')?.setValue(s3Object.location);
            this.sendActivity();
          },
          (err: any) => {
            this.isLoading = false;
            this.toastService.errorToast(
              `There is a problem. Please try again later.`
            );
          }
        );
      } else {
        this.sendActivity();
      }
    } else {
      this.isLoading = false;
      this.toastService.warnToast(
        'Please enter the Name and repetitions value.'
      );
    }
  }

  public updateActivity(): void {
    this.isLoading = true;
    if (
      this.activityFormGroup.get('name')?.valid &&
      this.activityFormGroup.get('numberOfRepetitions')?.valid
    ) {
      // string to boolean for isAI prop
      const isAI: string = this.activityFormGroup.get('isAI')?.value;
      this.activityFormGroup
        .get('isAI')
        ?.setValue(isAI === 'true' ? true : false);
      // Start create activity process

      if (typeof this.file !== 'undefined') {
        this.activityService.uploadImage(this.file!.name, this.file).subscribe(
          (s3Object: any) => {
            this.activityFormGroup.get('imageURL')?.setValue(s3Object.location);
            this.sendActivity();
          },
          (err: any) => {
            this.isLoading = false;
            this.toastService.errorToast(
              `There is a problem. Please try again later.`
            );
          }
        );
      } else {
        this.sendActivity();
      }
    } else {
      this.isLoading = false;
      this.toastService.warnToast(
        'Please enter the Name and repetitions value.'
      );
    }
  }
}
