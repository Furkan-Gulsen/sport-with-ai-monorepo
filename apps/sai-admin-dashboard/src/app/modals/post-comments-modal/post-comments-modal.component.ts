import { Component, Input, OnInit } from '@angular/core';
import { CommentDTO } from '../../interfaces/commentDTO';
import { SocialMediaService } from '../../services/social-media.service';

@Component({
  selector: 'app-post-comments-modal',
  templateUrl: './post-comments-modal.component.html',
  styleUrls: ['./post-comments-modal.component.scss'],
})
export class PostCommentsModal implements OnInit {
  constructor(private socialMediaService: SocialMediaService) {}
  @Input() postId!: string;
  public comments: CommentDTO[] = [];

  ngOnInit(): void {
    this.getPostComments();
  }

  public getPostComments(): void {
    this.socialMediaService
      .getPostComments(this.postId)
      .subscribe((comments: CommentDTO[] | any) => {
        this.comments = comments;
      });
  }

  public reply(content: string): void {
    const comment: CommentDTO = {
      postId: this.postId,
      comment: content,
    };
    const commentTextAreaElement: any =
      document.getElementById('floatingTextarea');
    this.socialMediaService
      .shareComment(comment)
      .subscribe((comment: CommentDTO) => {
        commentTextAreaElement.value = '';
        this.getPostComments();
      });
  }
}
