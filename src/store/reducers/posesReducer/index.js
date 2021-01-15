import _ from 'lodash';
import { createAction, createReducer } from 'redux-act';

const initialState = {
  poses: [],
  activePoses: [],
  isFetching: false,
};

const reducer = createReducer({}, initialState);

export const setPoses = createAction('SET_POSES', (payload) => payload);
reducer.on(setPoses, (state, payload) => {
  const poses = _.map(payload.poses, (pos) => ({
    key: _.get(pos, '_id'),
    id: `POS${_.padStart(_.get(pos, 'id'), 3, '0')}`,
    email: _.get(pos, 'user.auth.email'),
    status: _.get(pos, 'status'),
    address: _.get(pos, 'place.address') || '-',
  }));

  const activePoses = _.filter(poses, ['status', 'active']);
  return {
    ...state,
    poses,
    activePoses,
  };
});

export const addPos = createAction('ADD_POS', (payload) => payload);
reducer.on(addPos, (state, payload) => {
  const pos = {
    key: _.get(payload.pos, '_id'),
    id: `POS${_.padStart(_.get(payload.pos, 'id'), 3, '0')}`,
    email: _.get(payload.pos, 'user.auth.email'),
    status: _.get(payload.pos, 'status'),
    address: _.get(payload.pos, 'place.address') || '-',
  };
  const poses = [...state.poses, pos];
  const activePoses = _.filter(poses, ['status', 'active']);
  return {
    ...state,
    poses,
    activePoses,
  };
});

export const updatePos = createAction('UPDATE_POS', (payload) => payload);
reducer.on(updatePos, (state, payload) => {
  const poses = [];
  _.forEach(state.poses, (pos) => {
    if (_.get(pos, 'key') === _.get(payload, '_id') && _.get(payload, 'status') === 'deleted') {
      return;
    }
    if (_.get(pos, 'key') === _.get(payload, '_id')) {
      poses.push({
        ...pos,
        status: _.get(payload, 'status'),
      });
    } else {
      poses.push(pos);
    }
  });

  const activePoses = _.filter(poses, ['status', 'active']);
  return {
    ...state,
    poses,
    activePoses,
  };
});

export const setPosesFetchingStatus = createAction('SET_POSES_FETCHING_STATUS',
  (payload) => payload);
reducer.on(setPosesFetchingStatus, (state, {
  isFetching,
}) => ({
  ...state,
  isFetching,
}));

export default reducer;
