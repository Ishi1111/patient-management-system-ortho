"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRecordManagementModule = void 0;
const common_1 = require("@nestjs/common");
const patient_record_management_service_1 = require("./patient-record-management.service");
const patient_record_management_controller_1 = require("./patient-record-management.controller");
const patient_record_management_repository_1 = require("./patient-record-management.repository");
let PatientRecordManagementModule = class PatientRecordManagementModule {
};
exports.PatientRecordManagementModule = PatientRecordManagementModule;
exports.PatientRecordManagementModule = PatientRecordManagementModule = __decorate([
    (0, common_1.Module)({
        controllers: [patient_record_management_controller_1.PatientRecordManagementController],
        providers: [patient_record_management_service_1.PatientRecordManagementService, patient_record_management_repository_1.PatientRecordsRepository],
    })
], PatientRecordManagementModule);
//# sourceMappingURL=patient-record-management.module.js.map