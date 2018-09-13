/* Clipboard
 * Written by Lonly (shunlong@hudongpai.com)
 * @requires jQuery v1.2
 *
 * Copyright 2017 Lonly
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
var _20p = _20p || {};
(function($) {
    var clipboard = {
        copyTextToClipboard: function(text) {
            var copyFrom = $('<textarea/>');
            copyFrom.text(text);
            $('body').append(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.remove();
        }
    }
     _20p.clipboard = clipboard;
})(_20p_$)