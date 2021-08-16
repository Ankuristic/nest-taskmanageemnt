import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // the first one being an arrow function, that is the type of this property and it's
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
