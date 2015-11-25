
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import assert from 'assert'
import {jsdom} from 'jsdom'
import TopicItem from '../topic.component'

global.document = jsdom("<html><body></body></html>");
global.window = document.defaultView;
global.navigator = {
	userAgent: 'node.js'
};

let component;
describe('TopicItem component',()=>{
	before('inital TopicItem component',()=>{
	 component = TestUtils.renderIntoDocument(<TopicItem title="我是标题" id="12" content="我是正文" />)
	})

	it('render component',()=>{
		assert(TestUtils.findRenderedDOMComponentWithClass(component,'topic-item'));
	   var contentTag=TestUtils.findRenderedDOMComponentWithTag(component,'p');
	   var headTag=TestUtils.findRenderedDOMComponentWithTag(component,'h3');
	   assert.equal(ReactDOM.findDOMNode(contentTag).textContent,"我是正1文");
	   assert.equal(ReactDOM.findDOMNode(headTag).textContent,"我是标题"+"-");
	})
})

