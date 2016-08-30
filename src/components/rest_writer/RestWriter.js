// require('./RestWriter.less');
import { PropTypes } from "react";
var util=require('../util');

var agent = require('superagent-promise')(require('superagent'),Promise);

class RestWriter extends React.Component {

    static propTypes = {
        view: PropTypes.func.isRequired,
        url: PropTypes.string,
        id: PropTypes.string,
        publish:React.PropTypes.oneOfType([
              React.PropTypes.string,
              React.PropTypes.object
            ])
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let me = this;
        const {view,url,id,...others}=this.props;
        const View=view;
        if(id){//更新或删除
            const {data}=this.state;
            console.log('render',data)
            if(data===undefined){
                return null;//等待异步取得数据
            }else{
                return <View data={data} update={this.update.bind(this)} remove={this.remove.bind(this)} {...others}/> ;
            }
        }else{//新建
            return <View save={this.save.bind(this)} {...others}/> ;
        }
    }

    update(data){
        return this._update(data).then(node=>{
            const {publish}=this.props;
            if(publish){
                if(publish.update){
                    PubSub.publish(publish.update,node);
                }else if(typeof publish=='string'){
                    PubSub.publish(publish,node);
                }
            }
            return node;
        })
    }

    _update(data){
        const {url,id}=this.props;
        return agent.put(url+'/'+id,data).then(resp=>resp.body);
    }

    remove(){
        return this._remove().then(node=>{
            const {publish}=this.props;
            if(publish){
                if(publish.remove){
                    PubSub.publish(publish.remove,node);
                }else if(typeof publish=='string'){
                    PubSub.publish(publish,node);
                }
            }
        });
    }
    _remove(){
        const {url,id}=this.props;
        return agent.del(url+'/'+id).then(resp=>resp.body);
    }

    save(data){
        return this._save(data).then(node=>{
            const {publish}=this.props;
            // debugger;
            if(publish){
                if(publish.save){
                    PubSub.publish(publish.save,node);
                }else if(typeof publish=='string'){
                    PubSub.publish(publish,node);
                }
            }
            return node;
        })
    }
    _save(data){
        const {url}=this.props;
        return agent.post(url,data).then(resp=>resp.body);
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
            //console.log('isCanceled', reason.isCanceled)
            if(!reason.isCanceled){
                Promise.reject(reason);
            }
      });
    }

    _fetchData(props){
        const {url,id}=props;
        if(!id){return Promise.resolve();}
        return agent.get(url+'/'+id).then(resp=>resp.body); 
    }




    componentWillMount() {
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.fetchData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
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
    }
}

module.exports = RestWriter;
