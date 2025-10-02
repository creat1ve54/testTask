export interface ITags {
    text: String
}

export interface IData {
  id: number,
  tags: Array<ITags> | String;
  type: String;
  login: String;
  password: String | null;
  isError: boolean
}
