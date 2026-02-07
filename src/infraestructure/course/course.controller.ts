import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { Role } from 'src/domain/models/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role-guard.service';
import { CreateCourse } from 'src/domain/usecases/course/create-course.usecase';
import { CourseDto } from './dto/course.dto';
import { GetAllCourses } from 'src/domain/usecases/course/get-all-courses.usecase';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('/courses')
@Auth(Role.ADMINISTRATOR, Role.COORDINATOR)
export class CourseController {
  constructor(
    private readonly createCourse: CreateCourse,
    private readonly getAllCourses: GetAllCourses,
  ) {}

  @Get()
  async getAll() {
    const courses = await this.getAllCourses.execute();

    return courses.map((course) => course.toDto());
  }

  @Post()
  async create(@Body() course: CourseDto) {
    const createdCourse = await this.createCourse.execute(
      course.toDomain(),
      course.coordinator,
    );

    return createdCourse.toDto();
  }
}
