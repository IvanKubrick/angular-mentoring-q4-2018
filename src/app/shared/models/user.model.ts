export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

export class User1 implements IUser {
  constructor(public id: number, public firstName: string, public lastName: string) {}
}
