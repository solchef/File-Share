import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';
import { DefaultAuthGuard } from './defaultAuth.guard';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class GqlDefaultAuthGuard extends DefaultAuthGuard {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: Request }>().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    // Allow public access to GET requests without authentication
    if (request.method === 'POST') {
      return true;
    }

    // Fallback to the default authentication behavior (handle possible Observable)
    const result = super.canActivate(context);

    // Handle the case where super.canActivate() returns an Observable
    if (result instanceof Observable) {
      return lastValueFrom(result); // Convert Observable to Promise<boolean>
    }

    return result;
  }
}
