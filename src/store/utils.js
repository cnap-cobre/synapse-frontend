export const createTypes = (typePrefixString, subTypes) => Object.values(subTypes).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: `${typePrefixString}_${curr}`,
  }), {},
);


export const createAction = (type, payload = {}) => ({
  type,
  ...payload,
});

/* eslint-disable indent, implicit-arrow-linebreak */
export const createReducer = (initialState, handlers) =>
    (state = initialState, action) =>
        (Object.prototype.hasOwnProperty.call(handlers, action.type)
            ? handlers[action.type](state, action)
            : state);
/* eslint-enable indent, implicit-arrow-linebreak */

export const toCammelCase = x => x.split('_').map(
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

export const createAsyncTypes = typePrefixString => createTypes(typePrefixString, asyncTypes);
