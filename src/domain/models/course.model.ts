import { Curso } from 'src/data/database/entity/course.entity';
import { User } from './user.model';
import { CourseDto } from 'src/infraestructure/course/dto/course.dto';

export class Course {
  id?: number;
  name: string;
  shortDescription: string;
  description: string;
  objectives: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  effort: string;
  initialCost: number;
  finalCost: number;
  topic: string;
  nive: string;
  capacity: number;
  payment: string;
  document: string;
  info: string;
  image: string;
  status: number;
  coordinator: User;

  toDatabase() {
    const entity = new Curso();

    entity.id = this.id;
    entity.nombre = this.name;
    entity.descripcionCorta = this.shortDescription;
    entity.descripcion = this.description;
    entity.objetivos = this.objectives;
    entity.duracion = this.duration;
    entity.inicio = this.startDate;
    entity.fin = this.endDate;
    entity.esfuerzo = this.effort;
    entity.costoInicio = this.initialCost;
    entity.costoFin = this.finalCost;
    entity.tema = this.topic;
    entity.nive = this.nive;
    entity.cupo = this.capacity;
    entity.pago = this.payment;
    entity.doc = this.document;
    entity.info = this.info;
    entity.img = this.image;
    entity.estatus = this.status;

    entity.coordinador = this.coordinator.toDatabase();

    return entity;
  }

  toDto() {
    const dto = new CourseDto();

    dto.id = this.id;
    dto.name = this.name;
    dto.shortDescription = this.shortDescription;
    dto.description = this.description;
    dto.objectives = this.objectives;
    dto.duration = this.duration;
    dto.startDate = this.startDate;
    dto.endDate = this.endDate;
    dto.effort = this.effort;
    dto.initialCost = this.initialCost;
    dto.finalCost = this.finalCost;
    dto.topic = this.topic;
    dto.nive = this.nive;
    dto.capacity = this.capacity;
    dto.payment = this.payment;
    dto.document = this.document;
    dto.info = this.info;
    dto.image = this.image;
    dto.status = this.status;
    dto.coordinator = this.coordinator.id!!;

    return dto;
  }
}
