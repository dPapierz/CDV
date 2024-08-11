import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../services/lesson/lesson.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-lesson-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.css'
})
export class LessonEditComponent {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id');
    this.lessonService.get(lessonId).subscribe(lesson => {
      let x = {
        title: lesson.title,
        content: lesson.content,
        teacher: lesson.teacher?.id,
        students: lesson.students?.map(user => user.id)
      };

      console.log(x);
      

      this.lessonForm.setValue(x);
    });

    this.userService.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });

    this.userService.getAllStudents().subscribe(students => {
      this.students = students;
    });
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      this.lessonService.update(this.route.snapshot.paramMap.get('id'), this.lessonForm.value).subscribe({
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
