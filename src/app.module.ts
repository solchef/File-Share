import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { LoggerModule } from "./logger/logger.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { BlueprintModule } from "./blueprint/blueprint.module";
import { TransactionModule } from "./transaction/transaction.module";
import { AdminModule } from "./admin/admin.module";
import { StakeModule } from "./stake/stake.module";
import { NotificationModule } from "./notification/notification.module";
import { AppUserModule } from "./appUser/appUser.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GqlDefaultAuthGuard } from "./auth/gqlDefaultAuth.guard"; // Ensure correct path for GqlDefaultAuthGuard

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: "schema.graphql",
          sortSchema: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    LoggerModule,
    ACLModule,
    AuthModule,
    UserModule,
    LeaderboardModule,
    BlueprintModule,
    TransactionModule,
    AdminModule,
    StakeModule,
    NotificationModule,
    AppUserModule,
    HealthModule,
    PrismaModule,
    SecretsManagerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlDefaultAuthGuard,  // Apply the guard globally
    },
  ],
})
export class AppModule {}
