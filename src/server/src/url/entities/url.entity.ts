import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transition } from './transition.entity';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  originalUrl: string;

  @Column({ type: 'varchar' })
  shortUrl: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  alias: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @OneToMany(() => Transition, (transition) => transition.url, {
    nullable: true,
    cascade: ['remove'],
  })
  transitions: [];
}
