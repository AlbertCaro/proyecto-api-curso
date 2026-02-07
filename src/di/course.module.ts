import { Module } from '@nestjs/common';
import { CourseController } from 'src/infraestructure/course/course.controller';
import { UserModule } from './user.module';
import { CreateCourse } from 'src/domain/usecases/course/create-course.usecase';
import { CourseRepository } from 'src/data/course.repository';
import { GetAllCourses } from 'src/domain/usecases/course/get-all-courses.usecase';

@Module({
  imports: [UserModule],
  providers: [CreateCourse, GetAllCourses, CourseRepository],
  controllers: [CourseController],
})
export class CourseModule {}
