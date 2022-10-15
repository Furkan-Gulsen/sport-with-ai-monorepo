import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from 'src/app/interfaces/userDTO';
import { UserService } from 'src/app/services';
import { ToastService } from 'src/app/services/toast/toast-service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModal implements OnInit {
  constructor(
    private toastMessage: ToastService,
    private userSvc: UserService,
    public activeModal: NgbActiveModal
  ) {}

  @Input() userId: string = '';
  public user!: UserDTO;
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
  public role: FormControl = new FormControl('User');
  public trainingDays: FormControl = new FormControl(3);
  public isAccountActive: FormControl = new FormControl(false);
  public profilePhoto: FormControl = new FormControl('');
  public password: FormControl = new FormControl('');

  ngOnInit(): void {
    this.fillFormData();
  }

  public fillFormData(): void {
    console.log('user: ', this.user);
    this.email.setValue(this.user.email);
    this.username.setValue(this.user.username);
    this.isNotifyActive.setValue(this.user.isNotifyActive);
    this.theFirstDayOfWeek.setValue(this.user.theFirstDayOfWeek);
    this.role.setValue(this.user.role);
    this.trainingDays.setValue(this.user.trainingDays);
    this.isAccountActive.setValue(this.user.isAccountActive);
    this.profilePhoto.setValue(
      this.user.profilePhoto ? this.user.profilePhoto : ''
    );
  }

  public editUser(): void {
    if (
      (this.username.valid,
      this.email.valid,
      this.isNotifyActive.valid,
      this.theFirstDayOfWeek.valid,
      this.trainingDays.valid,
      this.isAccountActive.valid,
      this.profilePhoto.valid,
      this.role.valid)
    ) {
      let body: any = {
        username: this.username.value,
        email: this.email.value,
        isNotifyActive: this.isNotifyActive.value,
        theFirstDayOfWeek: this.theFirstDayOfWeek.value,
        trainingDays: this.trainingDays.value,
        isAccountActive: this.isAccountActive.value,
        profilePhoto: this.profilePhoto.value,
        role: this.role.value,
      };
      if (this.password.value != '') {
        body.password = this.password.value;
      }
      this.userSvc.updateUserById(this.user.id!, body).subscribe((res: any) => {
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
