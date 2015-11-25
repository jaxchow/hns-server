import React from 'react'
import ReactDOM	 from 'react-dom'

var MarkdownEditor = require('./react/markdown.react');
ReactDOM.render(<MarkdownEditor/>,document.getElementById("markdownEditor"))

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}

