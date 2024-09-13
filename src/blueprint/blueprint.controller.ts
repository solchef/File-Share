// import * as common from "@nestjs/common";
// import * as swagger from "@nestjs/swagger";
// import * as nestAccessControl from "nest-access-control";
// import { BlueprintService } from "./blueprint.service";
// import { BlueprintControllerBase } from "./base/blueprint.controller.base";

// @swagger.ApiTags("blueprints")
// @common.Controller("blueprints")
// export class BlueprintController extends BlueprintControllerBase {
//   constructor(
//     protected readonly service: BlueprintService,
//     @nestAccessControl.InjectRolesBuilder()
//     protected readonly rolesBuilder: nestAccessControl.RolesBuilder
//   ) {
//     super(service, rolesBuilder);
//   }
// }


import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BlueprintService } from "./blueprint.service";
import { BlueprintControllerBase } from "./base/blueprint.controller.base";
import { Public } from "../decorators/public.decorator";  // Path to your Public decorator

@swagger.ApiTags("blueprints")
@common.Controller("blueprints")
export class BlueprintController extends BlueprintControllerBase {
  constructor(
    protected readonly service: BlueprintService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  // Override the GET method and make it public
  @Public()  // This makes only this method public
  @common.Get()  // Handles GET requests
  async getAllBlueprints() {
    return this.service.blueprints // Call the service method to get all blueprints
  }
}
