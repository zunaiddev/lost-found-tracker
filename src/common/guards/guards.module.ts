import {Module} from '@nestjs/common';
import {AuthGuard} from "./auth.guard.js";
import {UsersModule} from "../../users/users.module.js";

@Module({
    imports: [UsersModule],
    providers: [AuthGuard],
    exports: [AuthGuard]
})
export class GuardsModule {}