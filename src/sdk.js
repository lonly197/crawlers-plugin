/* Skynet Crawl Site API jQuery Plugin
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
    chrome.storage.onChanged.addListener(function(changes) {
        for (key in changes) {
            var storageChange = changes[key];
            if (key === 'urlList') {
                _20p.sdkhost = storageChange.newValue[0].value;
            }
        }
    });
    var sdk = {
        // Template Rules - Extract Test
        tplExtractTest: function(params) {
            var result = '';
            _20p.sdkhost = _20p.sdkhost ? _20p.sdkhost : 'http://crawl1:28897';
            var tplExtractTestApi = _20p.sdkhost + '/skynet/crawl/siteManager/template/templateExtractTest';
            // if (!tid || !url || !exp) {
            //     return result;
            // }

            chrome.runtime.sendMessage(JSON.stringify({
                url: tplExtractTestApi,
                params: params
            }), function(response){ 
                // TODO
                if (!response) {
                    $('.js_result_tip').show();
                    return false;
                }
                $('.js_result_tip').hide();
                response = JSON.parse(response);
                if(response.data && parseInt(response.code) === 0)
                    result = response.data.value; 
                
                if(!result){
                    !$('.__root_tooltip_Result').hasClass('nullResult') &&
                     $('.__root_tooltip_Result').addClass('nullResult');
                    
                    $('.__root_tooltip_Result').val(result);
                } else {
                    $('.__root_tooltip_Result').hasClass('nullResult') && 
                    $('.__root_tooltip_Result').removeClass('nullResult');
                    $('.__root_tooltip_Result').val(result);
                }
            });
            return result;
        },
        // Template Rules - Extract Update
        tplExtractUpdate: function(tid, type, field, exp, attr, func, js) {
            var result = false;
            var tplExtractUpdateApi = _20p.sdkhost + '/skynet/crawl/site/tplExtractUpdate';
            // if (!tid || !url || !exp) {
            //     return result;
            // }
            // url = encodeURIComponent(url);
            attr = encodeURIComponent(attr);
            exp = encodeURIComponent(exp);
            func = encodeURIComponent(func);
            js = encodeURIComponent(js);
            tplExtractUpdateApi += '?tid=' + tid + '&field=' + field + '&exp=' + exp + '&attr=' + attr + '&func=' + func;
            tplExtractUpdateApi += '&type=' + type + '&js=' + js; 
            $.ajax({
                url: tplExtractUpdateApi,
                async: false,
                success: function(rep) {
                    if (rep.code === 0) {
                        result = true;
                    }
                    _20p.stopApp();
                },
                error: function(msg) {
                    _20p.stopApp();
                }
            });
            return result;
        }
    };

    // export highlighter to root namespace
    _20p.sdk = sdk;
})(_20p_$);