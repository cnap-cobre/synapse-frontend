// @flow

export type userStateType = {
  +id: number,
  +first_name: ?string,
  +last_name: ?string,
  +full_name: ?string,
  +username: string,
  +email: string,
  +groups: Array<any>,
}

export type userProfileStateType = {
  +id: number,
  +institution: ?string,
  +gravatar: {
    +url: ?string,
    +exists: boolean,
    +profile: ?string,
    +hash: ?string,
  },
  +dropbox: Array<any>,
  +agave: Array<any>,
  +globus: Array<any>,
  +user: userStateType,
  +loading: boolean,
};
