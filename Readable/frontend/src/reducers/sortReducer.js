import { DATE_ASCENDING } from '../commonUtils/utils'
const sortOrder = (state = DATE_ASCENDING, action) => {
  switch (action.type) {
    case 'SET_VOTES_ORDER':
      return action.order
    default:
      return state;
  }
}

export default sortOrder