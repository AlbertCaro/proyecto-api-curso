import { Injectable } from "@nestjs/common";
import { UserContextService } from "src/core/auth/user-context.service";
import { GetUserById } from "../user/get-user-by-id.usecase";

@Injectable()
export class GetAuthenticatedUser {
    constructor(
        private readonly userContextService: UserContextService,
        private readonly getUserById: GetUserById,
    ) {}

    async execute() {
        const id = this.userContextService.getUserId()

        const user = await this.getUserById.execute(id)

        return user
    }
}