import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ClassTransformOptions } from 'class-transformer/ClassTransformOptions';
import { IPagination, Pagination } from '../pagination';

@Injectable()
export class TransformService {
  constructor(@Inject(REQUEST) private request: Request) {}

  plainForPagination<T extends Object, V>(
    clsObject: Function,
    plain: IPagination<V>,
    options?: ClassTransformOptions,
  ) {
    const fields = this.request.query['fields'];
    const groups: string[] = fields ? (fields as string).split(',') : [];

    return plainToClassFromExist(new Pagination<T>(clsObject), plain, {
      ...options,
      groups,
    });
  }

  plainToClass<T extends Object, V extends Array<any>>(
    cls: ClassType<T>,
    plain: V,
    options?: ClassTransformOptions,
  ): T[];
  plainToClass<T extends Object, V>(
    cls: ClassType<T>,
    plain: V,
    options?: ClassTransformOptions,
  ): T;
  plainToClass<T extends Object, V>(
    cls: ClassType<T>,
    plain: V | V[],
    options?: ClassTransformOptions,
  ): T | T[] {
    const fields = this.request.query['fields'];
    const groups: string[] = this.request.query['fields']
      ? (fields as string).split(',')
      : [];
    return plainToClass(cls, plain, { ...options, groups });
  }
}
