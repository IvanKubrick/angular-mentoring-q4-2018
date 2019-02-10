export interface ICourse {
  id?: number;
  name: string;
  date: Date;
  duration: number;
  description: string;
  topRated?: boolean;
}

export class Course implements ICourse {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public duration: number,
    public description: string,
    public topRated: boolean
  ) {}
}
