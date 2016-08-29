require('./Creater.less');
import RestWriter from '../rest_writer';
import Form from "react-jsonschema-form";

class Creater extends React.Component {

     static propTypes= {
        schema: React.PropTypes.object.isRequired,
        uiSchema: React.PropTypes.object,
        url: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {schema,uiSchema,url}=this.props;
        const form=(props)=><Form schema={schema} uiSchema={uiSchema} onSubmit={({formData})=>props.save(formData)}>
                    <button type="submit" className="btn btn-success">保存</button>
                    </Form>

        return (
            <div className="creater">
                <RestWriter url={url} view={form} />
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

module.exports = Creater;
