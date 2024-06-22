import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from '../users/user.entity'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) { }

	async register(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const { username } = authCredentialsDto
		await this.usersService.create(authCredentialsDto)
		const payload = { username }
		const accessToken = this.jwtService.sign(payload)

		return { accessToken }
	}


	async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		const { username } = authCredentialsDto
		return await this.usersService.findByUsername(username)
	}

	async login(user: User): Promise<{ accessToken: string }> {
		const payload: JwtPayload = { sub: user.id }
		const accessToken = this.jwtService.sign(payload)
		return { accessToken }
	}
}
