// require('./Editor.less');
import Creater from '../creater';
import Updater from '../updater';
import PubSub from 'pubsub-js';

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
        const {editor,id}=this.state;
        const {schema,uiSchema,url,keyField}=this.props;
        return (
            <div className="editor">
                {editor=="creater"?
                <Creater schema={schema} uiSchema={uiSchema} url={url} keyField={keyField}/>:
                <Updater schema={schema} uiSchema={uiSchema} url={url} id={id}/>}
            </div>
        );
    }

    componentWillMount() {
    }

    componentDidMount() {
        const me=this;
        this.tokenCreate=PubSub.subscribe( "create",()=>{
           me.setState({editor:"creater",id:null});
        });
        this.tokenUpdate=PubSub.subscribe( "update",(msg,id)=>{
           me.setState({editor:"updater",id:id});
        });
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
        PubSub.unsubscribe( this.tokenCreate );
        PubSub.unsubscribe( this.tokenUpdate );
    }
}

module.exports = Editor;
