import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from './social-media.component';
import { RouterModule, Routes } from '@angular/router';
import { TextPostComponent } from './post/text-post/text-post.component';
import { PoolComponent } from './post/pool/pool.component';
import { ImagePostComponent } from './post/image-post/image-post.component';

const routes: Routes = [
  {
    path: '',
    component: SocialMediaComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    SocialMediaComponent,
    TextPostComponent,
    PoolComponent,
    ImagePostComponent,
  ],
})
export class SocialMediaModule {}
