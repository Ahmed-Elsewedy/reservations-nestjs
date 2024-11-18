import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { TokenPayload } from "../interface/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.cookies?.Authentication || request?.Authentication
                },
            ]),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({ userId }: TokenPayload) {
        const user = await this.userService.getUser({ _id: userId });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}