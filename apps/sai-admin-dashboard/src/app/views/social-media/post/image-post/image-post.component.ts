import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaService } from '../../../../services/social-media.service';
import { PostCommentsModal } from '../../../../modals/post-comments-modal/post-comments-modal.component';
import { DialogBox } from '../../../../containers/dialog/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'image-post',
  templateUrl: './image-post.component.html',
  styleUrls: ['./image-post.component.scss'],
})
export class ImagePostComponent implements OnInit {
  constructor(
    private socialMediaService: SocialMediaService,
    private modalService: NgbModal,
    private readonly dialog: MatDialog
  ) {}
  @Input() post: any;
  @Input() userId!: string;
  @Output() updatePosts: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  public isLike(): boolean {
    if (this.post.usersWhoLike?.includes(this.userId)) {
      return true;
    } else {
      return false;
    }
  }

  public postLike(): void {
    this.socialMediaService.postLike(this.post.id).subscribe((res: any) => {
      if (this.isLike()) {
        // take back the like
        const index: number = this.post.usersWhoLike.indexOf(this.userId);
        this.post.usersWhoLike.splice(index, 1);
      } else {
        // like the post
        this.post.usersWhoLike.push(this.userId);
      }
    });
  }

  public openComments(): void {
    const modalRef = this.modalService.open(PostCommentsModal, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.postId = this.post.id;
    modalRef.result.then(() => {});
  }

  public deletePost(postId: string) {
    const dialogRef = this.dialog.open(DialogBox);
    dialogRef.componentInstance.content = `Are you sure you want to delete this post?`;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.socialMediaService.deletePostById(postId).subscribe((res: any) => {
          setTimeout(() => {
            this.updatePosts.emit();
          }, 1000);
        });
      }
    });
  }
}
