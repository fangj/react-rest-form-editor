'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rest_form_editor = require('../../components/rest_form_editor');

var _rest_form_editor2 = _interopRequireDefault(_rest_form_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./PageDemo.less');

var schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: { type: "string", title: "Title", default: "A new task" },
        done: { type: "boolean", title: "Done?", default: false }
    }
};

var uiSchema = {
    title: {
        "ui:widget": "textarea"
    }
};

var ThumbView = function ThumbView(props) {
    return React.createElement(
        'div',
        null,
        props.data ? props.data.title : "新建"
    );
};

var PageDemo = function (_React$Component) {
    _inherits(PageDemo, _React$Component);

    function PageDemo() {
        _classCallCheck(this, PageDemo);

        return _possibleConstructorReturn(this, (PageDemo.__proto__ || Object.getPrototypeOf(PageDemo)).apply(this, arguments));
    }

    _createClass(PageDemo, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'page-demo' },
                React.createElement(_rest_form_editor2.default, { schema: schema,
                    uiSchema: uiSchema,
                    url: '/api/post',
                    keyField: '_id',
                    thumbView: ThumbView })
            );
        }
    }]);

    return PageDemo;
}(React.Component);

ReactDOM.render(React.createElement(PageDemo, null), document.getElementById('App'));

module.exports = PageDemo;