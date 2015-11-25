
//var AppDispatcher = require('../dispatcher/AppDispatcher');
//var TodoConstants = require('../constants/TodoConstants');

import {Dispatcher} from 'flux'

let AppDispatcher = new Dispatcher();

const TopicConstants={
	TODO_CREATE:'create',
	TODO_UPDATE_TEXT:"updateText",
	TODO_DESTORY:'destory'
}

var TopicActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TopicConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TopicConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  destory:function(id){
	AppDispatcher.dispatch({
		actionType:TopicConstants.TODO_DESTORY,
		id:id
	})
  }
}

module.exports.TopicActions = TopicActions;
module.exports.TopicConstants = TopicConstants;
module.exports.AppDispatcher = AppDispatcher
