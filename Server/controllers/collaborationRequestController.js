const mongoose = require('mongoose')
const Util = require('./Util')
const CollaborationRequest = mongoose.model('CollaborationRequest')
const userController = require('./userController')
const collaboratorController = require('./collaboratorController')
const collaborationRequestController = {}

/**
 *
 *
 * @returns
 */
collaborationRequestController.getAllCollaborationRequests = function () {
  return new Promise((resolve, reject) => {
    CollaborationRequest.find().populate('user').exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 *
 * @param {any} material
 * @returns
 */
collaborationRequestController.createCollaborationRequest = function (req) {
  const collaborationRequest = {...req.body}
  return new Promise((resolve, reject) => {
    const requestToAdd = new CollaborationRequest(collaborationRequest)
    requestToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        userController.addCollaborationRequestToUser(item.user, item)
        .then((data) => {
          resolve(item)
        })
      }
    })
  })
}

collaborationRequestController.deleteCollaborationRequest = (requestId) => {
  return new Promise((resolve, reject) => {
    CollaborationRequest.findOne({ '_id': requestId }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        userController.removeCollaborationRequestFromUser(item.user)
        .then((data) => {
          CollaborationRequest.findOneAndRemove({ '_id': requestId }, (err, res) => {
            if (err) {
              reject(err)
            } else {
              resolve(res)
            }
          })
        })
      }
    })
  })
}

collaborationRequestController.acceptCollaborationRequest = (requestId) => {
  return new Promise((resolve, reject) => {
    CollaborationRequest.findOneAndUpdate({ '_id': requestId }, { $set: {validated: true} }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        collaboratorController.createCollaborator(res)
        .then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
    })
  })
}

module.exports = collaborationRequestController
