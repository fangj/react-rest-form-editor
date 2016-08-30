'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _creater = require('../creater');

var _creater2 = _interopRequireDefault(_creater);

var _updater = require('../updater');

var _updater2 = _interopRequireDefault(_updater);

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // require('./Editor.less');


var Editor = function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        _this.state = {
            editor: "creater" //默认是创建
        };
        return _this;
    }

    _createClass(Editor, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _state = this.state;
            var editor = _state.editor;
            var id = _state.id;
            var _props = this.props;
            var schema = _props.schema;
            var uiSchema = _props.uiSchema;
            var url = _props.url;
            var keyField = _props.keyField;

            return React.createElement(
                'div',
                { className: 'editor' },
                editor == "creater" ? React.createElement(_creater2.default, { schema: schema, uiSchema: uiSchema, url: url, keyField: keyField }) : React.createElement(_updater2.default, { schema: schema, uiSchema: uiSchema, url: url, id: id })
            );
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this;
            this.tokenCreate = _pubsubJs2.default.subscribe("create", function () {
                me.setState({ editor: "creater", id: null });
            });
            this.tokenUpdate = _pubsubJs2.default.subscribe("update", function (msg, id) {
                me.setState({ editor: "updater", id: id });
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
            _pubsubJs2.default.unsubscribe(this.tokenCreate);
            _pubsubJs2.default.unsubscribe(this.tokenUpdate);
        }
    }]);

    return Editor;
}(React.Component);

Editor.propTypes = {
    schema: React.PropTypes.object.isRequired,
    uiSchema: React.PropTypes.object,
    url: React.PropTypes.string,
    keyField: React.PropTypes.string
};


module.exports = Editor;