<div class="selected-list highlight-disable">
    <table>
        <tbody>
            <tr>
                <th width="10%">表达式</th>
                <th width="10%">存储属性</th>
                <th width="10%">java功能函数</th>
                <th width="10%">抽取属性</th>
                <th width="10%">js脚本</th>
                <th width="40%">内容</th>
                <th width="10%">操作</th>
            </tr>
            <tr v-for="(item, index) in list">
                <td>{{ item.selector }}</td>
                <td>{{ item.field }}</td>
                <td>{{ item.func }}</td>
                <td>{{ item.extractAttr }}</td>
                <td>{{ item.js }}</td>
                <td>{{ item.content }}</td>
                <td>
                    <button href="javascript:;" @click="remove(index)">&nbsp;X&nbsp;</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>