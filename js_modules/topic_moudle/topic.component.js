
import React from 'react'
import {TopicActions} from './topic.action'

const {
	Component
} = React

export default class TopicItem extends Component{

	constructor(props,context){
		super(props,context)
	}

	removeItems(id){
		TopicActions.destory(id);
	}

	render(){
		const {title,content,avator}=this.props
		return(
			<div className="topic-item">
				<h3>{title}<a onClick={this.removeItems.bind(this,this.props.id)}>-</a></h3>
				<p>
					<span>
					{content}
					</span>
				</p>
			</div>
		)
	}
}
