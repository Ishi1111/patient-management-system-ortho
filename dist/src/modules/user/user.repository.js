"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_entity_1 = require("../../shared/entity/users.entity");
const throw_exception_1 = require("../../shared/utility/throw-exception");
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../shared/enum/role.enum");
const doctors_entity_1 = require("../../shared/entity/doctors.entity");
const common_functions_methods_1 = require("../../shared/utility/common-functions.methods");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(users_entity_1.Users, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getUsers(dto, user) {
        try {
            const { limit, offset, role } = dto;
            const query = this.createQueryBuilder('user')
                .select(['user.id', 'user.firstName', 'user.lastName', 'user.role', 'user.createdAt'])
                .where(`(user.isActive = true)`);
            if (role) {
                query.andWhere(`(user.role = :role)`, { role: role });
            }
            if (user.role !== role_enum_1.Role.ADMIN) {
                query.andWhere(`(user.role != :adminRole)`, { adminRole: role_enum_1.Role.ADMIN });
            }
            const [users, totalResults] = await query.orderBy('user.createdAt', 'DESC')
                .limit(limit)
                .offset(offset)
                .getManyAndCount();
            return {
                users,
                totalResults
            };
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async createDoctor(dto, user) {
        try {
            const { firstName, lastName, email, gender, password, ...doctorData } = dto;
            await (0, common_functions_methods_1.checkEmailExists)(email);
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const doctor = users_entity_1.Users.create({
                firstName,
                lastName,
                email,
                gender,
                role: role_enum_1.Role.DOCTOR,
                password: hashedPassword,
                salt,
            });
            await this.dataSource.getRepository(users_entity_1.Users).save(doctor);
            const doctorDetails = doctors_entity_1.Doctors.create({
                userId: doctor.id,
                ...doctorData,
            });
            await this.dataSource.getRepository(doctors_entity_1.Doctors).save(doctorDetails);
            return this.getDoctorDetails(doctor.id);
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async getDoctorDetails(id) {
        return this.dataSource.getRepository(users_entity_1.Users)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.doctor', 'doctor')
            .select([
            'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'doctor.phoneNumber', 'doctor.speciality', 'doctor.degree', 'doctor.address',
        ])
            .where('(user.id = :id AND user.isActive = true)', { id })
            .getOne();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map