import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('image')
@ApiTags('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/:size/:image')
  resize(@Param('size') size: string, @Param('image') image: string, @Res() res) {
    return this.imageService.resize(size, image, res);
  }
}
