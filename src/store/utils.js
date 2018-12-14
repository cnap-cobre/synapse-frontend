// @flow

export const createTypes = (
  typePrefixString: string,
  subTypes: {[string]: string},
) => Object.values(subTypes).reduce( // $FlowFixMe
  (acc, curr: string) => ({
    ...acc,
    [curr]: `${typePrefixString}_${curr}`,
  }), {},
);


export const createAction = (type: string, payload: {} = {}) => ({
  type,
  ...payload,
});

/* eslint-disable indent, implicit-arrow-linebreak */
export const createReducer = (initialState: {}, handlers: {[string]: any }) =>
    (state: {} = initialState, action: { type: string }) =>
        (Object.prototype.hasOwnProperty.call((handlers: {[string]: any}), action.type)
            ? handlers[action.type](state, action)
            : state);
/* eslint-enable indent, implicit-arrow-linebreak */

export const toCammelCase = (x: string) => x.split('_').map(
  y => y.toLowerCase(),
).map(
  (z, i) => (i ? (z.charAt(0).toUpperCase() + z.slice(1)) : z),
).join('');


// ------------------- Specific Type Creator Creators

const asyncTypes = {
  IF_NEEDED: 'IF_NEEDED', // A softer request, preferring cache over remote data
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const createAsyncTypes = (typePrefixString: string) => createTypes(
  typePrefixString, asyncTypes,
);
