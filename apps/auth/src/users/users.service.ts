import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        })
    }

    async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.findOne({ email: createUserDto.email })
        } catch (err) {
            return;
        }
        throw new UnprocessableEntityException('Email already exists.')
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        const passowrdIsValid = await bcrypt.compare(password, user.password);

        if (!passowrdIsValid)
            throw new UnauthorizedException('Invalid credentials');
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return await this.userRepository.findOne(getUserDto);
    }
}
