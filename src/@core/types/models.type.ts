interface IBase {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IEvent extends IBase {
  name: string;
  started_at: Date;
  ended_at: Date;
  description: string;
  images: IImage[];
  solutions?: ISolution[];
  thematics: IThematic[];
}

export interface IRole extends IBase {
  name: string;
  users: IUser[];
}

export interface ISolution extends IBase {
  name: string;
  video_link: string;
  image_link: string;
  description: string;
  targeted_problem: string;
  call: IEvent;
  status: IStatus;
  thematic: IThematic;
  user: IUser;
  challenges: IChallenge[];
  images: IImage[];
}

export interface IImage extends IBase {
  image_link: string;
}

export interface IStatus extends IBase {
  name: string;
}

export interface IThematic extends IBase {
  name: string;
  odds: string;
  solutions: ISolution[];
  calls: IEvent[];
  challenges: IChallenge[];
}

export interface IChallenge extends IBase {
  name: string;
  solutions: ISolution[];
  thematics: IThematic[];
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string;
  google_image: string;
  profile: string;
  solutions: ISolution[];
  roles: IRole[];
}
