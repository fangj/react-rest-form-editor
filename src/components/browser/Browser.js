// require('./Browser.less');

import RestReader from '../rest_reader';
import PubSub from 'pubsub-js';

const ThumbView=(props)=><div>{props.data?JSON.stringify(props.data,null,2):"new"}</div>

const browser=(props)=>{
    const ThumbView=props.thumbView;
    const keyField=props.keyField;
    console.log('ThumbView',props.data)
    return (<div className="browser">
                    <div onClick={()=>PubSub.publish('create')} className="new"><ThumbView/></div>
                    {props.data.map((d,i)=><div key={i} onClick={()=>PubSub.publish('update',d[keyField])} className="old"><ThumbView data={d}/></div>)}
            </div>)
}


class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        var {url,thumbView,keyField}=this.props;
        thumbView=thumbView||ThumbView;
        return (
                <RestReader view={browser} url={url} thumbView={thumbView} keyField={keyField}/>
        );
    }

    componentWillMount() {
    }

    componentDidMount() {
        const me=this;
        this.tokenUpdate=PubSub.subscribe( "updated",()=>{
           me.forceUpdate();
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
        PubSub.unsubscribe( this.tokenUpdate );
    }
}

module.exports = Browser;
