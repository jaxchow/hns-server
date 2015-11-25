/**
 *
 * js mocha browser env setting
 *
 *
 */

import {jsdom} from 'jsdom'

global.document = jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = {
	userAgent: 'node.js'
};

module.exports = global
