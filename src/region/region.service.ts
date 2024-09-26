import { Injectable } from '@nestjs/common';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}
}
