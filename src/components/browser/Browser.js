require('./Browser.less');

import RestReader from '../rest_reader';

const ThumbView=(props)=><div>{JSON.stringify(props.data)}</div>

const browser=(props)=>{
    const ThumbView=props.thumbView;
    console.log('ThumbView',props.data)
    return <div>{props.data.map((d,i)=><ThumbView data={d} key={i}/>)}</div>
}


class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        var {url,thumbView}=this.props;
        thumbView=thumbView||ThumbView;
        return (
            <div className="browser">
                <div>new</div>
                <RestReader view={browser} url={url} thumbView={thumbView}/>
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

module.exports = Browser;
