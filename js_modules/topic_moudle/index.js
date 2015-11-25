
import React from 'react'
import ReactDOM from 'react-dom'
import TopicApp from './topic.app'

let {Component}=React;

//ReactDOM.render(<TopicApp />,document.getElementById("topics-container"))

class TextCut extends Component{
	constructor(props, context) {
		super(props, context)
	}
	render (){
		let {length,children}=this.props;
		return (
			<span>
				{children.length>length?children.substring(0,length-1):children}
			</span>
		)
	}
 }
 if (module.makeHot) {
	TextCut = module.makeHot(TextCut, {});
	module.hot.accept()
 }else{

 }
ReactDOM.render(<TextCut length="15">thissss text string!</TextCut>,document.getElementById("topics-container"));
