import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardControllerBase } from "./base/leaderboard.controller.base";

@swagger.ApiTags("leaderboards")
@common.Controller("leaderboards")
export class LeaderboardController extends LeaderboardControllerBase {
  constructor(
    protected readonly service: LeaderboardService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
