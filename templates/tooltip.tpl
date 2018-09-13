<div class="__root_tooltip_content " id = "tooltip">
    <!--Header-->
    <div class="tooltip_header">
        <span class="tooltip_header_title">
            {%=o.title%}
        </span>
    </div>
    <!--Body-->
    <div class="tooltip_body">
        <!--Form-->
        <form class="">
            <!--Exp-->
            <div class="tooltip_body_form_div">
                <label class="tooltip_body_form_div_label">
                    <span class="tooltip_body_form_div_label_require">
                        *
                    </span>
                    {%=o.labExp%}
                </label>
                <input class="tooltip_body_form_div_input __root_tooltip_Exp j_affect_result_input" type="text" autocomplete="off"
                value="{%=o.valExp%}">

                <!-- <input class="tooltip_body_form_div_input_tpl" type="text" autocomplete="off" placeholder="template id"
                value={%=o.templateId%}></input> -->
            </div>
            <!--Field-->
            <!--<div class="tooltip_body_form_div">
                <label class="tooltip_body_form_div_label">
                    <span class="tooltip_body_form_div_label_require">
                        *
                    </span>
                    {%=o.labField%}
                </label>
                <input class="tooltip_body_form_div_input __root_tooltip_Field" type="text" />
            </div>-->
            <!--Attr-->
            <!-- <div class = "tooltip_body_form_div_sp">
                <div class = "tooltip_body_form_div sp_line">
                    <label class="tooltip_body_form_div_label">
                        <span class="tooltip_body_form_div_label_require">
                            *
                        </span>
                        {%=o.tooltipTemplateId%}
                    </label>

                <input class="tooltip_body_form_div_input_tpl tooltip_body_form_div_select __root_tooltip_templateId input_select" type="text" autocomplete="off" placeholder="template id"
                    value={%=o.templateId%}></input>
                </div>

                <div class="tooltip_body_form_div sp_line">
                    <label class="tooltip_body_form_div_label">
                        <span class="tooltip_body_form_div_label_require">
                        *
                        </span>
                        {%=o.labAttr%}
                    </label>
                   
                    <select name = "抽取属性" class="tooltip_body_form_div_select __root_tooltip_Attr input_select">
                        <option value = "selector" selected>selector</option>
                        <option value = "xpath">xpath</option>
                        <option value = "transform">transform</option>
                        <option value = "download">download</option>
                        <option value = "regex">regex</option>
                    </select>
                </div>

            </div> -->
            <div class = "tooltip_body_form_div_sp">
                <div class="tooltip_body_form_div sp_line">
                    <label class="tooltip_body_form_div_label">
                        <span class="tooltip_body_form_div_label_require">
                            *
                        </span>
                        {%=o.labField%}
                    </label>
                    <select name = "field" class="tooltip_body_form_div_select __root_tooltip_Field input_select">
                
                        <option value = "title">title</option>
                        <option value = "content">content</option>
                        <option value = "author">author</option>
                        <option value = "item_id">item_id</option>
                        <option value = "view_count">view_count</option>
                        <option value = "review_count">review_count</option>
                        <option value = "publish_timestamp">publish_timestamp</option>
                        <option value = "publish_date">publish_date</option>
                        <option value = "is_main_post">is_main_post</option>
                        <option value = "parent_id">parent_id</option>
                        <option value = "like_count">like_count</option>
                        <option value = "_[L]floor_">_[L]floor_</option>

                    </select>
                    <!-- <input class="tooltip_body_form_div_input __root_tooltip_Attr" type="text" /> -->
                </div>
                <!--Func-->
                <div class="tooltip_body_form_div sp_line">
                    <label class="tooltip_body_form_div_label">
                        {%=o.labFunc%}
                    </label>
                    <!-- <input class="tooltip_body_form_div_input __root_tooltip_Func" type="text" /> -->
                    <select name = "Java 函数" class="tooltip_body_form_div_select __root_tooltip_Func input_select j_affect_result_input">
                        <option value = "md5">md5</option>
                        <option value = "date_v2">date_v2</option>
                        <option value = "list">list</option>
                    </select>
                </div>
            </div>
            <!--Result-->

            <div class="tooltip_body_form_div">
                <label class="tooltip_body_form_div_label">
                    {%=o.labExtractAttr%}
                </label>
                <input class="sp_line tooltip_body_form_div_input __root_tooltip_extract_attr j_affect_result_input" type="text" autocomplete="off"
                style = "width: 49%" placeholder="">
            </div>
            
            <div class="tooltip_body_form_div">
                <label class="tooltip_body_form_div_label">
                    {%=o.labJs%}
                </label>
                <input class="tooltip_body_form_div_input __root_tooltip_js j_affect_result_input" type="text" autocomplete="off"
                placeholder="">
            </div>

            <div class="tooltip_body_form_div">
                <label class="tooltip_body_form_div_label">
                    {%=o.labResult%}
                    <span class="js_result_tip hide red">{%=o.resultLoading%}</span>
                </label>
                <textarea class="tooltip_body_form_div_textarea __root_tooltip_Result" autocomplete="off"
                disabled="disabled" placeholder="{%=o.labResultTip%}"></textarea>
            </div>
        </form>
    </div>
    <!--Footer-->
    <div class="tooltip_footer">
        <span>
            <button class="tooltip_footer_button_cancel" style="" type="button">
                <span>
                    {%=o.btnCancel%}
                </span>
            </button>
            <button class="tooltip_footer_button_ok" style="" type="button">
                <span>
                    {%=o.btnOK%}
                </span>
            </button>
        </span>
    </div>
</div>