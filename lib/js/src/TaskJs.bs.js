// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Task = require("./Task.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");

function encaseP(promiseFn, param) {
  return /* Task */{
          _0: (function (rej, res) {
              Curry._1(promiseFn, param).then(function (pResp) {
                      return Promise.resolve(Curry._1(res, pResp));
                    }).catch(function (error) {
                    return Promise.resolve(Curry._1(rej, error));
                  });
              return /* NoCancel */0;
            })
        };
}

function encaseP2(promiseFn, param1, param2) {
  return /* Task */{
          _0: (function (rej, res) {
              Curry._2(promiseFn, param1, param2).then(function (pResp) {
                      return Promise.resolve(Curry._1(res, pResp));
                    }).catch(function (error) {
                    return Promise.resolve(Curry._1(rej, error));
                  });
              return /* NoCancel */0;
            })
        };
}

function encaseP3(promiseFn, param1, param2, param3) {
  return /* Task */{
          _0: (function (rej, res) {
              Curry._3(promiseFn, param1, param2, param3).then(function (pResp) {
                      return Promise.resolve(Curry._1(res, pResp));
                    }).catch(function (error) {
                    return Promise.resolve(Curry._1(rej, error));
                  });
              return /* NoCancel */0;
            })
        };
}

function toPromise(task) {
  return new Promise((function (resolve, param) {
                Task.run(task, (function (value) {
                        return resolve(value);
                      }));
                
              }));
}

function after(wait, value) {
  return /* Task */{
          _0: (function (param, res) {
              var timer = setTimeout((function (param) {
                      return Curry._1(res, value);
                    }), wait);
              return {
                      TAG: /* Cancel */0,
                      _0: (function (param) {
                          clearTimeout(timer);
                          
                        })
                    };
            })
        };
}

function encaseCB(cb, input) {
  return /* Task */{
          _0: (function (rej, res) {
              var cancelFn = Curry._3(cb, input, rej, res);
              if (!(cancelFn == null)) {
                return {
                        TAG: /* Cancel */0,
                        _0: cancelFn
                      };
              } else {
                return /* NoCancel */0;
              }
            })
        };
}

function encaseRevokableCB(cb, input) {
  return /* Task */{
          _0: (function (rej, res) {
              var cancelFn = Curry._3(cb, input, rej, res);
              if (!(cancelFn == null)) {
                return {
                        TAG: /* Undo */1,
                        _0: cancelFn
                      };
              } else {
                return /* NoCancel */0;
              }
            })
        };
}

function rejectAfter(wait, value) {
  return /* Task */{
          _0: (function (rej, param) {
              var timer = setTimeout((function (param) {
                      return Curry._1(rej, value);
                    }), wait);
              return {
                      TAG: /* Cancel */0,
                      _0: (function (param) {
                          clearTimeout(timer);
                          
                        })
                    };
            })
        };
}

exports.encaseP = encaseP;
exports.encaseP2 = encaseP2;
exports.encaseP3 = encaseP3;
exports.toPromise = toPromise;
exports.after = after;
exports.encaseCB = encaseCB;
exports.encaseRevokableCB = encaseRevokableCB;
exports.rejectAfter = rejectAfter;
/* No side effect */
