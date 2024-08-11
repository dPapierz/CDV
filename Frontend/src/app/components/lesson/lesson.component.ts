import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Lesson } from '../../models/lesson.model';
import { LessonService } from '../../services/lesson/lesson.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {  
  lesson?: Lesson;
  teacher?: User;

  constructor(private lessonService: LessonService, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lessonService.get(this.route.snapshot.paramMap.get('id')).subscribe({
      next: (lesson) => {
        this.lesson = lesson;

        this.userService.getAllTeachers().subscribe({
          next: (teachers) => {

            this.teacher = teachers.find((teacher: User) => teacher.id === lesson.teacher.id);
          }
        })
      }
    });
  }
}
