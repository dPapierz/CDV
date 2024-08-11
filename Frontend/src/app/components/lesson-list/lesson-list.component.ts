import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LessonService } from '../../services/lesson/lesson.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent {
  lessons?: Lesson[];

  constructor(private lessonService: LessonService, private router: Router) {}

  ngOnInit(): void {
    this.lessonService.getAll().subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (e) => console.error(e)
    });
  }
}
