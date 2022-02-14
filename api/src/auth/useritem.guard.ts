import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ITEM_KEY } from './useritem.decorator';

@Injectable()
export class UseritemGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const userItem = this.reflector.getAllAndOverride<boolean>(USER_ITEM_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!userItem) {
      return true;
    }
    const { body, user } = context.switchToHttp().getRequest();

    return body._id === user._id;
  }
}
