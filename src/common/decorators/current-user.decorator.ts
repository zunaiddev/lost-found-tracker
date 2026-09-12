import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {AuthenticatedRequest} from "../guards/jwt.guard.js";

export const CurrentUser =
    createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
        return request.user;
    });