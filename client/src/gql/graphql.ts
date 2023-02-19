/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  /** Fetch a user by id. */
  getUser: User;
  /** Fetch all users. */
  users: Array<User>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  friends: Array<User>;
  id: Scalars['Int'];
  kind: UserKind;
  name: Scalars['String'];
};

export enum UserKind {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  User = 'USER'
}

export type ClientQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name: string, kind: UserKind }> };


export const ClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}}]}}]} as unknown as DocumentNode<ClientQuery, ClientQueryVariables>;