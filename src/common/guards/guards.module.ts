import {Global, Module} from '@nestjs/common';
import {JwtGuard} from "./jwt.guard.js";
import {UsersModule} from "../../users/users.module.js";

@Global()
@Module({
    imports: [UsersModule],
    providers: [JwtGuard],
    exports: [JwtGuard]
})
export class GuardsModule {}