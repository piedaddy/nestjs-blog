import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

// this patch is just like the create, except that all the properties should be optional - needs to be imported from swagger if you want to see all the properties in the example
export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'id of post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
