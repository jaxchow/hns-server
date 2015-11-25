
import React from 'react'
import ReactDOM from 'react-dom'

import assert from 'assert'
import {jsdom} from 'jsdom'

import {
	scryRenderedDOMComponentsWithClass as componentsByClass,
	scryRenderedDOMComponentsWithTag as componentsByTag,
	findRenderedDOMComponentWithClass as findComponetByClass,
	renderIntoDocument,
	Simulate
} from 'react-addons-test-utils'

import TopicApp from '../topic.app'

global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
	userAgent: 'node.js'
};

let component;

describe('TopicApp component',()=>{

	before('inital TopicApp component',()=>{
	 component = renderIntoDocument(React.createElement(TopicApp));
	})

	it('render TopicApp component',()=>{
		assert(findComponetByClass(component,'topic-box'));
	})
	it('render TopicApp items length',()=>{
		assert.equal(componentsByClass(component,'topic-item').length,3);
	});

	it('remove item',()=>{
		var delBtns=componentsByTag(component,'a');

		Simulate.click(ReactDOM.findDOMNode(delBtns[1]));

		assert.equal(componentsByClass(component,'topic-item').length,2);
	//	console.log(TestUtils.scryRenderedDOMComponentsWithClass(component,'topic-item').length);
	})
});

