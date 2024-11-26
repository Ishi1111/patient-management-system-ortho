import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PageQueryDto } from "./dto/list-users.dto";
import { GetUser } from "src/shared/decorator/get-user.decorator";
import { Users } from "src/shared/entity/users.entity";
import { UserService } from "./user.service";
import { RolesGuard } from "src/shared/guard/roles.guard";
import { Role } from "src/shared/enum/role.enum";
import { Roles } from "src/shared/decorator/roles.decorator";
import { CreateDoctorDto } from "./dto/create-doctor.dto";

ApiTags('User Management')
@Controller('user-management')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@ApiCookieAuth()
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Get()
   @ApiOperation({ summary: "Get a list of admins/doctors" })
   @ApiResponse({ status: 200, description: "Api success" })
   @ApiResponse({ status: 422, description: "Bad Request or API error message" })
   @ApiResponse({ status: 500, description: "Internal server error!" })
   async getUsers(@Query() dto: PageQueryDto, @GetUser() user: Users) {
      return this.userService.getUsers(dto, user);
   }

   @Post('/doctor')
   @Roles(Role.ADMIN)
   @ApiOperation({ summary: "Add doctor" })
   @ApiResponse({ status: 200, description: "Api success" })
   @ApiResponse({ status: 422, description: "Bad Request or API error message" })
   @ApiResponse({ status: 404, description: "Not found!" })
   @ApiResponse({ status: 409, description: "Record Already Exist" })
   @ApiResponse({ status: 500, description: "Internal server error!" })
   async createDoctor(
      @Body() dto: CreateDoctorDto, @GetUser() user: Users,
   ) {
      return this.userService.createDoctor(dto, user);
   }
}