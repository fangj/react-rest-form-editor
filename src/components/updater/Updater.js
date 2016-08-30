// require('./Updater.less');
import RestWriter from '../rest_writer';
import Form from "react-jsonschema-form";
import PubSub from 'pubsub-js';

class Updater extends React.Component {

    static propTypes= {
        schema: React.PropTypes.object.isRequired,
        uiSchema: React.PropTypes.object,
        url: React.PropTypes.string,
        id: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {schema,uiSchema,url,id}=this.props;
        const form=(props)=><Form schema={schema} uiSchema={uiSchema} formData={props.data}
                onSubmit={({formData})=>props.update(formData).then(_=>PubSub.publish('updated'))}>
                <div className="btn-toolbar">
                    <button type="submit" className="btn btn-success">保存</button>
                    <button className="btn btn-danger" onClick={(e)=>{e.preventDefault();//不知为何submit会被调用，人为阻止
                        props.remove().then(_=>PubSub.publish('updated'))}}>删除</button>
                </div>
        </Form>

        return (
            <div className="updater">
                <RestWriter url={url} view={form} id={id}/>
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

module.exports = Updater;
