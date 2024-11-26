import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Users } from "src/shared/entity/users.entity";
import { throwException } from "src/shared/utility/throw-exception";
import { DataSource, Repository } from "typeorm";
import { PageQueryDto } from "./dto/list-users.dto";
import { Role } from "src/shared/enum/role.enum";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { Doctors } from "src/shared/entity/doctors.entity";
import { checkEmailExists } from "src/shared/utility/common-functions.methods";

@Injectable()
export class UserRepository extends Repository<Users> {
   constructor(readonly dataSource: DataSource) {
      super(Users, dataSource.createEntityManager());
   }

   /**
    * Retrieves a paginated list of users based on the provided query parameters.
    *
    * @param dto - The `PageQueryDto` object containing the pagination parameters.
    * @param user - The `Users` object representing the current user.
    * @returns An object containing the list of users and the total number of results.
    */
   async getUsers(dto: PageQueryDto, user: Users) {
      try {
         const { limit, offset, role } = dto;

         const query = this.createQueryBuilder('user')
            .select(['user.id', 'user.firstName', 'user.lastName', 'user.role', 'user.createdAt'])
            .where(`(user.isActive = true)`)

         if (role) {
            query.andWhere(`(user.role = :role)`, { role: role })
         }

         // Only Admin can see the list of admins
         if (user.role !== Role.ADMIN) {
            query.andWhere(`(user.role != :adminRole)`, { adminRole: Role.ADMIN })
         }

         const [users, totalResults] = await query.orderBy('user.createdAt', 'DESC')
            .limit(limit)
            .offset(offset)
            .getManyAndCount();

         return {
            users,
            totalResults
         }

      } catch (error) {
         throwException(error);
      }
   }

   /**
    * Creates a new doctor in the database, including both user and doctor-specific information.
    *
    * @param dto - The data transfer object containing the details of the doctor to be created.
    *              Includes user fields (firstName, lastName, email, gender, etc.) and doctor-specific fields.
    * @param user - The current authenticated user, used for validations or associations if required.
    * @returns A Promise that resolves to the newly created doctor's details.
    * @throws ConflictException if a user with the provided email already exists.
    * @throws InternalServerErrorException for any unexpected database or processing errors.
    */
   async createDoctor(dto: CreateDoctorDto, user: Users): Promise<Users> {
      try {
         const { firstName, lastName, email, gender, password, ...doctorData } = dto;

         // Check if email already exists
         await checkEmailExists(email);

         // Generate a salt and hash the password
         const salt = await bcrypt.genSalt();
         const hashedPassword = await bcrypt.hash(password, salt);

         // Create the user
         const doctor = Users.create({
            firstName,
            lastName,
            email,
            gender,
            role: Role.DOCTOR,
            password: hashedPassword,
            salt,
         });
         await this.dataSource.getRepository(Users).save(doctor);

         // Create doctor-specific details
         const doctorDetails = Doctors.create({
            userId: doctor.id,
            ...doctorData,
         });
         await this.dataSource.getRepository(Doctors).save(doctorDetails);

         return this.getDoctorDetails(doctor.id);

      } catch (error) {
         throwException(error);
      }
   }


   async getDoctorDetails(id: string): Promise<Users> {
      return this.dataSource.getRepository(Users)
         .createQueryBuilder('user')
         .leftJoinAndSelect('user.doctor', 'doctor')
         .select([
            'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'doctor.phoneNumber', 'doctor.speciality', 'doctor.degree', 'doctor.address',
         ])
         .where('(user.id = :id AND user.isActive = true)', { id })
         .getOne();
   }

}