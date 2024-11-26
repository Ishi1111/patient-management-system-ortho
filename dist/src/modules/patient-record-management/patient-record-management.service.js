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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRecordManagementService = void 0;
const common_1 = require("@nestjs/common");
const throw_exception_1 = require("../../shared/utility/throw-exception");
const typeorm_1 = require("@nestjs/typeorm");
const patient_record_management_repository_1 = require("./patient-record-management.repository");
let PatientRecordManagementService = class PatientRecordManagementService {
    constructor(patientRecordsRepository) {
        this.patientRecordsRepository = patientRecordsRepository;
    }
    async createPatient(dto, user) {
        const data = await this.patientRecordsRepository.createPatient(dto, user);
        return {
            message: 'Patient created successfully.',
            data
        };
    }
    async updatePatient(id, dto, user) {
        const data = await this.patientRecordsRepository.updatePatient(id, dto, user);
        return {
            message: 'Patient updated successfully.',
            data
        };
    }
    async getPatientDetails(id) {
        const data = await this.patientRecordsRepository.getPatientDetails(id);
        return {
            message: 'Patient details fetched successfully.',
            data
        };
    }
    async getAllPatients(dto, user) {
        const data = await this.patientRecordsRepository.getAllPatients(dto, user);
        return {
            message: 'Patients fetched successfully.',
            data
        };
    }
    async createConsultation(dto, user) {
        const data = await this.patientRecordsRepository.createConsultation(dto, user);
        return {
            message: 'Consultation record created successfully.',
            data
        };
    }
    async getRecord(appointmentId, user) {
        try {
            const data = await this.patientRecordsRepository.getRecord(appointmentId, user);
            return {
                message: 'Consultation record fetched successfully.',
                data
            };
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
};
exports.PatientRecordManagementService = PatientRecordManagementService;
exports.PatientRecordManagementService = PatientRecordManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_record_management_repository_1.PatientRecordsRepository)),
    __metadata("design:paramtypes", [patient_record_management_repository_1.PatientRecordsRepository])
], PatientRecordManagementService);
//# sourceMappingURL=patient-record-management.service.js.map