import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /* Special Columns 
  
  entity를 만들었을 경우 자동으로 설정 해주는 Special Columns이다. 

  */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
