var _20p = _20p || {};
(function($){
    _20p.isStarted = false;
    _20p.elementSelected = false;
    _20p.selectedElem = null;
    _20p.currentTabUrl = null;
    _20p.contentType = 'content';
    _20p.extractType = 'LIST';

    _20p.__HtmlTagType = {
        a: 'Link',
        abbr: 'Abbreviation',
        area: 'Image Map Area',
        b: 'Bold Text',
        big: 'Big Text',
        blockquote: 'Block Quote',
        br: 'Line Break',
        cite: 'Citation',
        col: 'Column',
        colgroup: 'Column Group',
        dd: 'Definition List Definition',
        del: 'Deleted Text',
        dfn: 'Definition',
        dir: 'Directory List',
        div: 'Division',
        dl: 'Definition List',
        dt: 'Definition List Item',
        em: 'Emphasized Text',
        embed: 'Embedded Object',
        eventsource: 'Event Source',
        figcaption: 'Figure Caption',
        h1: 'Headline',
        h2: 'Headline',
        h3: 'Headline',
        h4: 'Headline',
        h5: 'Headline',
        h6: 'Headline',
        hgroup: 'Section Header',
        hr: 'Horizonal Rule',
        i: 'Italic Text',
        iframe: 'iFrame',
        img: 'Image',
        input: 'Input Field',
        ins: 'Inserted Text',
        kbd: 'Keyboard Text',
        li: 'List Item',
        map: 'Image Map',
        mark: 'Marked Text',
        menu: 'Menu List',
        nav: 'Navigation Section',
        object: 'Embedded Object',
        ol: 'Ordered List',
        optgroup: 'Option Group',
        option: 'Selection Option',
        p: 'Paragraph',
        param: 'Embedded Object Parameter',
        pre: 'Preformatted Text',
        q: 'Quotation',
        samp: 'Sample Output',
        select: 'Selection List',
        small: 'Small Text',
        strong: 'Strong Text',
        sub: 'Subscript Text',
        sup: 'Superscript Text',
        tbody: 'Table Body',
        td: 'Table Data',
        textarea: 'Text Field',
        tfoot: 'Table Footer',
        th: 'Table Header',
        thead: 'Table Header',
        tr: 'Table Row',
        tt: 'Typewriter Text',
        u: 'Underlined Text',
        ul: 'Unordered List',
        'var': 'Variable'
    };

    _20p.getCurrentTabUrl = function() {
        // Cannot use chrome.tabs in content scr
        return _20p.currentTabUrl;
    };

    _20p.getFetchContent = function(elementStr, func, attr, jsCode) {
        // var fetch_url = _20p.getCurrentTabUrl();
        chrome.runtime.sendMessage({
            msg: 'getParam'
        }, function(response) {
            _20p.sdk.tplExtractTest(Object.assign({
                elementStr: elementStr, 
                func, attr, jsCode
            }, response));
            console.log('res', response)
        });
    };

    _20p.getTemplateId = function(){
        if(window.name && JSON.parse(window.name).hasOwnProperty('templateId'))
            return JSON.parse(window.name)['templateId'];
        return '';
    };
    // 获取到 html 模板并做相应解析
    _20p.getTooltipContentHTML = function(selector, target) {
        var tooltip_content = '';
        var meta = {
            'title': chrome.i18n.getMessage('tooltipTitle'),
            'labExp': chrome.i18n.getMessage('tooltipFormExp'),
            'valExp': selector,
            'tooltipTemplateId': chrome.i18n.getMessage('tooltipTemplateId'),
            'templateId': this.getTemplateId(),
            'labField': chrome.i18n.getMessage('tooltipFormField'),
            'labAttr': chrome.i18n.getMessage('tooltipFormAttr'),
            'labFunc': chrome.i18n.getMessage('tooltipFormFunc'),
            'labResult': chrome.i18n.getMessage('tooltipFormFetchResult'),
            'labResultTip': chrome.i18n.getMessage('tooltipFormFetchResultTip'),
            'btnCancel': chrome.i18n.getMessage('tooltipButtonCancel'),
            'btnOK': chrome.i18n.getMessage('tooltipButtonOK'),
            'labExtractAttr': chrome.i18n.getMessage('tootipExtractAttr'),
            'labJs': chrome.i18n.getMessage('tooltipJs'),
            'resultLoading': chrome.i18n.getMessage('resultLoading'),
        };
        $.ajax({
            url: chrome.extension.getURL('../templates/tooltip.tpl'),
            async: false,
            success: function(rep) {

                tooltip_content = _20p.tmpl.create(rep, meta);
            },
            error: function(msg) {
            }
        }); 
        return tooltip_content;
    };

    _20p.getLastZindex = function() {
        var maxZ = Math.max.apply(null, $.map($('*'), function(e, n) {
            return parseInt($(e).css('z-index')) || 1;
        }));
        return maxZ;
    };
    /**
     * 废弃方法
     * @param {*} target 
     */
    _20p.getTargetParents = function(target) {
        var parentsInfo = [];
        var parents = $(target).parents();
        for (var i = 0; i < parents.length; i++) {
            var el = parents.eq(i);
            var id = el.attr('id');
            var selector = _20p.domSelector.getExtractedSelector(el, _20p.extractType);
            var tagName = el.get(0).tagName;
            parentsInfo.push([selector, tagName, id]);
        }
        return parentsInfo;
    };

    _20p.showPickedSelector = function(target, selector) {
        selector = selector || _20p.domSelector.getExtractedSelector(target, _20p.extractType);

        this.elementSelected = true;
        this.selectedElem = {};
        this.selectedElem.selector = selector;
        this.selectedElem.el = target;
        this.mine_highlighter.hide();
        this.show_selected_highlighter.highlight(target);
        this.showTooltip(selector, target);
    };

    _20p.hideTooltip = function() {
        $('.__root_tooltip_content').off('mousemove.parents');
        $('.__root_tooltip_content').off('click.parents');
        $('.tooltip_footer_button_ok').off('click.ok');
        $('.tooltip_footer_button_cancel').off('click.cancel');
        $('#tooltip input').off('focusout.input');
        $('#toolTipWrapper').css({
            'display': 'none'
        });
    };

    _20p.getFriendlyTagName = function(tagName, id) {
        tagName = tagName.toLowerCase();
        var tagType = this.__HtmlTagType[tagName];
        tagType || (tagType = tagName.charAt(0).toUpperCase() + tagName.slice(1));
        return id ? tagType + ' ' + id : tagType + ' &lt;' + tagName + '&gt;';
    };
    /**
     * 废弃方法
     * @param {*} target 
     */
    _20p.getParentsListHtml = function(target) {
        var parents = this.getTargetParents(target);
        var parentsList = [];
        for (var len = Math.min(parents.length, 10), i = 0; i < len; i++) {
            var tagName = parents[i][1];
            var id = parents[i][2];
            var selector = parents[i][0] || '';
            var li = '<li ';
            var anchor = '';
            if ('HTML' === tagName || 'BODY' === tagName) {
                li += ' class=\'disabled\'';
                anchor = '<span select-container=\'' + selector + '\' tabindex=\'-1\'>' + _20p.getFriendlyTagName(tagName, id) + '</span>';
            } else {
                anchor = '<a select-container=\'' + selector + '\' href=\'#\' tabindex=\'-1\'>' + _20p.getFriendlyTagName(tagName, id) + '</a>';
            }
            li += '>' + anchor + '</li>';
            parentsList.push(li);
        }
        return '<ul class=\'__parents_list\'>' + parentsList.join('') + '</ul>';
    };

    // _20p.handleParentMouseMove = function(evt) {
    //     var el = $(evt.target).closest("a[select-container]");
    //     if (el.length && $(evt.target).closest("li.disabled").length == 0) {
    //         var selector = el.attr("select-container");
    //         if (selector) {
    //             this.show_selected_highlighter.highlight($(selector));
    //         } else {
    //             this.show_selected_highlighter.highlight($(this.selectedElem.selector));
    //         }
    //     } else {
    //         this.show_selected_highlighter.highlight($(this.selectedElem.selector));
    //     }
    // };

    _20p.handleParentClick = function(evt) {
        evt.preventDefault();
        var el = $(evt.target).closest('a[select-container]');
        if (el.length && $(evt.target).closest('li.disabled').length === 0) {
            var selector = el.attr('select-container');
            if (selector) {
                _20p.hideTooltip();
                _20p.showPickedSelector($(selector), selector);
            }
        }
    };

    _20p.handleInputFocusOut = function(evt) {
        // 将tempalteId获取到本地 从而实现跨域
        var templateId = $('.tooltip_body_form_div_input_tpl').val(); 
        window.name = JSON.stringify({
            templateId: templateId
        });
        var selector = $('.__root_tooltip_Exp').val();
        var func = $('.__root_tooltip_Func').val();
        var extractAttr = $('.__root_tooltip_extract_attr').val();
        var js = $('.__root_tooltip_js').val();
        if (!selector.trim()) {
            return false;
        }
        if (!(func.trim() || extractAttr.trim() || js.trim())) {
            let elementText = Array.from(document.querySelectorAll(selector)).map(ele => {
                let $ele = $(ele).clone();
                $ele.find('script').remove();
                return $ele.text();
            }).join('');
            $('.__root_tooltip_Result').val(elementText);
        } else {
            let elementHtml = Array.from(document.querySelectorAll(selector)).map(ele => {
                return ele.outerHTML;
            }).join('');
            this.getFetchContent(elementHtml, func, extractAttr, js);
        }
    };

    _20p.handleButtonOKClick = function(evt) {
        evt.preventDefault();
        // 测试
        // _20p.handleInputFocusOut(evt);
        // var el = $('.__root_tooltip_Exp').val();
        // _20p.clipboard.copyTextToClipboard(el.val());
        // var tid = $('.tooltip_body_form_div_input_tpl').val();
        // var type = $('.__root_tooltip_Attr').val();
        // var field = $('.__root_tooltip_Field').val();
        // var func = $('.__root_tooltip_Func').val();
        // var attr = $('.__root_tooltip_extract_attr').val();
        // var js = $('.__root_tooltip_js').val();
        // _20p.sdk.tplExtractUpdate(tid, type, field, el, attr, func, js);

        this.handleButtonCancelClick();

        var selector = $('.__root_tooltip_Exp').val();
        var func = $('.__root_tooltip_Func').val();
        var extractAttr = $('.__root_tooltip_extract_attr').val();
        var js = $('.__root_tooltip_js').val();
        var field = $('.__root_tooltip_Field').val();
        var content = $('.__root_tooltip_Result').val();

        this.addSelector({
            selector, func, extractAttr, js, field, content
        });
    };

    _20p.handleButtonCancelClick = function(evt) {
        evt && evt.preventDefault();
        var el = $('.__root_tooltip_Exp');
        // _20p.clipboard.copyTextToClipboard(el.val());
        this.hideTooltip();
        this.mine_highlighter.hide();
        this.show_selected_highlighter.hide();
        this.elementSelected = false;
        this.selectedElem = null;
    };

    _20p.showTooltip = function(selector, target) {
        var playerzIndex = this.domHigherIndex + 4;
        var position = 'bottom';
        
        // $(target).ct(this.getTooltipContentHTML(selector, target), {
        //     trigger: 'none',
        //     offsetParent: 'body',
        //     clickAnywhereToClose: false,
        //     wrapperzIndex: playerzIndex,
        //     fill: '#FFF',
        //     shrinkToFit: true,
        //     cornerRadius: 10,
        //     strokeWidth: 0,
        //     shadow: true,
        //     shadowOffsetX: 0,
        //     shadowOffsetY: 0,
        //     shadowBlur: 8,
        //     shadowColor: 'rgba(0,0,0,.9)',
        //     shadowOverlap: false,
        //     noShadowOpts: { strokeStyle: '#999', strokeWidth: 2 },
        //     positions: position,
        //     preBuild: function() {

        //     }
        // });
        // $(target).ctOn();
        var ele = this.bubble(target, playerzIndex); 
        var toolTipContentHTML = this.getTooltipContentHTML(selector, target);
        $(ele).html(toolTipContentHTML);
        $('.input_select').editableSelect();
        $('.__root_tooltip_Result').val(Array.from(document.querySelectorAll(selector)).map(ele => {
            let $ele = $(ele).clone();
            $ele.find('script').remove();
            return $ele.text();
        }).join(''));
        if (this.contentType === 'page') {
            $('.__root_tooltip_extract_attr').val('page_url').attr('disabled', 'disabled');
        } else {
            $('.__root_tooltip_extract_attr').removeAttr('disabled');
        }
        // ele.innerHTML = toolTipContentHTML;
        // $(".__root_tooltip_content").on("mousemove.parents", this.handleParentMouseMove.bind(this));
        $('.__root_tooltip_content').on('click.parents', this.handleParentClick.bind(this));
        $('.tooltip_footer_button_ok').on('click.ok', this.handleButtonOKClick.bind(this));
        $('.tooltip_footer_button_cancel').on('click.cancel', this.handleButtonCancelClick.bind(this));
        $('.j_affect_result_input').on('input', () => {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.timeout = setTimeout(() => {
                this.handleInputFocusOut();
            }, 500);
            return false;
        });

    };


    _20p.stopApp = function() {
        this.isStarted = false;
        this.hideTooltip();
        this.mine_highlighter.hide();
        this.show_selected_highlighter.hide();
        this.elementSelected = false;
        this.selectedElem = null;
        $(document).off('keydown.main');
        $(document).off('mousemove.main');
        $(document).off('mouseup.main');
    };

    // show the tooltips wrapper in bubble
    _20p.bubble = function(target, playerzIndex){
        var viewportWidth = $(document).width() - 5,
            viewportHeight = $(document).height() - 5; 

        var bubbleWidth = 500, 
            bubbleHeight = 400; 

        var element = $(target.get(0)),
            offset = element.offset(), 
            dimensions = {
                height: element.outerHeight(), 
                width: element.outerWidth()
            }; 

        var bubbleLeft = parseInt(offset.left + dimensions.width / 2 - bubbleWidth / 2),
            bubbleTop = parseInt(offset.top + dimensions.height + 10); 

        bubbleLeft = bubbleLeft > 0 ? bubbleLeft : 0; 
        
        var ele = $('#toolTipWrapper').length === 0 ? $('<div id = "toolTipWrapper"></div>').appendTo('body') : $('#toolTipWrapper')[0]; 
        $(ele).css({
            'position': 'absolute',
            'left': bubbleLeft,
            'top': bubbleTop,
            'width': '500',
            'height': 'auto',
            'backgroundColor': '#ccc',
            'zIndex': playerzIndex,
            'display': 'block'
        });
        
        return ele; 
    };

    _20p.startApp = function(tab_url) {
        if (this.isStarted) {
            return false;
        }
        this.isStarted = true;
        var self = this;
        // get current tab url
        self.currentTabUrl = tab_url;
        // init hightlighter here
        this.domHigherIndex = _20p.getLastZindex();
        var highlightZindex = this.domHigherIndex + 2;
        this.mine_highlighter = _20p.Highlighter.get('mine_highlighter', {
            type: 'frame',
            // hole: true,
            // allowEventsOnAllSides:true,
            // cancelClick: true,
            className: 'mouse_over_highlighter',
            zIndex: highlightZindex,
            styles: {
                sides: {
                    backgroundColor: 'blue',
                    opacity: 0.7
                },
                center: {
                    backgroundColor: 'blue',
                    opacity: 0.1
                }
            }
        });
        this.show_selected_highlighter = _20p.Highlighter.get('show_selected_highlighter', {
            type: 'shine',
            hole: false,
            centerxborderWidth: 0,
            className: 'show_selected_highlighter',
            zIndex: highlightZindex,
            styles: {
                sides: {
                    backgroundColor: '#000',
                    opacity: 0.7
                },
                center: {
                    xborderWidth: '0px',
                    backgroundColor: '#000',
                    opacity: 0.1
                }
            }
        });

        $(document).bind('keydown.main', 'ctrl+shift+v', function(evt){
            evt.preventDefault();
            if(!self.isStarted)
                self.startApp();
        });

        $(document).bind('keydown.main', 'shift+s', function(evt) { 
            if (self.elementSelected == false) {
                evt.preventDefault();
                var target = $(self.mine_highlighter.overEl);
                self.showPickedSelector(target);
            }
        });

        $(document).bind('keydown.main', 'esc', function(evt){
            if(self.isStarted)
                self.stopApp();
        });
        $(document).on('mousemove.main', function(evt) {
            var target = $(evt.target);
            if (target.hasClass('highlight-disable') || target.closest('.highlight-disable').length !== 0) {

            } else if (self.elementSelected === false) {
                var highlight_el = target;
                var highlight_options = {};
                if (evt.shiftKey) {
                    highlight_options = {
                        bgcolor: 'green',
                        hole: true,
                        allowEventsOnAllSides: true,
                        cancelClick: true,
                        cancelClickOnAllSides: true
                    };
                    if (self.mine_highlighter.overEl === target.get(0)) {
                        self.mine_highlighter.hide();
                    }
                } else {
                    self.mine_highlighter.hide();
                    var target_el = document.elementFromPoint(evt.clientX, evt.clientY);
                    self.mine_highlighter.highlight();
                    if (highlight_el.get(0) !== target_el) {
                        highlight_el = target_el;
                    }
                }
                self.mine_highlighter.highlight(highlight_el, highlight_options);
            }
        });
        // click not added due to anchor
        // if mousedown on anchor and mouseup on diffrent element the
        // body click does not fired
        // the hack is register our work on mouseup
        $(document).on('mouseup.main', function(evt) {
            if ($(evt.target).hasClass('show_selected_highlighter')) {
                self.elementSelected = false;
                self.selectedElem = null;
                self.mine_highlighter.highlight();
                self.show_selected_highlighter.hide();
                self.hideTooltip(self.show_selected_highlighter.overEl);
                return false;
            } else {
                evt.preventDefault();
                if ($(evt.target).hasClass('mouse_over_highlighter')) {
                    var target = $(self.mine_highlighter.overEl);
                    self.showPickedSelector(target);
                }
            }
        });
    };

    _20p.addSelector = function(data) {
        // iframe通知顶层window接收结果
        window.top.postMessage({
            msg: 'setSelector',
            data: data
        }, '*');
        // this.listVm.add(data);
    };

    // 通知iframe初始化插件
    _20p.startAppInIframe = function(contentType) {
        if (window.frames[0]) {
            window.frames[0].postMessage({
                msg: 'startApp',
                contentType: contentType
            }, '*');
        }
    };

    window.addEventListener('message', function(message) {
        if (!message.data) {
            return false;
        }
        switch(message.data.msg) {
            case 'startApp':
                // iframe中监听插入系统的contentScript的startApp事件
                _20p.contentType = message.data.contentType;
                _20p.startApp(window.location.href);
                break;
            case 'setExtractType':
                // iframe中监听系统的setExtractType事件
                _20p.extractType = message.data.extractType;
                break;
                case 'setParam':
                // 插入系统的contentScript监听系统的setParam事件，传给插件参数，参数用于获取抽取预览结果
                // 参数通过sendMessage保存在background.js中
                chrome.runtime.sendMessage({
                    msg: 'setParam',
                    paramName: message.data.paramName,
                    paramValue: message.data.paramValue
                }, function(response) {});
                break;
            default:
        }
    });

    // 监听popup发过来的初始化消息
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.msg == 'startAppInIframe') {
            _20p.startAppInIframe(request.contentType);
        }
    });

})(_20p_$);