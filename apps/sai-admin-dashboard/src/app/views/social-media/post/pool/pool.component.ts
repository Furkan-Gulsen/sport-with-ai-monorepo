import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaService } from '../../../../services/social-media.service';
import { PostPoolDTO } from '../../../../interfaces/';
import { PostCommentsModal } from '../../../../modals/post-comments-modal/post-comments-modal.component';
import { ToastService } from '../../../../services/toast/toast-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../../../../containers/dialog/dialog-box.component';
@Component({
  selector: 'pool-post',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {
  constructor(
    private socialMediaService: SocialMediaService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private readonly dialog: MatDialog
  ) {}
  @Input() post!: any;
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

  public calcPoolOptionStats(order: number): number {
    const total: number = this.post.pool?.statistics.reduce(
      (a: number, b: number) => a + b,
      0
    );
    const optionStats: number = this.post.pool?.statistics[order];
    if (total == 0) {
      return 2;
    }
    return 2 + Number(((optionStats / total) * 100).toFixed(2));
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

  public checkAnswer(): boolean {
    if (this.post.pool.userAnsweredPool.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  public openComments(): void {
    const modalRef = this.modalService.open(PostCommentsModal, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.postId = this.post.id;
    modalRef.result.then(() => {});
  }

  public answer(index: number): void {
    this.socialMediaService.answerPool(this.post.pool.id, index).subscribe(
      (refreshPool: PostPoolDTO) => {
        this.post = {
          ...this.post,
          pool: refreshPool,
        };
      },
      (err: any) => {
        this.toastService.errorToast(err.error.message);
      }
    );
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
