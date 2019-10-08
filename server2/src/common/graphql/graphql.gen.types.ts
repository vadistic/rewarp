/* eslint-disable */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
}

export interface BooleanSearchInput {
  eq?: Maybe<Scalars['Boolean']>,
  in?: Maybe<Array<Scalars['Boolean']>>,
  not?: Maybe<Scalars['Boolean']>,
}


export interface DateTimeSearchInput {
  eq?: Maybe<Scalars['DateTime']>,
  in?: Maybe<Array<Scalars['DateTime']>>,
  not?: Maybe<Scalars['DateTime']>,
  lt?: Maybe<Scalars['DateTime']>,
  lte?: Maybe<Scalars['DateTime']>,
  gt?: Maybe<Scalars['DateTime']>,
  gte?: Maybe<Scalars['DateTime']>,
}

export interface FloatSearchInput {
  eq?: Maybe<Scalars['Float']>,
  in?: Maybe<Array<Scalars['Float']>>,
  not?: Maybe<Scalars['Float']>,
  lt?: Maybe<Scalars['Float']>,
  lte?: Maybe<Scalars['Float']>,
  gt?: Maybe<Scalars['Float']>,
  gte?: Maybe<Scalars['Float']>,
}

export interface IdSearchInput {
  eq?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Scalars['String']>>,
  not?: Maybe<Scalars['String']>,
}

export interface IntSearchInput {
  eq?: Maybe<Scalars['Int']>,
  in?: Maybe<Array<Scalars['Int']>>,
  not?: Maybe<Scalars['Int']>,
  lt?: Maybe<Scalars['Int']>,
  lte?: Maybe<Scalars['Int']>,
  gt?: Maybe<Scalars['Int']>,
  gte?: Maybe<Scalars['Int']>,
}

export interface Mutation {
  createUser: User,
  updateUser: User,
}


export interface MutationCreateUserArgs {
  data: UserCreateInput
}


export interface MutationUpdateUserArgs {
  id: Scalars['ID'],
  data: UserUpdateInput
}

export interface Query {
  user?: Maybe<User>,
  users: Array<User>,
}


export interface QueryUserArgs {
  id: Scalars['ID']
}


export interface QueryUsersArgs {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
}

export interface StringSearchInput {
  eq?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Scalars['String']>>,
  not?: Maybe<Scalars['String']>,
  contains?: Maybe<Scalars['String']>,
  startsWith?: Maybe<Scalars['String']>,
  endsWith?: Maybe<Scalars['String']>,
}

export interface User {
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
}

export interface UserCreateInput {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
}

export interface UserUpdateInput {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
}

export interface UserWhereInput {
  id?: Maybe<IdSearchInput>,
  createdAt?: Maybe<DateTimeSearchInput>,
  updatedAt?: Maybe<DateTimeSearchInput>,
  name?: Maybe<StringSearchInput>,
  description?: Maybe<StringSearchInput>,
}



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>,
  User: ResolverTypeWrapper<Partial<User>>,
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']>>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  Mutation: ResolverTypeWrapper<{}>,
  UserCreateInput: ResolverTypeWrapper<Partial<UserCreateInput>>,
  UserUpdateInput: ResolverTypeWrapper<Partial<UserUpdateInput>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  IdSearchInput: ResolverTypeWrapper<Partial<IdSearchInput>>,
  BooleanSearchInput: ResolverTypeWrapper<Partial<BooleanSearchInput>>,
  StringSearchInput: ResolverTypeWrapper<Partial<StringSearchInput>>,
  FloatSearchInput: ResolverTypeWrapper<Partial<FloatSearchInput>>,
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>,
  IntSearchInput: ResolverTypeWrapper<Partial<IntSearchInput>>,
  DateTimeSearchInput: ResolverTypeWrapper<Partial<DateTimeSearchInput>>,
  UserWhereInput: ResolverTypeWrapper<Partial<UserWhereInput>>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Partial<Scalars['ID']>,
  User: Partial<User>,
  DateTime: Partial<Scalars['DateTime']>,
  String: Partial<Scalars['String']>,
  Int: Partial<Scalars['Int']>,
  Mutation: {},
  UserCreateInput: Partial<UserCreateInput>,
  UserUpdateInput: Partial<UserUpdateInput>,
  Boolean: Partial<Scalars['Boolean']>,
  IdSearchInput: Partial<IdSearchInput>,
  BooleanSearchInput: Partial<BooleanSearchInput>,
  StringSearchInput: Partial<StringSearchInput>,
  FloatSearchInput: Partial<FloatSearchInput>,
  Float: Partial<Scalars['Float']>,
  IntSearchInput: Partial<IntSearchInput>,
  DateTimeSearchInput: Partial<DateTimeSearchInput>,
  UserWhereInput: Partial<UserWhereInput>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'data'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, QueryUsersArgs>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
