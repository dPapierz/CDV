import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LessonService } from '../../services/lesson/lesson.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-lesson-create',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './lesson-create.component.html',
  styleUrl: './lesson-create.component.css'
})
export class LessonCreateComponent {
  teachers: User[] = [];
  students: User[] = [];

  lessonForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    teacher: new FormControl<number>(0, [Validators.min(1)]),
    students: new FormControl<number[]>([]),
  });

  constructor(
    private lessonService: LessonService, 
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });

    this.userService.getAllStudents().subscribe(students => {
      this.students = students;
    });
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      this.lessonService.create(this.lessonForm.value).subscribe({
        error: (response) => {
          const errors = response['error']['errors'];
          for (const key in errors) {
            if (errors.hasOwnProperty(key) && this.lessonForm.get(key)) {
              this.lessonForm.get(key)?.setErrors({ errors: errors[key] });
            }
          }
        },
        complete: () => {
          this.router.navigateByUrl("/lessons");
        }
      });
    }
  }
}
