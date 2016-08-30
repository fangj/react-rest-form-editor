'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // require('./RestWriter.less');


var util = require('../util');

var agent = require('superagent-promise')(require('superagent'), Promise);

var RestWriter = function (_React$Component) {
    _inherits(RestWriter, _React$Component);

    function RestWriter(props) {
        _classCallCheck(this, RestWriter);

        var _this = _possibleConstructorReturn(this, (RestWriter.__proto__ || Object.getPrototypeOf(RestWriter)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(RestWriter, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _props = this.props;
            var view = _props.view;
            var url = _props.url;
            var id = _props.id;

            var others = _objectWithoutProperties(_props, ['view', 'url', 'id']);

            var View = view;
            if (id) {
                //更新或删除
                var data = this.state.data;

                console.log('render', data);
                if (data === undefined) {
                    return null; //等待异步取得数据
                } else {
                    return React.createElement(View, _extends({ data: data, update: this.update.bind(this), remove: this.remove.bind(this) }, others));
                }
            } else {
                //新建
                return React.createElement(View, _extends({ save: this.save.bind(this) }, others));
            }
        }
    }, {
        key: 'update',
        value: function update(data) {
            var _this2 = this;

            return this._update(data).then(function (node) {
                var publish = _this2.props.publish;

                if (publish) {
                    if (publish.update) {
                        PubSub.publish(publish.update, node);
                    } else if (typeof publish == 'string') {
                        PubSub.publish(publish, node);
                    }
                }
                return node;
            });
        }
    }, {
        key: '_update',
        value: function _update(data) {
            var _props2 = this.props;
            var url = _props2.url;
            var id = _props2.id;

            return agent.put(url + '/' + id, data).then(function (resp) {
                return resp.body;
            });
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this3 = this;

            return this._remove().then(function (node) {
                var publish = _this3.props.publish;

                if (publish) {
                    if (publish.remove) {
                        PubSub.publish(publish.remove, node);
                    } else if (typeof publish == 'string') {
                        PubSub.publish(publish, node);
                    }
                }
            });
        }
    }, {
        key: '_remove',
        value: function _remove() {
            var _props3 = this.props;
            var url = _props3.url;
            var id = _props3.id;

            return agent.del(url + '/' + id).then(function (resp) {
                return resp.body;
            });
        }
    }, {
        key: 'save',
        value: function save(data) {
            var _this4 = this;

            return this._save(data).then(function (node) {
                var publish = _this4.props.publish;
                // debugger;

                if (publish) {
                    if (publish.save) {
                        PubSub.publish(publish.save, node);
                    } else if (typeof publish == 'string') {
                        PubSub.publish(publish, node);
                    }
                }
                return node;
            });
        }
    }, {
        key: '_save',
        value: function _save(data) {
            var url = this.props.url;

            return agent.post(url, data).then(function (resp) {
                return resp.body;
            });
        }
    }, {
        key: 'fetchData',
        value: function fetchData(props) {
            var _this5 = this;

            if (this.cancelablePromise) {
                this.cancelablePromise.cancel();
            }
            this.cancelablePromise = util.makeCancelable(this._fetchData(props));
            this.cancelablePromise.promise.then(function (data) {
                _this5.setState({ data: data });
            }).catch(function (reason) {
                //console.log('isCanceled', reason.isCanceled)
                if (!reason.isCanceled) {
                    Promise.reject(reason);
                }
            });
        }
    }, {
        key: '_fetchData',
        value: function _fetchData(props) {
            var url = props.url;
            var id = props.id;

            if (!id) {
                return Promise.resolve();
            }
            return agent.get(url + '/' + id).then(function (resp) {
                return resp.body;
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('componentDidMount');
            this.fetchData(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log('componentWillReceiveProps');
            this.fetchData(nextProps);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }]);

    return RestWriter;
}(React.Component);

RestWriter.propTypes = {
    view: _react.PropTypes.func.isRequired,
    url: _react.PropTypes.string,
    id: _react.PropTypes.string,
    publish: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
};


module.exports = RestWriter;