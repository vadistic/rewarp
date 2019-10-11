
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class BooleanSearchInput {
    eq?: boolean;
    in?: boolean[];
    not?: boolean;
}

export class DateTimeSearchInput {
    eq?: DateTime;
    in?: DateTime[];
    not?: DateTime;
    lt?: DateTime;
    lte?: DateTime;
    gt?: DateTime;
    gte?: DateTime;
}

export class FloatSearchInput {
    eq?: number;
    in?: number[];
    not?: number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
}

export class IdSearchInput {
    eq?: string;
    in?: string[];
    not?: string;
}

export class IntSearchInput {
    eq?: number;
    in?: number[];
    not?: number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
}

export class ProjectCreateInput {
    name: string;
    description?: string;
}

export class ProjectUpdateInput {
    name?: string;
    description?: string;
}

export class ProjectWhereInput {
    id?: IdSearchInput;
    createdAt?: DateTimeSearchInput;
    updatedAt?: DateTimeSearchInput;
    name?: StringSearchInput;
    description?: StringSearchInput;
}

export class StringSearchInput {
    eq?: string;
    in?: string[];
    not?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
}

export class UserCreateInput {
    name?: string;
    description?: string;
}

export class UserUpdateInput {
    name?: string;
    description?: string;
}

export class UserWhereInput {
    id?: IdSearchInput;
    createdAt?: DateTimeSearchInput;
    updatedAt?: DateTimeSearchInput;
    name?: StringSearchInput;
    description?: StringSearchInput;
}

export abstract class IMutation {
    abstract createUser(data: UserCreateInput): User | Promise<User>;

    abstract updateUser(id: string, data: UserUpdateInput): User | Promise<User>;

    abstract deleteUser(id: string, data: UserUpdateInput): User | Promise<User>;

    abstract createProject(data: ProjectCreateInput): Project | Promise<Project>;

    abstract updateProject(id: string, data: ProjectUpdateInput): Project | Promise<Project>;

    abstract deleteProject(id: string, data: ProjectUpdateInput): Project | Promise<Project>;
}

export class Project {
    id: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    name: string;
    description?: string;
    projects: Project[];
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;

    abstract users(where: UserWhereInput, skip?: number, take?: number): User[] | Promise<User[]>;

    abstract project(id: string): Project | Promise<Project>;

    abstract projects(where: ProjectWhereInput, skip?: number, take?: number): Project[] | Promise<Project[]>;
}

export class User {
    id: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    name?: string;
    description?: string;
    projects: Project[];
}

export type DateTime = any;
