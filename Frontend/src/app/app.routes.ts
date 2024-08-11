import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { LessonEditComponent } from './components/lesson-edit/lesson-edit.component';
import { LessonCreateComponent } from './components/lesson-create/lesson-create.component';
import { LessonDeleteComponent } from './components/lesson-delete/lesson-delete.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  { path: 'lessons', component: LessonListComponent, canActivate: [AuthGuard]},
  { path: 'lesson/create', component: LessonCreateComponent, canActivate: [AuthGuard]},
  { path: 'lesson/edit/:id', component: LessonEditComponent, canActivate: [AuthGuard]},
  { path: 'lesson/delete/:id', component: LessonDeleteComponent, canActivate: [AuthGuard]},
  { path: 'lesson/:id', component: LessonComponent, canActivate: [AuthGuard]},
];
