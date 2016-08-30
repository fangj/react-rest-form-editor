import { PropTypes } from "react";
var util=require('../util');

var agent = require('superagent-promise')(require('superagent'),Promise);


class RestReader extends React.Component {

    static propTypes  ={
        view: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
        subscribe: React.PropTypes.array
    };


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {data}=this.state;
        if(!data){
            return null;
        }else{
            const {view,...others}=this.props;
            const View=view;
            return <View data={data} {...others}/>
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.fetchData(this.props);

        const me=this;
        var mySubscriber = function( msg, data ){
            console.log( msg, data );
            me.fetchData();
        };
        const subscribe=this.props.subscribe||[];
        this.tokens=subscribe.map(msg=>{
            console.log('subscribe msg',msg);
            return PubSub.subscribe( msg, mySubscriber );
        });
    }

    fetchData(props){
        if(this.cancelablePromise){
            this.cancelablePromise.cancel();
        }
        this.cancelablePromise = util.makeCancelable(
          this._fetchData(props)
        );
        this.cancelablePromise
          .promise
          .then(data=>{this.setState({data});})
          .catch((reason) => {
            //console.log('isCanceled', reason.isCanceled);
            if(!reason.isCanceled){
                // console.log('catch',reason)
                // Promise.reject(reason);
                throw reason;
            }
      });
    }

    _fetchData(props){
        const {url}=props;
        // console.log('restreader _fetchData',url);
        return agent.get(url).then(resp=>resp.body); 
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
        this.cancelablePromise.cancel();
        this.tokens.map(token=>{
            PubSub.unsubscribe( token );
            console.log('unsubscribe',token);
        });
    }
}

module.exports = RestReader;
