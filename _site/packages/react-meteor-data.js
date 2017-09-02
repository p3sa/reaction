//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var process = Package.modules.process;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var ReactMeteorData;

var require = meteorInstall({"node_modules":{"meteor":{"react-meteor-data":{"react-meteor-data.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/react-meteor-data/react-meteor-data.jsx                                               //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
module.export({                                                                                   // 1
  createContainer: function () {                                                                  // 1
    return createContainer;                                                                       // 1
  },                                                                                              // 1
  ReactMeteorData: function () {                                                                  // 1
    return ReactMeteorData;                                                                       // 1
  }                                                                                               // 1
});                                                                                               // 1
var checkNpmVersions = void 0;                                                                    // 1
module.watch(require("meteor/tmeasday:check-npm-versions"), {                                     // 1
  checkNpmVersions: function (v) {                                                                // 1
    checkNpmVersions = v;                                                                         // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
checkNpmVersions({                                                                                // 2
  react: '15.x',                                                                                  // 3
  'react-addons-pure-render-mixin': '15.x'                                                        // 4
}, 'react-meteor-data');                                                                          // 2
                                                                                                  //
var createContainer = require('./createContainer.jsx').default;                                   // 7
                                                                                                  //
var ReactMeteorData = require('./ReactMeteorData.jsx').default;                                   // 8
////////////////////////////////////////////////////////////////////////////////////////////////////

},"ReactMeteorData.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/react-meteor-data/ReactMeteorData.jsx                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _typeof2 = require("babel-runtime/helpers/typeof");                                           //
                                                                                                  //
var _typeof3 = _interopRequireDefault(_typeof2);                                                  //
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
var ReactMeteorData = {                                                                           // 1
  componentWillMount: function () {                                                               // 2
    this.data = {};                                                                               // 3
    this._meteorDataManager = new MeteorDataManager(this);                                        // 4
                                                                                                  //
    var newData = this._meteorDataManager.calculateData();                                        // 5
                                                                                                  //
    this._meteorDataManager.updateData(newData);                                                  // 6
  },                                                                                              // 7
  componentWillUpdate: function (nextProps, nextState) {                                          // 8
    var saveProps = this.props;                                                                   // 9
    var saveState = this.state;                                                                   // 10
    var newData = void 0;                                                                         // 11
                                                                                                  //
    try {                                                                                         // 12
      // Temporarily assign this.state and this.props,                                            // 13
      // so that they are seen by getMeteorData!                                                  // 14
      // This is a simulation of how the proposed Observe API                                     // 15
      // for React will work, which calls observe() after                                         // 16
      // componentWillUpdate and after props and state are                                        // 17
      // updated, but before render() is called.                                                  // 18
      // See https://github.com/facebook/react/issues/3398.                                       // 19
      this.props = nextProps;                                                                     // 20
      this.state = nextState;                                                                     // 21
      newData = this._meteorDataManager.calculateData();                                          // 22
    } finally {                                                                                   // 23
      this.props = saveProps;                                                                     // 24
      this.state = saveState;                                                                     // 25
    }                                                                                             // 26
                                                                                                  //
    this._meteorDataManager.updateData(newData);                                                  // 28
  },                                                                                              // 29
  componentWillUnmount: function () {                                                             // 30
    this._meteorDataManager.dispose();                                                            // 31
  }                                                                                               // 32
}; // A class to keep the state and utility methods needed to manage                              // 1
// the Meteor data for a component.                                                               // 36
                                                                                                  //
var MeteorDataManager = function () {                                                             //
  function MeteorDataManager(component) {                                                         // 38
    (0, _classCallCheck3.default)(this, MeteorDataManager);                                       // 38
    this.component = component;                                                                   // 39
    this.computation = null;                                                                      // 40
    this.oldData = null;                                                                          // 41
  }                                                                                               // 42
                                                                                                  //
  MeteorDataManager.prototype.dispose = function () {                                             //
    function dispose() {                                                                          //
      if (this.computation) {                                                                     // 45
        this.computation.stop();                                                                  // 46
        this.computation = null;                                                                  // 47
      }                                                                                           // 48
    }                                                                                             // 49
                                                                                                  //
    return dispose;                                                                               //
  }();                                                                                            //
                                                                                                  //
  MeteorDataManager.prototype.calculateData = function () {                                       //
    function calculateData() {                                                                    //
      var component = this.component;                                                             // 52
                                                                                                  //
      if (!component.getMeteorData) {                                                             // 54
        return null;                                                                              // 55
      } // When rendering on the server, we don't want to use the Tracker.                        // 56
      // We only do the first rendering on the server so we can get the data right away           // 59
                                                                                                  //
                                                                                                  //
      if (Meteor.isServer) {                                                                      // 60
        return component.getMeteorData();                                                         // 61
      }                                                                                           // 62
                                                                                                  //
      if (this.computation) {                                                                     // 64
        this.computation.stop();                                                                  // 65
        this.computation = null;                                                                  // 66
      }                                                                                           // 67
                                                                                                  //
      var data = void 0; // Use Tracker.nonreactive in case we are inside a Tracker Computation.  // 69
      // This can happen if someone calls `ReactDOM.render` inside a Computation.                 // 71
      // In that case, we want to opt out of the normal behavior of nested                        // 72
      // Computations, where if the outer one is invalidated or stopped,                          // 73
      // it stops the inner one.                                                                  // 74
                                                                                                  //
      this.computation = Tracker.nonreactive(function () {                                        // 75
        return Tracker.autorun(function (c) {                                                     // 76
          if (c.firstRun) {                                                                       // 77
            var savedSetState = component.setState;                                               // 78
                                                                                                  //
            try {                                                                                 // 79
              component.setState = function () {                                                  // 80
                throw new Error("Can't call `setState` inside `getMeteorData` as this could cause an endless" + " loop. To respond to Meteor data changing, consider making this component" + " a \"wrapper component\" that only fetches data and passes it in as props to" + " a child component. Then you can use `componentWillReceiveProps` in that" + " child component.");
              };                                                                                  // 87
                                                                                                  //
              data = component.getMeteorData();                                                   // 89
            } finally {                                                                           // 90
              component.setState = savedSetState;                                                 // 91
            }                                                                                     // 92
          } else {                                                                                // 93
            // Stop this computation instead of using the re-run.                                 // 94
            // We use a brand-new autorun for each call to getMeteorData                          // 95
            // to capture dependencies on any reactive data sources that                          // 96
            // are accessed.  The reason we can't use a single autorun                            // 97
            // for the lifetime of the component is that Tracker only                             // 98
            // re-runs autoruns at flush time, while we need to be able to                        // 99
            // re-call getMeteorData synchronously whenever we want, e.g.                         // 100
            // from componentWillUpdate.                                                          // 101
            c.stop(); // Calling forceUpdate() triggers componentWillUpdate which                 // 102
            // recalculates getMeteorData() and re-renders the component.                         // 104
                                                                                                  //
            component.forceUpdate();                                                              // 105
          }                                                                                       // 106
        });                                                                                       // 107
      });                                                                                         // 108
                                                                                                  //
      if (Package.mongo && Package.mongo.Mongo) {                                                 // 110
        Object.keys(data).forEach(function (key) {                                                // 111
          if (data[key] instanceof Package.mongo.Mongo.Cursor) {                                  // 112
            console.warn("Warning: you are returning a Mongo cursor from getMeteorData. This value " + "will not be reactive. You probably want to call `.fetch()` on the cursor " + "before returning it.");
          }                                                                                       // 117
        });                                                                                       // 118
      }                                                                                           // 119
                                                                                                  //
      return data;                                                                                // 121
    }                                                                                             // 122
                                                                                                  //
    return calculateData;                                                                         //
  }();                                                                                            //
                                                                                                  //
  MeteorDataManager.prototype.updateData = function () {                                          //
    function updateData(newData) {                                                                //
      var component = this.component;                                                             // 125
      var oldData = this.oldData;                                                                 // 126
                                                                                                  //
      if (!(newData && (typeof newData === "undefined" ? "undefined" : (0, _typeof3.default)(newData)) === 'object')) {
        throw new Error("Expected object returned from getMeteorData");                           // 129
      } // update componentData in place based on newData                                         // 130
                                                                                                  //
                                                                                                  //
      for (var key in meteorBabelHelpers.sanitizeForInObject(newData)) {                          // 132
        component.data[key] = newData[key];                                                       // 133
      } // if there is oldData (which is every time this method is called                         // 134
      // except the first), delete keys in newData that aren't in                                 // 136
      // oldData.  don't interfere with other keys, in case we are                                // 137
      // co-existing with something else that writes to a component's                             // 138
      // this.data.                                                                               // 139
                                                                                                  //
                                                                                                  //
      if (oldData) {                                                                              // 140
        for (var _key in meteorBabelHelpers.sanitizeForInObject(oldData)) {                       // 141
          if (!(_key in newData)) {                                                               // 142
            delete component.data[_key];                                                          // 143
          }                                                                                       // 144
        }                                                                                         // 145
      }                                                                                           // 146
                                                                                                  //
      this.oldData = newData;                                                                     // 147
    }                                                                                             // 148
                                                                                                  //
    return updateData;                                                                            //
  }();                                                                                            //
                                                                                                  //
  return MeteorDataManager;                                                                       //
}();                                                                                              //
                                                                                                  //
module.exportDefault(ReactMeteorData);                                                            // 1
////////////////////////////////////////////////////////////////////////////////////////////////////

},"createContainer.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/react-meteor-data/createContainer.jsx                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _extends2 = require("babel-runtime/helpers/extends");                                         //
                                                                                                  //
var _extends3 = _interopRequireDefault(_extends2);                                                //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
module.export({                                                                                   // 1
  "default": function () {                                                                        // 1
    return createContainer;                                                                       // 1
  }                                                                                               // 1
});                                                                                               // 1
var React = void 0;                                                                               // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var PureRenderMixin = void 0;                                                                     // 1
module.watch(require("react-addons-pure-render-mixin"), {                                         // 1
  "default": function (v) {                                                                       // 1
    PureRenderMixin = v;                                                                          // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var ReactMeteorData = void 0;                                                                     // 1
module.watch(require("./ReactMeteorData.jsx"), {                                                  // 1
  "default": function (v) {                                                                       // 1
    ReactMeteorData = v;                                                                          // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
                                                                                                  //
function createContainer() {                                                                      // 10
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};           // 10
  var Component = arguments[1];                                                                   // 10
  var expandedOptions = options;                                                                  // 11
                                                                                                  //
  if (typeof options === 'function') {                                                            // 12
    expandedOptions = {                                                                           // 13
      getMeteorData: options                                                                      // 14
    };                                                                                            // 13
  }                                                                                               // 16
                                                                                                  //
  var _expandedOptions = expandedOptions,                                                         // 10
      getMeteorData = _expandedOptions.getMeteorData,                                             // 10
      _expandedOptions$pure = _expandedOptions.pure,                                              // 10
      pure = _expandedOptions$pure === undefined ? true : _expandedOptions$pure;                  // 10
  var mixins = [ReactMeteorData];                                                                 // 23
                                                                                                  //
  if (pure) {                                                                                     // 24
    mixins.push(PureRenderMixin);                                                                 // 25
  } /* eslint-disable react/prefer-es6-class */                                                   // 26
                                                                                                  //
  return React.createClass({                                                                      // 29
    displayName: 'MeteorDataContainer',                                                           // 30
    mixins: mixins,                                                                               // 31
    getMeteorData: function () {                                                                  // 32
      return getMeteorData(this.props);                                                           // 33
    },                                                                                            // 34
    render: function () {                                                                         // 35
      return React.createElement(Component, (0, _extends3.default)({}, this.props, this.data));   // 36
    }                                                                                             // 37
  });                                                                                             // 29
}                                                                                                 // 39
////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
var exports = require("./node_modules/meteor/react-meteor-data/react-meteor-data.jsx");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['react-meteor-data'] = exports, {
  ReactMeteorData: ReactMeteorData
});

})();
