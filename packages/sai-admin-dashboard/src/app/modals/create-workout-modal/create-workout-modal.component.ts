import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { ToastService } from '../../services/toast/toast-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-workout-modal',
  templateUrl: './create-workout-modal.component.html',
  styleUrls: ['./create-workout-modal.component.scss'],
})
export class CreateWorkoutModal implements OnInit {
  constructor(
    private toastService: ToastService,
    private workoutService: WorkoutService,
    public activeModal: NgbActiveModal
  ) {}

  public workoutFormGroup!: FormGroup;
  public file!: File | any;
  public isLoading: boolean = false;
  public currentForm!: {
    name?: string;
    kind?: string;
    information?: string;
    imageURL?: string;
  };
  public imageURL!: string;

  ngOnInit(): void {
    this.setWorkoutFormGroup();
  }

  public setWorkoutFormGroup(): void {
    if (typeof this.currentForm === 'undefined') {
      this.workoutFormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        kind: new FormControl('Full Body', Validators.required),
        information: new FormControl('', Validators.required),
        imageURL: new FormControl('', Validators.required),
      });
    } else {
      this.workoutFormGroup = new FormGroup({
        name: new FormControl(this.currentForm.name, Validators.required),
        kind: new FormControl(this.currentForm.kind, Validators.required),
        information: new FormControl(
          this.currentForm.information,
          Validators.required
        ),
        imageURL: new FormControl(
          this.currentForm.imageURL,
          Validators.required
        ),
      });
    }
    this.setImageURL();
  }

  public setImageURL(): void {
    this.imageURL = this.workoutFormGroup.get('imageURL')?.value;
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

  public createWorkout(): void {
    this.isLoading = true;
    if (
      this.workoutFormGroup.get('name')?.valid &&
      this.workoutFormGroup.get('kind')?.valid &&
      this.workoutFormGroup.get('information')?.valid
    ) {
      this.workoutService.uploadImage(this.file.name, this.file).subscribe(
        (s3Object: any) => {
          this.workoutFormGroup.get('imageURL')?.setValue(s3Object.location);
          this.workoutService
            .createWorkout(this.workoutFormGroup.getRawValue())
            .subscribe(
              (res: any) => {
                this.toastService.successToast(
                  'The workout was created successfully.'
                );
                this.isLoading = false;
                this.activeModal.close();
              },
              (err: any) => {
                this.isLoading = false;
                this.toastService.errorToast(
                  `There is a problem. Please try again later.`
                );
              }
            );
        },
        (err: any) => {
          this.isLoading = false;
          this.toastService.errorToast(
            `There is a problem. Please try again later.`
          );
        }
      );
    } else {
      this.isLoading = false;
      this.toastService.warnToast(
        'Please enter the Name and select the Kind value.'
      );
    }
  }
}
