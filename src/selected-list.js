// 弃用
var _20p = _20p || {};
(function(Vue, $){
    // 系统页面不添加list
    if (window.top === window) {
        return false;
    }

    var _div = document.createElement('div');
    _div.setAttribute('id', '_20p_list');
    document.body.appendChild(_div);

    var template = '';
    $.ajax({
        url: chrome.extension.getURL('../templates/selected-list.tpl'),
        async: false,
        success: function(res) {
            template = res;
        },
        error: function(msg) {
        }
    }); 

    Vue.nextTick(function() {
        _20p.listVm = new Vue({
            el: '#_20p_list',
            template: template,
            data: {
                list: []
            },
            created () {
                $('body').css('padding-top', 50);
            },
            watch: {
                list: function(list) {
                    var len = list.length > 3 ? 3 : list.length;
                    $('body').css('padding-top', 50 * (len + 1));
                }
            },
            methods: {
                add: function(item) {
                    this.list.push(item);
                },
                remove: function(index) {
                    let item = this.list.splice(index, 1);
                    _20p.removeSelector && _20p.removeSelector(item.selector);
                },
                removeSelector: function(selector) {
                    var listIndex;
                    for (var i = 0; i < this.list.length; i++) {
                        if (this.list[i].selector === selector) {
                            listIndex = i;
                            break;
                        }
                    }
                    if (listIndex !== undefined) {
                        this.list.splice(listIndex, 1);
                    }
                }
            }
        });
    });

})(_20p_Vue, _20p_$);