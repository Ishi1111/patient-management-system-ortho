import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
   .setTitle("Patient Management System Backend")
   .addBearerAuth()
   .addCookieAuth("auth")
   .setVersion("1.0")
   .build();
