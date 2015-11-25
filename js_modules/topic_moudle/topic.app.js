
import React from 'react';
import TopicStore from './topic.store'
import TopicItem from "./topic.component"

const {
	Component
}=React


/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTopicState() {
  return {topics:TopicStore.getAll()}
}

 class TopicApp extends Component{
	
	constructor(props, context) {
		super(props, context)
		this.state = getTopicState();
	}

	componentDidMount () {
		TopicStore.addChangeListener(this._onChange.bind(this))
	}

	componentWillUnmount () {
		TopicStore.removeChangeListener(this._onChange.bind(this))
	}

	/**
	* @return {object}
	*/

    renderItem(){
		return this.state.topics.map(function (reply, i) {
			  return <TopicItem {...reply} key={reply.id}/>;
		})	
	}
	render () {

		return (
		  <div className="topic-box">
			{this.renderItem()}
		  </div>
		);
	}

	/**
	* Event handler for 'change' events coming from the TodoStore
	*/
	_onChange() {
		this.setState(getTopicState())
	}
}


if (module.makeHot) {
	TopicApp = module.makeHot(TopicApp, {});
	module.hot.accept()
 }else{

 }
export default TopicApp
