// @flow


export type NavigationType = {
  name: string,
  icon?: string,
  mini?: string,
  exact: boolean,
  beta?: true,
  url: string,
  children?: Array<NavigationType>,
}
