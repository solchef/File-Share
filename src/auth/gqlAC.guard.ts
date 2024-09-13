import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ACGuard } from "nest-access-control";
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class GqlACGuard<User extends any = any> extends ACGuard<User> {
  async getUser(context: ExecutionContext): Promise<User> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req?: { user?: User } }>().req;

    // If no request or user is found, return a system default user
    if (!request || !request.user) {
      return this.getDefaultUser();
    }

    return request.user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req?: { user?: any } }>().req;

    // Check if the request should be public
    const isPublic = this.isPublicRequest(ctx);
    if (isPublic) {
      return true;
    }

    // Check user roles and permissions for other operations
    const result = super.canActivate(context);

    // Handle the case where super.canActivate() returns an Observable
    if (result instanceof Observable) {
      return lastValueFrom(result); // Convert Observable to Promise<boolean>
    }

    return result;
  }

  private isPublicRequest(ctx: GqlExecutionContext): boolean {
    // Define logic to determine if the request is public
    // For example, you might use GraphQL operation name or other context details
    const operationName = ctx.getInfo().operation.name.value;

    // Example logic: make all queries public
    return operationName.startsWith('public');
  }

  private getDefaultUser(): User {
    // Return a default user object or a placeholder user
    return {
      // Define default user properties here
      id: 'default-id',
      roles: ['guest'], // Example role
      // Other properties as needed
    } as User;
  }
}
