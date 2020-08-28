import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

const IGONRED_PATHS = ['/auth/login', '/auth/google'];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const route = context.switchToHttp().getRequest().route;

    if (IGONRED_PATHS.includes(route.path)) {
      return true;
    }

    return super.canActivate(context);
  }
}
