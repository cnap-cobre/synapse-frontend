export const createTypes = (typePrefixString, subTypes) =>
    Object.values(subTypes).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: `${typePrefixString}_${curr}`
        }), {}
    );


export const createAction = (type, payload = {}) => ({
  type,
  ...payload
});

export const createReducer = (initialState, handlers) =>
    (state = initialState, action) =>
        handlers.hasOwnProperty(action.type)
            ? handlers[action.type](state, action)
            : state;

export const toCammelCase = x => x.split('_').map(
    y => y.toLowerCase()
).map(
    (z, i) => i ? (z.charAt(0).toUpperCase() + z.slice(1)) : z
).join('');


// ------------------- Specific Type Creator Creators

const asyncTypes = {
  IF_NEEDED: 'IF_NEEDED',  // A softer request, preferring cache over remote data
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export const createAsyncTypes = typePrefixString =>
    createTypes(typePrefixString, asyncTypes);