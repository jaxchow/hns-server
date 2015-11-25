
import assign from 'object-assign'
import {EventEmitter} from 'events'
import {TopicConstants,AppDispatcher} from './topic.action'

var CHANGE_EVENT = 'change';

var _todos = [{
	id:"11",
	title:"我是标题1",
	content:"正文原来可以这样的"
},{
	id:"12",
	title:"我是标题2",
	content:"正文原来可以这样的"
},{
	id:"13",
	title:"我是标题3",
	content:"正文原来可以这样的"
}]

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos.push({
    id: id,
	title:text,
    text: text
  });
}


var TopicStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },
  removeStore:function(id){
	_todos = _todos.filter(function(item){
		return item.id!==id;
	});
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TopicConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TopicStore.emitChange();
      }
      break;
    case TopicConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TopicStore.emitChange();
      }
      break;
    case TopicConstants.TODO_DESTORY:
        TopicStore.removeStore(action.id);
        TopicStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TopicStore;

