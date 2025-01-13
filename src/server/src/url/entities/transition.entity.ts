import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from './url.entity';

@Entity('transitions')
export class Transition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'inet' })
  ip: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Url, (url) => url.transitions, { onDelete: 'CASCADE' })
  url: Url;
}
