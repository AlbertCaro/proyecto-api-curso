export class TokenDto {
  message: string;

  token: string;

  statusCode: number = 200;

  constructor(message: string, token: string) {
    this.message = message;
    this.token = token;
  }
}
