// require('./RestFormEditor.less');
import Editor from '../editor';
import Browser from '../browser';
class RestFormEditor extends React.Component {

    static propTypes= {
        schema: React.PropTypes.object.isRequired,
        uiSchema: React.PropTypes.object,
        url: React.PropTypes.string,
        keyField: React.PropTypes.string,
        thumbView: React.PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {schema,uiSchema,url,keyField,thumbView}=this.props;
        return (
            <div className="rest_form_editor">
                <Editor schema={schema}
                    uiSchema={uiSchema}
                    url={url}
                    keyField={keyField}/>
                <Browser url={url}
                    thumbView={thumbView}
                    keyField={keyField}/>
            </div>
        );
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

module.exports = RestFormEditor;
