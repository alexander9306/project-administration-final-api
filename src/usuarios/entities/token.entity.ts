import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  access_token: string;
}
