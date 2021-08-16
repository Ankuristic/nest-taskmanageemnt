import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // const user = this.create({ username, password});
    // await this.save(user);

    // hash
    const salt = await bcrypt.genSalt(); // generate the salt
    const hashedPassword = await bcrypt.hash(password, salt); // hashed the password

    console.log('salt', salt);
    console.log('hashedPassword', hashedPassword);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      //   console.log(error.code);
    }
  }
}
