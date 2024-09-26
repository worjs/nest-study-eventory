import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';

@Controller('region')
@ApiTags('Region API')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
}
