import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import user, { initialState as userInitialState } from './user/reducer';
import audioPlayer, {
  initialState as audioPlayerInitialState,
} from './audioPlayer/reducer';
import noti, { initialState as notiInitialState } from './noti/reducer';
import request, { initialState as requestInitState } from './request/reducer';
import synthesisRequest, {
  initialState as synthesisRequestInitState,
} from './synthesisRequest/reducer';
import featureFlag, {
  initialState as featureFlagInitialState,
} from './featureFlag/reducer';

export const initialState = {
  auth: authInitialState,
  user: userInitialState,
  audioPlayer: audioPlayerInitialState,
  noti: notiInitialState,
  request: requestInitState,
  synthesisRequest: synthesisRequestInitState,
  featureFlag: featureFlagInitialState,
};

export default combineReducers({
  auth,
  user,
  audioPlayer,
  noti,
  request,
  synthesisRequest,
  featureFlag,
});
