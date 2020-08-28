import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function AppAuth(...roles: string[]) {
  const decorators = [UseGuards(JwtAuthGuard, RolesGuard), ApiBearerAuth()];

  roles.length && decorators.unshift(SetMetadata('roles', roles));
  return applyDecorators(...decorators);
}
