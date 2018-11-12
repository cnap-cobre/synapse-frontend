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