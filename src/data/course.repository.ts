import { Injectable } from '@nestjs/common';
import { Curso } from './database/entity/course.entity';
import { Course } from 'src/domain/models/course.model';

@Injectable()
export class CourseRepository {
  async fetchAll() {
    const courses = await Curso.find({ relations: ['coordinador'] });

    return courses.map((course) => course.toDomain());
  }

  async fetchById(id: number) {
    return (await Curso.findOneBy({ id }))?.toDomain();
  }

  async create(course: Course) {
    const entity = course.toDatabase();

    await entity.save();

    return entity.toDomain();
  }

  async delete(couse: Course) {
    await couse.toDatabase().remove();
  }
}
