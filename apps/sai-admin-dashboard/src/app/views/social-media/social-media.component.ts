import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostDTO, UserDTO } from 'src/app/interfaces';
import { CreatePostModal } from 'src/app/modals/create-post-modal/create-post-modal.component';
import { ToastService } from '../../services/toast/toast-service';
import { SocialMediaService } from '../../services/social-media.service';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  constructor(
    private socialMediaService: SocialMediaService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private userService: UserService
  ) {}
  public posts: PostDTO[] = [];
  public myProfile!: UserDTO;

  ngOnInit(): void {
    this.getMyProfile();
    this.getAllPost();
  }

  public getMyProfile(): void {
    this.userService.getMyProfile().subscribe((user: UserDTO) => {
      this.myProfile = user;
    });
  }

  public getAllPost(): void {
    this.socialMediaService.getAllPost().subscribe((posts: any) => {
      if (!posts) {
        this.toastService.errorToast(
          'There was a problem loading the posts. Please try again later.'
        );
      } else {
        this.posts = posts;
      }
    });
  }

  public createPost(postType: string): void {
    const modalRef = this.modalService.open(CreatePostModal, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.postType = postType;
    modalRef.result.then(() => {
      this.getAllPost();
    });
  }
}
