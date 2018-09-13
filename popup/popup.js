// 获取当前模式
// chrome.storage.sync.get('contentType', function(result){
//     contentType = result.contentType || 'single';
//     $list.each(function(index, li) {
//         if (_20p_$(li).data('contentType') === contentType) {
//             _20p_$(li).addClass('active');
//         }
//     });
// });


new Vue({
    data () {
        return {
            text: {
                url: chrome.i18n.getMessage('popup_url'),
                extractContent: chrome.i18n.getMessage('popup_extractContent')
            },
            form: {
                contentType: 'content',
                url: ''
            },
            contentList: [
                {
                    label: chrome.i18n.getMessage('popup_normalEle'),
                    value: 'content'
                },{
                    label: chrome.i18n.getMessage('popup_pageEle'),
                    value: 'page'
                }
            ],
            urlList: []
        };
    },
    created () {
        let vm  = this;
        chrome.storage.sync.get('urlList', function(result){
            vm.urlList = result.urlList;
            vm.form.url = vm.urlList[0].value;
        });
    },
    watch: {
    },
    methods: {
        /**
         * sdk.js中会监听chrome.storage变化
         */
        saveUrl () {
            // 如果填写的url不是默认已有的，则保存起来
            let index = this.urlList.findIndex(item => {
                return item.value == this.form.url;
            });
            // 不存在url则保存
            if (index < 0) { 
                this.urlList = [{
                    value: this.form.url,
                    label: this.form.url
                }].concat(this.urlList);
            // 存在则放到数组最前面
            } else {
                this.urlList = this.urlList.splice(index, 1).concat(this.urlList);
            }
            chrome.storage.sync.set({ urlList: this.urlList }, function() {});
        },
        // 点击设置抽取表达式的内容类型，并开始抽取（通知content script）
        extract (contentType) {
            this.form.contentType = contentType;
            chrome.storage.sync.set({ contentType: contentType }, function() {});
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    msg: 'startAppInIframe',
                    contentType: contentType
                }, function() {});
                window.close();
            });
        }
    }
}).$mount('#app');