import {
   Injectable,
   CanActivate,
   ExecutionContext,
   ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector) { }

   canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<number[]>("roles", context.getHandler()) || [];

      // If no roles are defined, allow access
      if (roles.length === 0) return true;

      const { user } = context.switchToHttp().getRequest();

      // Check if the user has a valid role
      if (user?.role && roles.includes(user.role)) {
         return true;
      }

      throw new ForbiddenException("You are not allowed to access this resource.");
   }
}
