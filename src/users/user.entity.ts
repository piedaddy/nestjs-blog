import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    // nullable: false,
    nullable: true, // only bc of google authentication! otherwise it needs to be false
  })
  @Exclude()
  password?: string; // only bc of google authentication! otherwise it needs to be mandatory

  @IsOptional()
  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];

  //only bc of google auth
  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  googleId?: string;
}
