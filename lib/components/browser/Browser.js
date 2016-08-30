'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rest_reader = require('../rest_reader');

var _rest_reader2 = _interopRequireDefault(_rest_reader);

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // require('./Browser.less');

var ThumbView = function ThumbView(props) {
    return React.createElement(
        'div',
        null,
        props.data ? JSON.stringify(props.data, null, 2) : "new"
    );
};

var browser = function browser(props) {
    var ThumbView = props.thumbView;
    var keyField = props.keyField;
    console.log('ThumbView', props.data);
    return React.createElement(
        'div',
        { className: 'browser' },
        React.createElement(
            'div',
            { onClick: function onClick() {
                    return _pubsubJs2.default.publish('create');
                }, className: 'new' },
            React.createElement(ThumbView, null)
        ),
        props.data.map(function (d, i) {
            return React.createElement(
                'div',
                { key: i, onClick: function onClick() {
                        return _pubsubJs2.default.publish('update', d[keyField]);
                    }, className: 'old' },
                React.createElement(ThumbView, { data: d })
            );
        })
    );
};

var Browser = function (_React$Component) {
    _inherits(Browser, _React$Component);

    function Browser(props) {
        _classCallCheck(this, Browser);

        var _this = _possibleConstructorReturn(this, (Browser.__proto__ || Object.getPrototypeOf(Browser)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Browser, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _props = this.props;
            var url = _props.url;
            var thumbView = _props.thumbView;
            var keyField = _props.keyField;

            thumbView = thumbView || ThumbView;
            return React.createElement(_rest_reader2.default, { view: browser, url: url, thumbView: thumbView, keyField: keyField });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this;
            this.tokenUpdate = _pubsubJs2.default.subscribe("updated", function () {
                me.forceUpdate();
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
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
        value: function componentWillUnmount() {
            _pubsubJs2.default.unsubscribe(this.tokenUpdate);
        }
    }]);

    return Browser;
}(React.Component);

module.exports = Browser;