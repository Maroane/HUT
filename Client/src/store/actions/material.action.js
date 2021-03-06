import { fetchMaterials, addMaterialDistant, deleteMaterialDistant } from '../../services/Material.services'

import store from '../store'

export function setMaterials (dispatch) {
  return new Promise((resolve, reject) => {
    store.dispatch({type: 'FETCH_MATERIALS_START'})
    fetchMaterials().then((data) => {
      store.dispatch({
        type: 'FETCH_MATERIALS_SUCCESS',
        payload: data
      })
      resolve(data)
    }).catch((err) => {
      store.dispatch({
        type: 'FETCH_MATERIALS_ERROR',
        payload: err
      })
    })
  })
}

export function addMaterial (name) {
  return new Promise((resolve, reject) => {
    addMaterialDistant(name).then((data) => {
      store.dispatch({
        type: 'NEW_MATERIAL',
        payload: data
      })
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function deleteMaterial (materialId) {
  return new Promise((resolve, reject) => {
    deleteMaterialDistant(materialId).then((data) => {
      store.dispatch({
        type: 'DELETE_MATERIAL',
        payload: materialId
      })
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
  })
}
