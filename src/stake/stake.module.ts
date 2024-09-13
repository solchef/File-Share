import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { StakeModuleBase } from "./base/stake.module.base";
import { StakeService } from "./stake.service";
import { StakeController } from "./stake.controller";
import { StakeResolver } from "./stake.resolver";

@Module({
  imports: [StakeModuleBase, forwardRef(() => AuthModule)],
  controllers: [StakeController],
  providers: [StakeService, StakeResolver],
  exports: [StakeService],
})
export class StakeModule {}
