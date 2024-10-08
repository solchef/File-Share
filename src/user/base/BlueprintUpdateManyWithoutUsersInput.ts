/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { BlueprintWhereUniqueInput } from "../../blueprint/base/BlueprintWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class BlueprintUpdateManyWithoutUsersInput {
  @Field(() => [BlueprintWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [BlueprintWhereUniqueInput],
  })
  connect?: Array<BlueprintWhereUniqueInput>;

  @Field(() => [BlueprintWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [BlueprintWhereUniqueInput],
  })
  disconnect?: Array<BlueprintWhereUniqueInput>;

  @Field(() => [BlueprintWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [BlueprintWhereUniqueInput],
  })
  set?: Array<BlueprintWhereUniqueInput>;
}

export { BlueprintUpdateManyWithoutUsersInput as BlueprintUpdateManyWithoutUsersInput };
