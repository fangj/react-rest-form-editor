require('./PageDemo.less');
import Form from "react-jsonschema-form";

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const uiSchema = {
    title: {
      "ui:widget": "textarea"
    }
}

const formData = {
  title: "First task",
  done: true
};


class PageDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="page-demo">
                 <Form schema={schema}
                    uiSchema={uiSchema}
                    formData={formData} />
            </div>
        );
    }
}


ReactDOM.render(<PageDemo/>, document.getElementById('App'));

module.exports = PageDemo;
