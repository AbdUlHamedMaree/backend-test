import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AUTH_COOKIE_KEY, ROLES_KEY } from 'src/constants';
import { User } from 'src/user/user.model';
import { getJwtPayload } from 'src/utils/get-jwt-payload';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;
    try {
      const user: User | undefined = getJwtPayload(
        GqlExecutionContext.create(context).getContext().req.cookies[
          AUTH_COOKIE_KEY
        ].token,
      );
      return (
        user && requiredRoles.some((role) => user.role === role.toString())
      );
    } catch (err) {
      return false;
    }
  }
}
