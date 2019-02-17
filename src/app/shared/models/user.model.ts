export interface IUser {
  token: string;
  firstName: string;
  lastName: string;
}

export class User implements IUser {
  constructor(public token: string, public firstName: string, public lastName: string) {}
}
