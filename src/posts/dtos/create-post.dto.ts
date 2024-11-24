import {
  IsString,
  IsOptional,
  IsArray,
  MinLength,
  IsNotEmpty,
  IsEnum,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  ValidateNested,
  MaxLength,
  IsInt,
} from 'class-validator';
import { POST_TYPE, POST_STATUS } from '../enumTypes';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options-dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    // so this property will show up in swagger
    description: 'description!',
    example: 'Title1',
  })
  @IsString()
  @MaxLength(512)
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: POST_TYPE,
    description: 'possible values are post, page, story, series',
  })
  @IsEnum(POST_TYPE)
  @IsNotEmpty()
  postType: POST_TYPE;

  @ApiProperty({
    description: 'my desc',
    example: 'my-blog-post',
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: `A slug should be all small letters without spaces, and uses only "-" between words. Example: "my-url"`,
  })
  slug: string;

  @ApiProperty({
    enum: POST_STATUS,
    description: 'possible values are draft, scheduled, review, published',
  })
  @IsNotEmpty()
  @IsEnum(POST_STATUS)
  status: POST_STATUS;

  @ApiPropertyOptional({
    description: 'content of post',
    example: 'blahblah blah',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'serialize json or else ',
    example: 'exampleofjsonstring',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'a pic',
    example: 'www.test.com/imageUrl',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'date was published',
    example: 'example',
  })
  @IsOptional()
  @IsISO8601()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'an array of tag ids',
    example: [12, 35],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  //OLD
  // @ApiPropertyOptional({
  //   type: 'array',
  //   required: false,
  //   description: 'an array of meta options passed as string',
  //   items: {
  //     type: 'object',
  //     properties: {
  //       key: {
  //         type: 'string',
  //         description:
  //           'the key can be any string identifier for your meta option',
  //         example: 'sidebarEnabled',
  //       },
  //       value: {
  //         type: 'any',
  //         description: 'the value can be anything',
  //         example: true,
  //       },
  //     },
  //   },
  // })
  // @IsOptional()
  // @IsArray()
  // // must use the following if you want to validate any nested DTOs
  // @ValidateNested({ each: true })
  // @Type(() => CreatePostMetaOptionsDto)
  // metaOptions?: CreatePostMetaOptionsDto[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    description: 'an array of meta options passed as string',
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'JSON',
          description:
            'the key can be any JSON identifier for your meta option',
          example: '{"sidebarEnabled": true, "footerActive": true}',
        },
      },
    },
  })
  @IsOptional()
  // must use the following if you want to validate any nested DTOs
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  //useing active user now
  // @IsInt()
  // @IsNotEmpty()
  // @ApiProperty({
  //   type: 'integar',
  //   required: true,
  //   example: 1,
  // })
  // authorId: number;
}
