import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { SocialMediaService } from '../../services/social-media.service';
import { UserDTO, PostPoolDTO, PostDTO } from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
})
export class CreatePostModal implements OnInit {
  constructor(
    private socialMediaService: SocialMediaService,
    private userService: UserService,
    private toastService: ToastService,
    public activeModal: NgbActiveModal
  ) {}
  @Input() postType: string = 'text';
  public selected: number = 0;
  public myProfile!: UserDTO;
  public poolForm!: FormGroup;
  public file!: File | any;

  ngOnInit(): void {
    this.getMyProfile();
    this.checkModalHeight();
    this.setPoolForm();
  }

  checkTab() {
    this.checkModalHeight();
  }

  public getMyProfile(): void {
    this.userService.getMyProfile().subscribe((user: UserDTO) => {
      this.myProfile = user;
    });
  }

  public setPoolForm(): void {
    this.poolForm = new FormGroup({
      content: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
    });
  }

  public checkModalHeight() {
    switch (this.selected) {
      // text
      case 0:
        break;
      // image
      case 1:
        break;
      // pool
      case 2:
    }
  }

  public shareTextPost(content: string): void {
    this.socialMediaService
      .shareTextPost({
        content: content,
        userId: this.myProfile.id,
      })
      .subscribe(
        (res: any) => {
          console.log(res);

          this.toastService.successToast(
            'The post has been successfully shared.'
          );
          this.activeModal.close();
        },
        (err: any) => {
          let errMessage: string = `There is a problem. Please try again later.`;
          if (err.error.message) {
            errMessage = err.error.message;
          }
          this.toastService.errorToast(errMessage);
        }
      );
  }

  public sharePoolPost(): void {
    if (this.poolForm.valid) {
      const postPoolDTO: PostDTO = {
        content: this.poolForm.get('content')?.value,
        userId: this.myProfile.id,
        postType: 'pool',
        pool: {
          options: [
            this.poolForm.get('option1')?.value,
            this.poolForm.get('option2')?.value,
            this.poolForm.get('option3')?.value,
          ],
        },
      };
      this.socialMediaService.sharePoolPost(postPoolDTO).subscribe(
        (res: any) => {
          this.toastService.successToast(
            'The pool post has been successfully shared.'
          );
          this.activeModal.close();
        },
        (err: any) => {
          let errMessage: string = `There is a problem. Please try again later.`;
          if (err.error.message) {
            errMessage = err.error.message;
          }
          this.toastService.errorToast(errMessage);
        }
      );
    } else {
      this.toastService.errorToast(
        'Content length must be at least 10 characters. Make sure you enter each option.'
      );
    }
  }

  handleFileInput(event: any) {
    try {
      const name: string = event.target.files[0].name;
      const splitted: string[] = name.split('.');
      if (
        !['jpeg', 'png', 'jpg', 'gif'].includes(splitted[splitted.length - 1])
      ) {
        this.toastService.errorToast(
          `The file ${name} could not be uploaded. The file is invalid or not supported. Allowed types: .jpg .jpeg .png `
        );
        this.file = undefined;
        const imagePostElement: any = document.getElementById('image-post');
        imagePostElement.value = '';
      } else {
        this.file = event.target.files[0];
      }
    } catch (error) {
      this.toastService.errorToast(
        `There is a problem. Please try again later.`
      );
    }
  }

  public shareImagePost(content: string): void {
    this.socialMediaService.uploadImage(this.file.name, this.file).subscribe(
      (s3Object: any) => {
        this.socialMediaService
          .shareImagePost({
            content: content,
            imageURL: s3Object.location,
          })
          .subscribe(
            (res: any) => {
              this.toastService.successToast(
                'The image post has been successfully shared.'
              );
              this.activeModal.close();
            },
            (err: any) => {
              let errMessage: string = `There is a problem. Please try again later.`;
              if (err.error.message) {
                errMessage = err.error.message;
              }
              this.toastService.errorToast(errMessage);
            }
          );
      },
      (err: any) => {
        this.toastService.errorToast(
          `There is a problem. Please try again later.`
        );
      }
    );
  }
}
