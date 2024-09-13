import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StakeServiceBase } from "./base/stake.service.base";

@Injectable()
export class StakeService extends StakeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
