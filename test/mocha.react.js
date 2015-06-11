var React = require('react/addons'),
    ReactTools = require('react-tools'),
    assert= require('assert');
var jsdom = require('mocha-jsdom');

// require register jsx file
require.extensions['.jsx'] = function (module, filename) {
    var fs = require("fs");
    var content = fs.readFileSync(filename, 'utf8');
    return module._compile(ReactTools.transform(content, {
        harmony: true
    }), filename);
};

before(function(done){
    // 开启JSDOM 注入浏览器对象 window, document
    jsdom();
    done();

});

describe('markdown component', function () {
    var TestUtils = React.addons.TestUtils;
    var MarkdownEditor = require('../js/react/markdown.react'),
        MarkdownElement,markdownEditorRender;

    before(function(done){
        MarkdownElement=React.createElement(MarkdownEditor);
        markdownEditorRender = TestUtils.renderIntoDocument(MarkdownElement);
        done();
    });

    it('markdown components render', function (done) {
        var div = TestUtils.findRenderedDOMComponentWithTag(markdownEditorRender, 'div');
        assert.equal(div.props.className, 'Markdown-Editor');
        done();
    });

    it('makrdown渲染标签',function(done){
        var div1=TestUtils.findRenderedDOMComponentWithClass(markdownEditorRender,'Markdown-Editor');
        assert.equal(div1.getDOMNode().textContent,'MarkdownEditor');
        done();
    });

});
