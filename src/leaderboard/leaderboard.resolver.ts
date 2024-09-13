import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { LeaderboardResolverBase } from "./base/leaderboard.resolver.base";
import { Leaderboard } from "./base/Leaderboard";
import { LeaderboardService } from "./leaderboard.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Leaderboard)
export class LeaderboardResolver extends LeaderboardResolverBase {
  constructor(
    protected readonly service: LeaderboardService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
