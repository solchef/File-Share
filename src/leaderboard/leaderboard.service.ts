import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LeaderboardServiceBase } from "./base/leaderboard.service.base";

@Injectable()
export class LeaderboardService extends LeaderboardServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
