
import React from 'react'
import ReactDom from 'react-dom'

const {
	Component
}=React

export default class ReactText extends Component {

	constructor(props, context) {
		super(props, context)
	}

	render(){
		return (
			<div>
			{this.props.children}
			</div>
		)
	}
}
