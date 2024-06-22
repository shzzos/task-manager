import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      secret: '111', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, UsersService], 
  controllers: [AuthController],
  exports: [JwtAuthGuard], 
})
export class AuthModule {}
