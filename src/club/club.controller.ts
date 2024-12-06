import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ClubService } from './club.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClubPayload } from './payload/create-club.payload';
import { UpdateClubPayload } from './payload/update-club.payload';
import { ClubDto, ClubListDto } from './dto/club.dto';
import { ClubMemberDto, ClubMemberListDto } from './dto/club-member.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { UserBaseInfo } from '../auth/type/user-base-info.type';
import { clubJoinStatusQuery } from './query/club-join-status.query';

@Controller('clubs')
@ApiTags('Club API')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '새로운 클럽을 추가합니다' })
  @ApiCreatedResponse({ type: ClubDto })
  async createClub(
    @Body() payload: CreateClubPayload,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<ClubDto> {
    return this.clubService.createClub(payload, user);
  }

  @Get(':clubId')
  @ApiOperation({ summary: '클럽 정보를 조회합니다' })
  @ApiOkResponse({ type: ClubDto })
  async getClubById(
    @Param('clubId', ParseIntPipe) clubId: number,
  ): Promise<ClubDto> {
    return this.clubService.getClubById(clubId);
  }

  @Get()
  @ApiOperation({ summary: '여러 클럽 정보를 조회합니다' })
  @ApiOkResponse({ type: ClubListDto })
  async getClubs(): Promise<ClubListDto> {
    return this.clubService.getClubs();
  }

  @Get(':clubId/members')
  @ApiOperation({ summary: '클럽 멤버 정보를 조회합니다' })
  @ApiOkResponse({ type: ClubMemberListDto })
  async getClubMembers(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Query(new ValidationPipe({ transform: true })) query: clubJoinStatusQuery,
  ): Promise<ClubMemberListDto> {
    const members = await this.clubService.getClubMembersByStatus(
      clubId,
      query.status,
    );
    return ClubMemberListDto.from(ClubMemberDto.fromArray(members));
  }

  @Post(':clubId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '클럽 정보를 수정합니다' })
  @ApiCreatedResponse({ type: ClubDto })
  async updateClub(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Body() payload: UpdateClubPayload,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<ClubDto> {
    return this.clubService.updateClub(clubId, payload, user);
  }
}
