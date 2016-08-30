'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editor = require('../editor');

var _editor2 = _interopRequireDefault(_editor);

var _browser = require('../browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // require('./RestFormEditor.less');


var RestFormEditor = function (_React$Component) {
    _inherits(RestFormEditor, _React$Component);

    function RestFormEditor(props) {
        _classCallCheck(this, RestFormEditor);

        var _this = _possibleConstructorReturn(this, (RestFormEditor.__proto__ || Object.getPrototypeOf(RestFormEditor)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(RestFormEditor, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _props = this.props;
            var schema = _props.schema;
            var uiSchema = _props.uiSchema;
            var url = _props.url;
            var keyField = _props.keyField;
            var thumbView = _props.thumbView;

            return React.createElement(
                'div',
                { className: 'rest_form_editor' },
                React.createElement(_editor2.default, { schema: schema,
                    uiSchema: uiSchema,
                    url: url,
                    keyField: keyField }),
                React.createElement(_browser2.default, { url: url,
                    thumbView: thumbView,
                    keyField: keyField })
            );
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
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
        value: function componentWillUnmount() {}
    }]);

    return RestFormEditor;
}(React.Component);

RestFormEditor.propTypes = {
    schema: React.PropTypes.object.isRequired,
    uiSchema: React.PropTypes.object,
    url: React.PropTypes.string,
    keyField: React.PropTypes.string,
    thumbView: React.PropTypes.any
};


module.exports = RestFormEditor;