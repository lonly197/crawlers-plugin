/**
 * function: getCurrentTabUrl()  
 * 获取当前的标签页url
 * 
 * function: getFetchContent()   
 * 获取抽取结果
 * @param{number, string} tid 配置模板ID
 * @param{string} selector 要抽取的标签路径
 * @param{string} type  属性类型
 * @param{string} func  抽取的JAVA函数
 * @param{string} attr  抽取属性
 * @param{string} js    js代码
 *
 *function: getTemplateId() 
 * 获取抽取模板ID
 * 
 * function: getTooltipContentHTML() 
 * 获取html模板并将其转化为标准的html模式
 * @param{string} selector 要抽取的标签路径
 * @param{string} target 当前高亮的dom元素
 * 
 * function: getLastZindex() 
 * 获取页面最大的Z-index
 * 
 * function: hideToolTip() 
 * 隐藏配置表单
 * 
 * function: handleParentClick(evt)
 * 处理点击高亮元素之后的行为 关闭插件抽取模式
 * @param{event} evt 事件
 * 
 * function: handleInputFocusOut(evt)
 * 处理表单项失去焦点后的行为
 * @param{event} evt 事件
 * 
 * function: handleButtonOKClick(evt)
 * 处理点击确定按钮后的行为
 * @param{event} evt 事件
 * 
 * function: handleButtonCancelClick(evt)
 * 处理点击取消按钮后的行为
 * @param{event} evt 事件
 * 
 * function: showTooltip(selector, target)
 * 显示配置表单
 * @param{string} selector 当前的标签路径
 * @param{string} target 选择的dom元素
 * 
 * function: stopApp()
 * 关闭当前的抽取模式
 * 
 * function: bubble(target, playerzIndex)
 * 在选择的dom元素下显示冒泡框
 * @param{string} target 选择的dom元素
 * @param{number, string} playerzIndex 要显示的zIndex 
 * 
 * function: startApp()
 * 启动插件的抽取模式
 * 
 *  
 */





/**
 * function: tplExtractTest(tid, selector, type, func, attr, js)
 * 用于向服务器请求抽取结构，首先将配置信息发送给浏览器的背景页
 * 背景页向服务器请求具体的数据
 * 
 * @param{number, string} tid 配置模板ID
 * @param{string} selector 要抽取的标签路径
 * @param{string} type  属性类型
 * @param{string} func  抽取的JAVA函数
 * @param{string} attr  抽取属性
 * @param{string} js    js代码
 * 
 */

/**
 * function: tplExtractUpdate(tid, selector, type, func, attr, js)
 * 将配置信息发送给服务器，服务器将配置信息写入到服务器
 * @param{number, string} tid 配置模板ID
 * @param{string} selector 要抽取的标签路径
 * @param{string} type  属性类型
 * @param{string} func  抽取的JAVA函数
 * @param{string} attr  抽取属性
 * @param{string} js    js代码
 */


 /**
  * function: create(str, data)
  * 将str模板串根据data中语言包去解析 并返回解析后的html
  * @param{string} str 模板串
  * @param{json} data 语言包
  */

/**
 * function: getSelector(el)
 * 根据传入的el dom元素不断向根部回溯，根据dom元素的class 以及 id 
 * 去拼合成爬虫系统易于使用的路径格式
 * @param{string} el 要去解析的dom元素 
 */