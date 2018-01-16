import { fetchCollaborators } from '../../services/Collaborators.services'

import store from '../store'

export function setCollaborators (dispatch) {
  return new Promise((resolve, reject) => {
    store.dispatch({type: 'FETCH_COLLABORATORS_START'})
    fetchCollaborators().then((data) => {
      store.dispatch({
        type: 'FETCH_COLLABORATORS_SUCCESS',
        payload: data
      })
      resolve(data)
    }).catch((err) => {
      store.dispatch({
        type: 'FETCH_COLLABORATORS_ERROR',
        payload: err
      })
    })
  })
}
