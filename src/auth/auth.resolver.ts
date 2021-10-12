import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { GqlAuthGuard } from './auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { AUTH_COOKIE_KEY } from 'src/constants';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return this.userService.findById(user._id);
  }

  @Mutation(() => User)
  async login(
    @Args('phone') phone: string,
    @Context() context: GraphQLExecutionContext,
  ) {
    const user = await this.userService.findByPhone(phone);
    if (!user) return new BadRequestException('User Not Found!');
    const token = await this.authService.getJwtToken(user);

    (context as any).res.cookie(
      AUTH_COOKIE_KEY,
      { token },
      { httpOnly: true, sameSite: 'none', secure: true },
    );
    return user;
  }
}
