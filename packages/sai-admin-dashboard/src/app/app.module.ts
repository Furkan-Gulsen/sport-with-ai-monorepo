import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaulLayoutComponent } from './containers/defaul-layout/defaul-layout.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { P404Component } from './views/p404/p404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModal } from './modals/add-user-modal/add-user-modal.component';
import { EditUserModal } from './modals/edit-user-modal/edit-user-modal.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, UserService } from './services';
import { ToastService } from './services/toast/toast-service';
import { ToastsContainer } from './services/toast/toasts-container.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthForChildsGuard } from './guards/auth-for-childs.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/loader/interceptor.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBox } from './containers/dialog/dialog-box.component';
import { SocialMediaService } from './services/social-media.service';
import { CreatePostModal } from './modals/create-post-modal/create-post-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PostCommentsModal } from './modals/post-comments-modal/post-comments-modal.component';
import { CreateWorkoutModal } from './modals/create-workout-modal/create-workout-modal.component';
import { WorkoutService } from './services/workout.service';
import { CreateActivityModal } from './modals/create-activity-modal/create-activity-modal.component';
import { ActivityService } from './services/activity.service';
import { AppService } from './services/app.service';
import { LogsService } from './services/logs.service';
import { AdminGuard } from './guards/admin.guard';
import { EditWorkoutModal } from './modals/edit-workout-modal/edit-workout-modal.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    DefaulLayoutComponent,
    P404Component,
    AddUserModal,
    EditUserModal,
    LoginComponent,
    RegisterComponent,
    ToastsContainer,
    DialogBox,
    CreatePostModal,
    PostCommentsModal,
    CreateWorkoutModal,
    CreateActivityModal,
    EditWorkoutModal,
  ],
  entryComponents: [AddUserModal, EditUserModal, DialogBox],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    ToastService,
    UserService,
    AuthService,
    AuthGuard,
    AdminGuard,
    AuthForChildsGuard,
    SocialMediaService,
    AppService,
    WorkoutService,
    ActivityService,
    LogsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
