import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { StakeService } from "./stake.service";
import { StakeControllerBase } from "./base/stake.controller.base";

@swagger.ApiTags("stakes")
@common.Controller("stakes")
export class StakeController extends StakeControllerBase {
  constructor(
    protected readonly service: StakeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
