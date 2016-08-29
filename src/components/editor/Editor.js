require('./Editor.less');
import Creater from '../creater';
import Updater from '../updater';
class Editor extends React.Component {

     static propTypes= {
        schema: React.PropTypes.object.isRequired,
        uiSchema: React.PropTypes.object,
        url: React.PropTypes.string,
        keyField: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            editor:"creater"  //默认是创建
        };
    }

    render() {
        let me = this;
        const {editor}=this.state;
        const {schema,uiSchema,url,keyField}=this.props;
        return (
            <div className="editor">
                {editor=="creater"?
                <Creater schema={schema} uiSchema={uiSchema} url={url} />:
                <Updater schema={schema} uiSchema={uiSchema} url={url} keyField={keyField}/>}
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

module.exports = Editor;
