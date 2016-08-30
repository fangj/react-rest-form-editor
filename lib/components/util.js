"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeCancelable = exports.makeCancelable = function makeCancelable(promise) {
  var hasCanceled_ = false;

  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
    });
    promise.catch(function (error) {
      return hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled_ = true;
    }
  };
};