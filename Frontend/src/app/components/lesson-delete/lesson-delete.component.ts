import { Component } from '@angular/core';
import { LessonService } from '../../services/lesson/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leesson-delete',
  standalone: true,
  imports: [],
  templateUrl: './lesson-delete.component.html',
  styleUrl: './lesson-delete.component.css'
})
export class LessonDeleteComponent {
  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.lessonService.delete(this.route.snapshot.paramMap.get('id')).subscribe({
      complete: () => {
        this.router.navigateByUrl("/lessons");
      }
    });
  }
}
