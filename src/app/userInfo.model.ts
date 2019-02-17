export interface IUserInfo {
  fakeToken: string;
  id: number;
  login: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
}
