import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json', // not possible in mysql
    nullable: false,
  })
  metaValue: string; //entire json object of all key-value pairs

  // need second arg for bi-directional relationship
  // have to state where the inverse relationship is, in this case, reference the metaOptions on post
  @OneToOne(() => Post, (post) => post.metaOptions, {
    onDelete: 'CASCADE', // now whenever a post is deleted, it's related metaOption will be deleted too! this just simplifies the code that i would have to write to accomplish the same result
  })
  //join column has added a postId into the metaOptions table
  @JoinColumn()
  post: Post;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
