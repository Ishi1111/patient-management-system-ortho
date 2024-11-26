import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { PageQueryDto } from "./dto/list-users.dto";
import { Users } from "src/shared/entity/users.entity";
import { AppResponse } from "src/shared/interface/app-response.interface";
import { throwException } from "src/shared/utility/throw-exception";
import { CreateDoctorDto } from "./dto/create-doctor.dto";


@Injectable()
export class UserService {

   constructor(
      @InjectRepository(UserRepository)
      private readonly userRepository: UserRepository,
   ) { }


   async getUsers(dto: PageQueryDto, user: Users): Promise<AppResponse> {
      try {
         const data = await this.userRepository.getUsers(dto, user);

         return {
            message: 'Users fetched successfully.',
            data
         }
      } catch (error) {
         throwException(error)
      }
   }

   async createDoctor(dto: CreateDoctorDto, user: Users): Promise<AppResponse> {
      try {
         const data = await this.userRepository.createDoctor(dto, user);

         return {
            message: 'Doctor created successfully.',
            data
         }
      } catch (error) {
         throwException(error)
      }
   }

}