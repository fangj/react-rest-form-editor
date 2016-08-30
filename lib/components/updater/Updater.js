'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rest_writer = require('../rest_writer');

var _rest_writer2 = _interopRequireDefault(_rest_writer);

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // require('./Updater.less');


var Updater = function (_React$Component) {
    _inherits(Updater, _React$Component);

    function Updater(props) {
        _classCallCheck(this, Updater);

        var _this = _possibleConstructorReturn(this, (Updater.__proto__ || Object.getPrototypeOf(Updater)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Updater, [{
        key: 'render',
        value: function render() {
            var me = this;
            var _props = this.props;
            var schema = _props.schema;
            var uiSchema = _props.uiSchema;
            var url = _props.url;
            var id = _props.id;

            var form = function form(props) {
                return React.createElement(
                    _reactJsonschemaForm2.default,
                    { schema: schema, uiSchema: uiSchema, formData: props.data,
                        onSubmit: function onSubmit(_ref) {
                            var formData = _ref.formData;
                            return props.update(formData).then(function (_) {
                                return _pubsubJs2.default.publish('updated');
                            });
                        } },
                    React.createElement(
                        'div',
                        { className: 'btn-toolbar' },
                        React.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-success' },
                            '保存'
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-danger', onClick: function onClick(e) {
                                    e.preventDefault(); //不知为何submit会被调用，人为阻止
                                    props.remove().then(function (_) {
                                        return _pubsubJs2.default.publish('updated');
                                    });
                                } },
                            '删除'
                        )
                    )
                );
            };

            return React.createElement(
                'div',
                { className: 'updater' },
                React.createElement(_rest_writer2.default, { url: url, view: form, id: id })
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

    return Updater;
}(React.Component);

Updater.propTypes = {
    schema: React.PropTypes.object.isRequired,
    uiSchema: React.PropTypes.object,
    url: React.PropTypes.string,
    id: React.PropTypes.string
};


module.exports = Updater;