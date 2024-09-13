import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { BlueprintController } from "../blueprint.controller";
import { BlueprintService } from "../blueprint.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  buyPair: "exampleBuyPair",
  createdAt: new Date(),
  description: "exampleDescription",
  exchange: "exampleExchange",
  expiry: "exampleExpiry",
  id: "exampleId",
  maxOrder: "exampleMaxOrder",
  minOrder: "exampleMinOrder",
  name: "exampleName",
  sellPair: "exampleSellPair",
  stake: "exampleStake",
  stakeAmount: 42.42,
  stopLoss: "exampleStopLoss",
  successRate: 42.42,
  takeProfit: "exampleTakeProfit",
  tradeType: "exampleTradeType",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  buyPair: "exampleBuyPair",
  createdAt: new Date(),
  description: "exampleDescription",
  exchange: "exampleExchange",
  expiry: "exampleExpiry",
  id: "exampleId",
  maxOrder: "exampleMaxOrder",
  minOrder: "exampleMinOrder",
  name: "exampleName",
  sellPair: "exampleSellPair",
  stake: "exampleStake",
  stakeAmount: 42.42,
  stopLoss: "exampleStopLoss",
  successRate: 42.42,
  takeProfit: "exampleTakeProfit",
  tradeType: "exampleTradeType",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    buyPair: "exampleBuyPair",
    createdAt: new Date(),
    description: "exampleDescription",
    exchange: "exampleExchange",
    expiry: "exampleExpiry",
    id: "exampleId",
    maxOrder: "exampleMaxOrder",
    minOrder: "exampleMinOrder",
    name: "exampleName",
    sellPair: "exampleSellPair",
    stake: "exampleStake",
    stakeAmount: 42.42,
    stopLoss: "exampleStopLoss",
    successRate: 42.42,
    takeProfit: "exampleTakeProfit",
    tradeType: "exampleTradeType",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  buyPair: "exampleBuyPair",
  createdAt: new Date(),
  description: "exampleDescription",
  exchange: "exampleExchange",
  expiry: "exampleExpiry",
  id: "exampleId",
  maxOrder: "exampleMaxOrder",
  minOrder: "exampleMinOrder",
  name: "exampleName",
  sellPair: "exampleSellPair",
  stake: "exampleStake",
  stakeAmount: 42.42,
  stopLoss: "exampleStopLoss",
  successRate: 42.42,
  takeProfit: "exampleTakeProfit",
  tradeType: "exampleTradeType",
  updatedAt: new Date(),
};

const service = {
  createBlueprint() {
    return CREATE_RESULT;
  },
  blueprints: () => FIND_MANY_RESULT,
  blueprint: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Blueprint", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BlueprintService,
          useValue: service,
        },
      ],
      controllers: [BlueprintController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /blueprints", async () => {
    await request(app.getHttpServer())
      .post("/blueprints")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /blueprints", async () => {
    await request(app.getHttpServer())
      .get("/blueprints")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /blueprints/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/blueprints"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /blueprints/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/blueprints"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /blueprints existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/blueprints")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/blueprints")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
