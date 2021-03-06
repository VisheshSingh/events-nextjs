import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../types';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
