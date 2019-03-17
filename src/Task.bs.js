// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Queue = require("bs-platform/lib/js/queue.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function run(onResponse, param) {
  var openend = /* record */[/* contents */true];
  var rejection = function (err) {
    if (openend[0]) {
      openend[0] = false;
      return Curry._1(onResponse, /* Rejection */Block.__(0, [err]));
    } else {
      return 0;
    }
  };
  var success = function (res) {
    if (openend[0]) {
      openend[0] = false;
      return Curry._1(onResponse, /* Success */Block.__(1, [res]));
    } else {
      return 0;
    }
  };
  var cancelFn = Curry._2(param[0], rejection, success);
  return (function (param) {
      if (openend[0]) {
        openend[0] = false;
        if (cancelFn) {
          return Curry._1(cancelFn[0], /* () */0);
        } else {
          return /* () */0;
        }
      } else {
        return 0;
      }
    });
}

function chain(task, fn) {
  return /* Task */[(function (rej, res) {
              var cancelFn = /* record */[/* contents */(function (param) {
                    return /* () */0;
                  })];
              var onResponse = function (status) {
                if (status.tag) {
                  cancelFn[0] = run((function (status) {
                          if (status.tag) {
                            return Curry._1(res, status[0]);
                          } else {
                            return Curry._1(rej, status[0]);
                          }
                        }), Curry._1(fn, status[0]));
                  return /* () */0;
                } else {
                  return Curry._1(rej, status[0]);
                }
              };
              cancelFn[0] = run(onResponse, task);
              return /* Cancel */[(function (param) {
                          return Curry._1(cancelFn[0], /* () */0);
                        })];
            })];
}

function chainRec(recTask, init) {
  return /* Task */[(function (rej, res) {
              var cancelFn = /* record */[/* contents */(function (param) {
                    return /* () */0;
                  })];
              var currentValue = /* record */[/* contents */init];
              var async = /* record */[/* contents */false];
              var settled = /* record */[/* contents */false];
              var drain = function (param) {
                var $$break = false;
                async[0] = false;
                while(!$$break) {
                  settled[0] = false;
                  cancelFn[0] = run(onResponse, Curry._1(recTask, currentValue[0]));
                  if (!settled[0]) {
                    async[0] = true;
                    $$break = true;
                  }
                  
                };
                return /* () */0;
              };
              var onResponse = function (status) {
                if (status.tag) {
                  var value = status[0];
                  if (value.tag) {
                    return Curry._1(res, value[0]);
                  } else {
                    currentValue[0] = value[0];
                    if (async[0]) {
                      return drain(/* () */0);
                    } else {
                      settled[0] = true;
                      return /* () */0;
                    }
                  }
                } else {
                  return Curry._1(rej, status[0]);
                }
              };
              drain(/* () */0);
              return /* Cancel */[(function (param) {
                          return Curry._1(cancelFn[0], /* () */0);
                        })];
            })];
}

function chainRej(task, fn) {
  return /* Task */[(function (rej, res) {
              var cancelFn = /* record */[/* contents */(function (param) {
                    return /* () */0;
                  })];
              var onResponse = function (status) {
                if (status.tag) {
                  return Curry._1(res, status[0]);
                } else {
                  cancelFn[0] = run((function (status) {
                          if (status.tag) {
                            return Curry._1(res, status[0]);
                          } else {
                            return Curry._1(rej, status[0]);
                          }
                        }), Curry._1(fn, status[0]));
                  return /* () */0;
                }
              };
              cancelFn[0] = run(onResponse, task);
              return /* Cancel */[(function (param) {
                          return Curry._1(cancelFn[0], /* () */0);
                        })];
            })];
}

function map(task, fn) {
  return /* Task */[(function (rej, res) {
              var onResponse = function (status) {
                if (status.tag) {
                  return Curry._1(res, Curry._1(fn, status[0]));
                } else {
                  return Curry._1(rej, status[0]);
                }
              };
              var cancel = run(onResponse, task);
              return /* Cancel */[cancel];
            })];
}

function mapRej(task, fn) {
  return /* Task */[(function (rej, res) {
              var onResponse = function (status) {
                if (status.tag) {
                  return Curry._1(res, status[0]);
                } else {
                  return Curry._1(rej, Curry._1(fn, status[0]));
                }
              };
              var cancel = run(onResponse, task);
              return /* Cancel */[cancel];
            })];
}

function bimap(task, rejMap, resMap) {
  return /* Task */[(function (rej, res) {
              var onResponse = function (status) {
                if (status.tag) {
                  return Curry._1(res, Curry._1(resMap, status[0]));
                } else {
                  return Curry._1(rej, Curry._1(rejMap, status[0]));
                }
              };
              var cancel = run(onResponse, task);
              return /* Cancel */[cancel];
            })];
}

function fold(task, rejMap, resMap) {
  return /* Task */[(function (param, res) {
              var onResponse = function (status) {
                if (status.tag) {
                  return Curry._1(res, Curry._1(resMap, status[0]));
                } else {
                  return Curry._1(res, Curry._1(rejMap, status[0]));
                }
              };
              var cancel = run(onResponse, task);
              return /* Cancel */[cancel];
            })];
}

function also(task1, task2) {
  return /* Task */[(function (rej, res) {
              var cancelFn = /* record */[/* contents */(function (param) {
                    return /* () */0;
                  })];
              var onResponse = function (status) {
                if (status.tag) {
                  cancelFn[0] = run((function (status) {
                          if (status.tag) {
                            return Curry._1(res, status[0]);
                          } else {
                            return Curry._1(rej, status[0]);
                          }
                        }), task2);
                  return /* () */0;
                } else {
                  return Curry._1(rej, status[0]);
                }
              };
              cancelFn[0] = run(onResponse, task1);
              return /* Cancel */[(function (param) {
                          return Curry._1(cancelFn[0], /* () */0);
                        })];
            })];
}

function alt(task1, task2) {
  return /* Task */[(function (rej, res) {
              var cancelFn = /* record */[/* contents */(function (param) {
                    return /* () */0;
                  })];
              var onResponse = function (status) {
                if (status.tag) {
                  return Curry._1(res, status[0]);
                } else {
                  cancelFn[0] = run((function (status) {
                          if (status.tag) {
                            return Curry._1(res, status[0]);
                          } else {
                            return Curry._1(rej, status[0]);
                          }
                        }), task2);
                  return /* () */0;
                }
              };
              cancelFn[0] = run(onResponse, task1);
              return /* Cancel */[(function (param) {
                          return Curry._1(cancelFn[0], /* () */0);
                        })];
            })];
}

function $$finally(task1, task2) {
  return /* Task */[(function (rej, res) {
              var cancelFn = /* record */[/* contents */(function (param) {
                    return /* () */0;
                  })];
              var onResponse = function (status1) {
                cancelFn[0] = run((function (status) {
                        if (status.tag) {
                          if (status1.tag) {
                            return Curry._1(res, status1[0]);
                          } else {
                            return Curry._1(rej, status1[0]);
                          }
                        } else {
                          return Curry._1(rej, status[0]);
                        }
                      }), task2);
                return /* () */0;
              };
              cancelFn[0] = run(onResponse, task1);
              return /* Cancel */[(function (param) {
                          return Curry._1(cancelFn[0], /* () */0);
                        })];
            })];
}

function pure(value) {
  return /* Task */[(function (param, res) {
              Curry._1(res, value);
              return /* NoCancel */0;
            })];
}

function reject(value) {
  return /* Task */[(function (rej, param) {
              Curry._1(rej, value);
              return /* NoCancel */0;
            })];
}

var Operators = /* module */[
  /* >==< */chain,
  /* <@> */map,
  /* <!==!> */chainRej,
  /* <!@!> */mapRej
];

function parallel(concurrentTasks) {
  return /* Task */[(function (rej, res) {
              var taskSize = List.length(concurrentTasks);
              var responses = /* record */[/* contents : array */[]];
              var hotTask = /* record */[/* contents : array */[]];
              var rejected = /* record */[/* contents */false];
              var syncQueue = Queue.create(/* () */0);
              var async = /* record */[/* contents */false];
              var onResponse = function (param) {
                if (param.tag) {
                  responses[0] = $$Array.append(responses[0], /* array */[param[0]]);
                  if (responses[0].length === taskSize) {
                    $$Array.sort((function (a, b) {
                            return a[0] - b[0] | 0;
                          }), responses[0]);
                    var response = $$Array.to_list($$Array.map((function (prim) {
                                return prim[1];
                              }), responses[0]));
                    hotTask[0] = /* array */[];
                    return Curry._1(res, response);
                  } else {
                    return 0;
                  }
                } else {
                  $$Array.iter((function (task) {
                          return Curry._1(task[/* cancel */0], /* () */0);
                        }), hotTask[0]);
                  hotTask[0] = /* array */[];
                  rejected[0] = true;
                  return Curry._1(rej, param[0]);
                }
              };
              hotTask[0] = $$Array.mapi((function (index, task) {
                      return /* record */[
                              /* cancel */run((function (value) {
                                      var match = async[0];
                                      if (match) {
                                        return onResponse(value);
                                      } else {
                                        return Queue.add(value, syncQueue);
                                      }
                                    }), map(task, (function (value) {
                                          return /* tuple */[
                                                  index,
                                                  value
                                                ];
                                        }))),
                              /* index */index
                            ];
                    }), $$Array.of_list(concurrentTasks));
              async[0] = true;
              while(!Queue.is_empty(syncQueue) && !rejected[0]) {
                onResponse(Queue.take(syncQueue));
              };
              return /* Cancel */[(function (param) {
                          return $$Array.iter((function (task) {
                                        return Curry._1(task[/* cancel */0], /* () */0);
                                      }), hotTask[0]);
                        })];
            })];
}

function timeout(value) {
  return /* Task */[(function (param, res) {
              var timer = setTimeout((function (param) {
                      return Curry._1(res, value);
                    }), 1000);
              return /* Cancel */[(function (param) {
                          clearTimeout(timer);
                          return /* () */0;
                        })];
            })];
}

function notTimeout(value) {
  return /* Task */[(function (param, res) {
              Curry._1(res, value);
              return /* NoCancel */0;
            })];
}

var p = map(parallel(Pervasives.$at(List.map(timeout, /* :: */[
                  1,
                  /* :: */[
                    2,
                    /* :: */[
                      3,
                      /* :: */[
                        4,
                        /* :: */[
                          5,
                          /* :: */[
                            6,
                            /* :: */[
                              7,
                              /* :: */[
                                8,
                                /* :: */[
                                  9,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]), $$Array.to_list($$Array.map(notTimeout, $$Array.mapi((function (index, param) {
                            return index + 10 | 0;
                          }), Caml_array.caml_make_vect(10000, 1)))))), (function (param) {
        return List.fold_left((function (a, b) {
                      return a + b | 0;
                    }), 0, param);
      }));

function makeTask(i) {
  if (i >= 100000) {
    var value = /* Done */Block.__(1, [i + 1 | 0]);
    return /* Task */[(function (param, res) {
                Curry._1(res, value);
                return /* NoCancel */0;
              })];
  } else if (i < 0) {
    return /* Task */[(function (rej, param) {
                Curry._1(rej, "i must be positive");
                return /* NoCancel */0;
              })];
  } else {
    var value$1 = /* Next */Block.__(0, [i + 1 | 0]);
    return /* Task */[(function (param, res) {
                Curry._1(res, value$1);
                return /* NoCancel */0;
              })];
  }
}

var t = run((function (param) {
        console.log(param[0]);
        return /* () */0;
      }), chain(p, (function (param) {
            return chainRec(makeTask, param);
          })));

var bind = chain;

var resolve = pure;

exports.run = run;
exports.chain = chain;
exports.bind = bind;
exports.chainRec = chainRec;
exports.chainRej = chainRej;
exports.map = map;
exports.mapRej = mapRej;
exports.bimap = bimap;
exports.fold = fold;
exports.also = also;
exports.alt = alt;
exports.$$finally = $$finally;
exports.pure = pure;
exports.resolve = resolve;
exports.reject = reject;
exports.Operators = Operators;
exports.parallel = parallel;
exports.timeout = timeout;
exports.notTimeout = notTimeout;
exports.p = p;
exports.makeTask = makeTask;
exports.t = t;
/* p Not a pure module */
