/**
 *
 * @param  {[type]} factory [description]
 * @return {[type]}         [description]
 */
!function (factory) {

    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // [1] CommonJS/Node.js
    // [1] 支持在module.exports.abc,或者直接exports.abc
        var target = module['exports'] || exports; // module.exports is for Node.js
        module.exports = factory(target, require);
    } else if (typeof define === 'function' && define['amd']) {
    // [2] AMD anonymous module
        define(['exports', 'require'], factory);
    } else {
    // [3]Browser globals:
        factory(window['exports'] = {});
    }

}(function (exports, require) {
    React = require('react');

    var DownEditor = React.createClass({
        render:function(){
            return (
                <textarea rows="5" cols="30">
                </textarea>
            )
        }
    });

    var MarkdownEditor = React.createClass({
        render: function () {
            return (
                <div className="Markdown-Editor">
                    MarkdownEditor
                    <DownEditor />
                </div>
            )
        }
    });
    // 多对象返回
    //exports.DownEditor=DownEditor;
    //exports.MarkdownEditor=MarkdownEditor;

    //单一返回组件
    return MarkdownEditor;
});
