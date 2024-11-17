import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

export class LocalAuthGuard extends AuthGuard('local') { }