import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services';
import { ToastService } from '../../services/toast/toast-service';

@Component({
  selector: 'add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModal implements OnInit {
  constructor(
    private toastMessage: ToastService,
    private userSvc: UserService,
    public activeModal: NgbActiveModal
  ) {}
  public email: FormControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ])
  );
  public username: FormControl = new FormControl('');
  public isNotifyActive: FormControl = new FormControl(false);
  public theFirstDayOfWeek: FormControl = new FormControl('Monday');
  public trainingDays: FormControl = new FormControl(3);
  public isAccountActive: FormControl = new FormControl(false);
  public profilePhoto: FormControl = new FormControl('');
  public password: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.minLength(8)])
  );

  ngOnInit(): void {}

  public addUser(): void {
    if (
      (this.username.valid,
      this.email.valid,
      this.isNotifyActive.valid,
      this.theFirstDayOfWeek.valid,
      this.trainingDays.valid,
      this.isAccountActive.valid,
      this.profilePhoto.valid,
      this.password.valid)
    ) {
      const body: any = {
        username: this.username.value,
        email: this.email.value,
        isNotifyActive: this.isNotifyActive.value,
        theFirstDayOfWeek: this.theFirstDayOfWeek.value,
        trainingDays: this.trainingDays.value,
        isAccountActive: this.isAccountActive.value,
        profilePhoto: this.profilePhoto.value,
        password: this.password.value,
      };

      this.userSvc.addUserFromAdmin(body).subscribe((res: any) => {
        if (res) {
          this.activeModal.close();
        } else {
          this.toastMessage.errorToast(
            'There is a problem. Please try again later.'
          );
        }
      });
    } else {
      this.toastMessage.errorToast('Enter the input values correctly.');
    }
  }
}
