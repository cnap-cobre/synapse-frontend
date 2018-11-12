////////////////////
// Action Helpers //
////////////////////
const asyncTypes = {
    IF_NEEDED: 'IF_NEEDED',  // A softer request, preferring cache over remote data.  Basically Canadian.  Oliver Twist-esque.
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