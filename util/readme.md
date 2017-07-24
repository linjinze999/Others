## COMMON.JS说明文档
#### 导语
> 对common.js的作用进行阐述。

## 一、默认执行
1. bootstrap-datepicker：日期控件汉化
2. multipleSelect：默认参数修改

## 二、通用工具
> 所有通用工具都封装在全局JSON变量**common**中，使用时可如此引用：
        
        common.XXX();
1. post
  - 描述：使用AJAX.post进行请求，对错误结果进行处理。
  - 输入：
    - 类型：json
    - 字段：
      - url：请求地址（String，必需）
      - cb：请求成功后的回调函数（function(data)，必需）
      - param：请求参数（Json，非必需）
      - sync：是否同步（Boolean，非必需，默认否）
      - complete：请求结束的回调函数（function，非必需）
  - 输出：无
2. searchEcharts
  - 描述：结果为Echarts展示的post。
  - 输入：
    - 类型：json
    - 字段：
      - button：请求时禁用的按钮ID（String，必需）
      - echarts：Echarts初始化的元素ID（String，必需）
      - formId：要记录输入的Form的ID（String，必需）
      - url：请求地址（String，必需）
      - cb：请求成功后的回调函数（function(data)，非必需，返回Echarts的option）
      - param：请求参数（Json，非必需）
      - sync：是否同步（Boolean，非必需，默认否）
      - complete：请求结束的回调函数（function，非必需）
   - 输出：
     - 请求时：禁用按钮，Echarts显示加载中；
     - 请求后：恢复按钮，展示Echarts。
3. dialog
  - 描述：提示框
  - 输入
    - 类型：json
    - 字段：
      - title：标题（String，必需）
      - content：文本描述（String，必需，支持html）
  - 输出：提示框
4. recordForm
  - 描述：记录Form表单内所有的输入信息
  - 输入：form的id（String，必需）
  - 输出：localStorage记录表单输入
5. loadForm
  - 描述：恢复Form表单上次的输入信息
  - 输入：form的id（String，必需）
  - 输出：恢复Form表单上次的输入信息
6. getForm
  - 描述：获得Form表单的所有输入值
  - 输入：form的id（String，必需）
  - 输出：
    - 类型：json
    - 字段
      - key：input的name
      - value： input的value
    - 示例：'{user:"test",password:"test",children:["ch1","ch2"]}'
7. tabs
  - 描述：控制tab切换
  - html如下：
        <div>
    		<ul class="nav nav-tabs" id="tabs">
    		  <li role="presentation" class="active" data-tab="tab1"><a href="javascript:void(0)">Home</a></li>
    		  <li role="presentation" data-tab="tab2"><a href="javascript:void(0)">Profile</a></li>
    		  <li role="presentation" data-tab="tab3"><a href="javascript:void(0)">Messages</a></li>
    		</ul>
    		<div class="cm-card" id="tab1">tab1</div>
    		<div class="cm-card" id="tab2" style="display:none">tab2</div>
    		<div class="cm-card" id="tab3" style="display:none">tab3</div>
    	</div>解释：按照bootstrap形式编写html，在li上添加"data-tab"设置其对应的tab容器id。
  - js如下：
         common.tabs("tabs");
    解释：调用common.tabs()，将ul的**id**作为参数传入即可。

8. showBarEcharts
  - 描述：自动展示折线图
  - 输入
    - 类型：json
    - 字段：
      - id：Echarts容器的id（String，必需）
      - config：
        - title：标题（String，必需）
        - yUnit：Y轴单位（String，默认为：**%**）
        - xText：X轴的文本数组（Array[String]，必需）
        - items：项目（Array[Object]，必需）
          - name：项目名称（String，必需）
          - data：项目对应X轴的数据（Array，必需）
          
 > **示例：**
 >      '{
              id:"echarts",
              config:{
                title:"测试",
        	    yUnit:"百分比",
        	    xText:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        	    items:[{
        	        name:"蒸发量",
        	        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        	    },{
        	        name:"降水量",
        		    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        	    }]
               }
        }'

  - 输出：自动显示柱状图
