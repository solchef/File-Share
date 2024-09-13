import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BlueprintModuleBase } from "./base/blueprint.module.base";
import { BlueprintService } from "./blueprint.service";
import { BlueprintController } from "./blueprint.controller";
import { BlueprintResolver } from "./blueprint.resolver";

@Module({
  imports: [BlueprintModuleBase, forwardRef(() => AuthModule)],
  controllers: [BlueprintController],
  providers: [BlueprintService, BlueprintResolver],
  exports: [BlueprintService],
})
export class BlueprintModule {}
