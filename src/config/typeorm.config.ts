import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { Task } from 'src/tasks/task.entity'
import { User } from 'src/users/user.entity'

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',  
  database: path.resolve(__dirname, '../data/db.sqlite'),  
  entities: [User, Task],  
  synchronize: true, 
};

export default typeOrmConfig;
