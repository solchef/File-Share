import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LeaderboardModuleBase } from "./base/leaderboard.module.base";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardResolver } from "./leaderboard.resolver";

@Module({
  imports: [LeaderboardModuleBase, forwardRef(() => AuthModule)],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, LeaderboardResolver],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
