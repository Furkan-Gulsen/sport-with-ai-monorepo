import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../interfaces/userDTO';
import { UserService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModal } from '../../modals/add-user-modal/add-user-modal.component';
import { EditUserModal } from '../../modals/edit-user-modal/edit-user-modal.component';
import { ToastService } from '../../services/toast/toast-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../../containers/dialog/dialog-box.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private readonly dialog: MatDialog
  ) {}
  public users: UserDTO[] = [];

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getUsers().subscribe((users: any) => {
      if (users) {
        this.users = users;
      }
    });
  }

  public getAccountActive(isAccountActive: any): string {
    if (isAccountActive) {
      return 'bi bi-check-square-fill';
    } else {
      return 'bi bi-hourglass-bottom';
    }
  }

  public getNotifyActive(isNotifyActive: any): string {
    if (isNotifyActive) {
      return 'bi bi-check-square-fill';
    } else {
      return 'bi bi-hourglass-bottom';
    }
  }

  public addUserModal() {
    const modalRef = this.modalService.open(AddUserModal, {
      centered: true,
      size: 'lg',
    });
    modalRef.result.then(() => {
      this.toastService.successToast('The user has been successfully added.');
      this.getAllUsers();
    });
  }

  public deleteUser(user: UserDTO) {
    const dialogRef = this.dialog.open(DialogBox);
    dialogRef.componentInstance.content = `Are you sure you want to delete the user ${
      user.username ? user.username : '---'
    }?`;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('user id: ', user.id);
        this.userService.deleteUserById(user.id!).subscribe((res: any) => {
          this.getAllUsers();
        });
      }
    });
  }

  public editUserModal(user: UserDTO) {
    const modalRef = this.modalService.open(EditUserModal, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.user = user;
    modalRef.result.then(() => {
      this.toastService.successToast('The update was performed successfully.');
      this.getAllUsers();
    });
  }
}
