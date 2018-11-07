////////////////////
// Action Helpers //
////////////////////
const asyncTypes = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const createAsyncTypes = typeString => {
    return Object.values(asyncTypes).reduce(
        (acc, curr) => {
            acc[curr] = `${typeString}_${curr}`;
            return acc
        },
        {}
    );
};

export const createAction = (type, payload = {}) => ({type, payload});

///////////////////
// createReducer //
///////////////////

export const createReducer =
    (initialState, handlers) =>
        (state = initialState, action) =>
            handlers.hasOwnProperty(action.type)
            ? handlers[action.type](state, action)
            : state

// https://hackernoon.com/replacing-redux-thunks-with-redux-sagas-4aa306854925
// Note: This is "interesting", but we'll roll with it for now.