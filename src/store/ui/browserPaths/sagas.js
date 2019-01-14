import {
  all, put, take, select,
} from 'redux-saga/effects';
import * as profileTypes from '../../userProfile/types';
import * as agaveFilesystemTypes from '../../agaveFileSystems/types';
import { getJupyterHubUsername } from '../../userProfile/reducer';
import { getBeocatSystems } from '../../agaveFileSystems/reducer';
import { setBrowserPath } from './BrowserPaths';

export default function* setBeocatHomeDirectory() {
  yield all([
    take(profileTypes.GET_USER_PROFILE_ASYNC.SUCCESS),
    take(agaveFilesystemTypes.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS),
  ]);

  const jupyterHubUsername = yield select(getJupyterHubUsername);
  const beocatSystems = yield select(getBeocatSystems);

  if (jupyterHubUsername && beocatSystems.length) {
    const systemKey = [beocatSystems[0].provider, beocatSystems[0].id].join('.');
    const basePath = yield select(store => store.browserPaths[systemKey]);
    yield put(setBrowserPath(systemKey, `${basePath}homes/${jupyterHubUsername}/`));
  }
}
