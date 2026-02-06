import { Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

export class RequestService {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  getRequest(): any {
    return this.request; 
  }
}