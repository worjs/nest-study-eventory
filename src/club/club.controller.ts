import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClubDto, ClubListDto } from './dto/club.dto';
import { JwtAuthGuard } from 'src/auth /guard/jwt-auth.guard';
import { CreateClubPayload } from './payload/create-club.payload';
import { CurrentUser } from 'src/auth /decorator /user.decorator';
import { UserBaseInfo } from 'src/auth /type/user-base-info-type';
import { ClubService } from './club.service';

@Controller('club')
@ApiTags('Club API')
export class ClubController {
    constructor(private readonly clubService: ClubService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Club Create' })
    @ApiCreatedResponse({ type: ClubDto })
    async createClub(
        @Body() payload: CreateClubPayload,
        @CurrentUser() user: UserBaseInfo,): Promise<ClubDto> {
        return this.clubService.createClub(payload, user);
    }
}
