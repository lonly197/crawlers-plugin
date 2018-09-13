/* 
 * JavaScript Templates
 * Written by Lonly (shunlong@hudongpai.com)
 * @requires jQuery v1.7
 *
 * Copyright 2017 Lonly
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/* global define */
var _20p = _20p || {};
(function($) {

    var tmpl = {
        cache: {},
        regexp: /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,
        encReg: /[<>&"'\x00]/g, // eslint-disable-line no-control-regex
        encMap: {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#39;'
        },
        arg: 'o',
        helper: ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
            ',include=function(s,d){_s+=create(s,d);}',
        encode: function(s) {
            return (s === null ? '' : '' + s).replace(
                this.encReg,
                function(c) {
                    return this.encMap[c] || '';
                }
            );
        },
        create: function(str, data) {
            var f = !/[^\w\-\.:]/.test(str) ?
                this.cache[str] = this.cache[str] || this.create(this.load(str)) :
                // eslint-disable-line no-new-func
                new Function(
                    this.arg + ',create,encode',
                    'var _e=encode' + this.helper + ",_s='" +
                    str.replace(this.regexp, this.func) + "';return _s;"
                );
            return data ? f(data, this.create,this.encode) : function(data) {
                return f(data, this.create,this.encode);
            };
        },
        load: function(id) {
            return document.getElementById(id).innerHTML;
        },
        func: function(s, p1, p2, p3, p4, p5) {
            if (p1) { // whitespace, quote and backspace in HTML context
                return {
                    '\n': '\\n',
                    '\r': '\\r',
                    '\t': '\\t',
                    ' ': ' '
                }[p1] || '\\' + p1;
            }
            if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
                if (p2 === '=') {
                    return "'+_e(" + p3 + ")+'";
                }
                return "'+(" + p3 + "==null?'':" + p3 + ")+'";
            }
            if (p4) { // evaluation start tag: {%
                return "';";
            }
            if (p5) { // evaluation end tag: %}
                return "_s+='";
            }
        }
    };



    // tmpl.encReg = /[<>&"'\x00]/g // eslint-disable-line no-control-regex
    // tmpl.encMap = {
    //     '<': '&lt;',
    //     '>': '&gt;',
    //     '&': '&amp;',
    //     '"': '&quot;',
    //     "'": '&#39;'
    // }
    // tmpl.encode = function(s) {
    //     return (s == null ? '' : '' + s).replace(
    //         tmpl.encReg,
    //         function(c) {
    //             return tmpl.encMap[c] || ''
    //         }
    //     )
    // }
    // tmpl.arg = 'o'
    // tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
    //     ',include=function(s,d){_s+=tmpl(s,d);}'

    //export highlighter to root namespace
    _20p.tmpl = tmpl;
})(typeof(_20p_$) != 'undefined' ? _20p_$ : jQuery);