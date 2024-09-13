import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BlueprintServiceBase } from "./base/blueprint.service.base";

@Injectable()
export class BlueprintService extends BlueprintServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
