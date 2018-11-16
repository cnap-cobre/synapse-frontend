import {createAsyncTypes} from "../../utils";

export const GET_FILE_LIST_ASYNC = createAsyncTypes('GET_FILE_LIST');
export const FIX_AGAVE_SYMLINK_BUG = createAsyncTypes('FIX_AGAVE_SYMLINK_BUG');
export const MAKE_DIRECTORY = 'MAKE_DIRECTORY';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const COPY_FILE = 'COPY_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const MOVE_FILE = 'MOVE_FILE';
export const RENAME_FILE = 'RENAME_FILE';