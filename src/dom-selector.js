var _20p = _20p || {};
(function($){
    var domSelector = {
        ignoreClasses: function(className){
            var ignores = ['ui-sortable', 'ui-droppable','has-error'];
            return (ignores.indexOf(className)>=0);
        },
        escapeJquerySpecials: function(str){
            str = str.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1');
            return str;
        },
        getSelector: function(el) {
            if (el.length != 1) {
                throw 'Requires one element.';
            }
            var path = '', node = el;
            // if(node.length)
            //     node = node[0];
            // while(node.localName != 'html'){
            //     if(path === '')
            //         path = node.localName; 
            //     else 
            //         path = node.localName + ">" + path;
            //     node = node.parentNode;
            // }
            while (node.length) {
                var realNode = node[0],
                    name = realNode.localName;
                if (!name || name.toLowerCase() == 'html') {
                    break;
                }
                node_id = $(realNode).attr('id');
                if(node_id && /[0-9]+$/.test(node_id))
                    node_id = '';
                name = name.toLowerCase();
                if (node_id) {
                    // As soon as an id is found, there's no need to specify more.
                    var id_selector = name + '#' + this.escapeJquerySpecials(node_id) + (path ? '>' + path : '');
                    // check this newly generated selector if not unique then traverse further
                    var matches = $(id_selector);
                    if (matches.length > 1) {
                    // path = id_selector;
                    } else {
                        return id_selector;
                    }
                } else if (realNode.className) {
                    //name += '.' + realNode.className.split(/\s+/).join('.');
                    // check if any of the class is unique
                    var classes = realNode.className.split(/\s+/);
                    for (var cindex in classes) {
                        if ($.trim(classes[cindex]).length && !this.ignoreClasses(classes[cindex]) && $(name + '.' + this.escapeJquerySpecials(classes[cindex])).length == 1) {
                             // if unique return that as root
                            var classSelector = name + '.' + this.escapeJquerySpecials(classes[cindex]) + (path ? '>' + path : '');
                            var matches = $(classSelector);
                            if (matches.length > 1) {
                                  // path = id_selector;
                            } else {
                                return classSelector;
                            }
                        }
                    }
                }
                var parent = node.parent();
                if (parent.length) {
                    var sameTagSiblings = parent.children(name);
                    if (sameTagSiblings.length > 1) {
                        allSiblings = parent.children();
                        var index = allSiblings.index(realNode) + 1;
                        if (allSiblings.length > 1) {
                            name += ':nth-child(' + index + ')';
                        }
                    }
                    path = name + (path ? '>' + path : '');
                    var parentName = parent[0].localName;
                    if (parentName.toLowerCase() == 'html') {
                        parent = []; //return if html node found
                    }
                }
                node = parent;
            }
            return path;
        },
        getExtractedSelector: function(el, pattern) {
            el = $(el);
            var selector = this.getSelector(el);
            switch(pattern) {
            case 'SINGLE':
                break;
            case 'LIST': 
                selector = this.filterListSelector(selector);
                break;
            }
            return selector;
        },
        /**
         * 对selector从右到左找到带nth-child(n)的过滤层级，删除nth-child(n)过滤，获取一个列表，判断列表元素的html结构是否相同，相同则这个列表满足
         */
        filterListSelector: function(selector) {
            var selectorItems = selector.split('>');
            var reg = /\:nth\-child\(\d+\)/;

            for (var i = selectorItems.length - 1; i > 0; i--) {
                if (selectorItems[i].indexOf(':nth-child') >= 0 && selectorItems[i].indexOf('td') < 0 && selectorItems[i].indexOf('span')) {
                    var _selector = selectorItems.slice(0, i).join('>') + '>' + selectorItems[i].replace(reg, '');
                    var $el = $(_selector);
                    if (isElList($el)) {
                        selectorItems[i] = selectorItems[i].replace(reg, '');
                        selector = selectorItems.join('>');
                        break;
                    }
                }
            }
            function isElList($el) {
                if ($el.length <= 1) {
                    return false;
                } else {
                    var result = true;
                    var el1List = [$el[0]];
                    var el2List = [$el[0]];
                    while(el1List.length > 0) {
                        var el1 = el1List.shift();
                        var el2 = el2List.shift();
                        if (el1.nodeName != el2.nodeName) {
                            result = false;
                            break;
                        }
                        if (el1.children && el2.children) {
                            el1List = el1List.concat(el1.children);
                            el2List = el2List.concat(el2.children);
                        }
                    }
                    return result;
                }
            }
            return selector;
        },
        getLastZindex: function(){
            var maxZ = Math.max.apply(null,$.map($('body > *'), function(e,n){
                if($(e).css('position')=='absolute')
                    return parseInt($(e).css('z-index'))||1 ;
            })
        );
            return maxZ;
        }
    };
//export highlighter to root namespace
    _20p.domSelector = domSelector;

})(_20p_$);