import { User } from "./user.model";

export class Lesson {
  id: number;
  title: string;
  content: string;
  teacher: User;
  students: User[];

  constructor(id: number, title: string, content: string, teacher: User, students: User[]) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.teacher = teacher;
    this.students = students;
  }
}