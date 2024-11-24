import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { POST_TYPE, POST_STATUS } from './enumTypes';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-meta-options-dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: POST_TYPE,
    nullable: false,
    default: POST_TYPE.POST,
  })
  postType: POST_TYPE;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: POST_STATUS,
    nullable: false,
    default: POST_STATUS.DRAFT,
  })
  status: POST_STATUS;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp', // in mysql, would be datetime
    nullable: true,
  })
  publishedOn?: Date;

  @ManyToMany(() => Tag, (tag) => tag.posts, { eager: true })
  @JoinTable()
  // this JoinTable makes Post the *owning* side of the relationship
  // so whenever you delete a post, it'll update the post-tag table
  tags?: Tag[];

  @OneToOne(
    () => MetaOption,
    //adding this second function bc we're making Post and MetaOption a bi-directional relationship
    (metaOptions) => metaOptions.post,

    {
      //this means that everything will cascade between metaOptions and post, basically gives permission to edit this MetaOption table
      //ex: cascade: ['remove', 'insert']
      cascade: true,

      //makes sure that typeorm will also be grabbing this data whenever we do a GET for post/s
      // this is in contrast to adding find({  relations: { metaOptions: true, }, }) in the service function
      eager: true,
    },
  )
  // JoinColumn only used in one side of the relationship
  // will create a MetaOptionId in the Post Table
  // @JoinColumn()
  metaOptions?: MetaOption;
  //every post will only have one metaOption, hence it not being an array

  @ManyToOne(
    () => User,
    (user) => user.posts,
    // ,  { eager: true }
  )
  author: User;
}
