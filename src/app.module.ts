import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PatientRecordManagementModule } from './modules/patient-record-management/patient-record-management.module';
import { AppointmentManagementModule } from './modules/appointment-management/appointment-management.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from "config/validation";
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      validationSchema,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    UserModule,
    PatientRecordManagementModule,
    AppointmentManagementModule
  ],
})
export class AppModule { }
