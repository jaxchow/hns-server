
/*
var React = require('react'),
	TestUtils = require('react-addons-test-utils'),
	assert = require('assert'),
	TopicApp= require('../topic.app');

	describe('topic component', function(){
	  before('render and locate element', function() {
		var renderedComponent = TestUtils.renderIntoDocument(React.createElement(TopicApp));
		console.log(renderedComponent);
	  });
	});
*/

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import assert from 'assert'
import {jsdom} from 'jsdom'
import TopicApp from '../topic.app'

global.document = jsdom("<html><body></body></html>");
global.window = document.defaultView;
global.navigator = {
	userAgent: 'node.js'
};

/*
let renderedComponent;
describe('topic component',()=>{
	before('render and locate element',()=>{
		 renderedComponent = TestUtils.renderIntoDocument(React.createElement(TopicApp));
	})

	it('render component',()=>{
	   assert(TestUtils.findRenderedDOMComponentWithTag(renderedComponent,"div"));
	})
})
*/


