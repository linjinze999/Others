(function(){
	//日期控件的汉化
	if(!$.fn.datepicker.dates['cn']){
	    $.fn.datepicker.dates['cn'] = {
				days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
				daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
				months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
				today: "今日",
				clear: "清除",
				format: "yyyy-mm-dd",
				titleFormat: "yyyy年mm月",
				weekStart: 1
			};
		$.fn.datepicker.defaults.language = 'cn';
		$.fn.datepicker.defaults.autoclose = true;
	}
	//multipleSelect默认参数更改
	Object.assign($.fn.multipleSelect.defaults,{
		placeholder: '请选择',
		selectAllDelimiter: ['', ''],
		multiple: true,
		multipleWidth: "190",
		filter: true,
		width: 230,
		delimiter: ', ',
		selectAllText: "<span style='font-weight:bold;'>全选</span>",
		allSelected: '全部选中',
		countSelected: '#/% 被选中',
		noMatchesFound: '无匹配项',
		styler: function () {
			return 'color: #333;';
		}
	});
})();
//通用工具
var common = {
	post:function(options){
		$.ajax({
			url: options.url,
			type:"post",
			data:options.param || {},
			dataType:"json",
			async:!options.sync,
			success: function(result){
				if(result.success){
					options.cb(result.data);
				}else{
					result.error = result.error || {};
					result.error.no = result.error.no || "未知";
					result.error.message = result.error.message || "未知错误！";
					this.dialog({"title":"错误码："+result.error.no,"content":+result.error.message});
				}
			},
			error:function(){
				this.dialog({"title":"错误","content":"请求发生错误！"});
			},
			compelete:function(){
				if(!!options.complete){
					options.complete();
				}
			}
		});
	},
	searchEcharts:function(options){
		$('#'+options.button).attr('disabled',"true");
		var myChart = echarts.init(document.getElementById(options.echarts));
		myChart.showLoading({text : '正在查询...'});
		var _options = {
			url:options.url,
			param:options.param || {},
			sync:!!options.sync,
			cb:function(data){
				myChart.clear();
				myChart.setOption(options.cb(data));
			},
			complete:function(){
				$('#'+options.button).removeattr("disabled");
				myChart.hideLoading();
				if(!!options.complete){
					options.complete();
				}
			}
		};
		this.post(_options);
	},
	dialog:function(options){
		options = options || {};
		options.title = options.title || "【未指定标题】";
		options.content = options.content || "【未指定本文】";
		$('#dialogTitle').text(options.title);
		$('#dialogContent').html("<p>" + options.content + "</p>");
		$('#cmModal').modal();
	},
	recordForm:function(id){
		window.localStorage.setItem( id, JSON.stringify(this.getForm(id)) );
	},
	loadForm:function(id){
		var _values = JSON.parse(window.localStorage.getItem(id));
		for(var _key in _values){
			console.log(_key);
			if(_values[_key] instanceof Array){
				$("[name="+_key+"]").multipleSelect('setSelects', _values[_key]);
			}else{
				$("[name="+_key+"]").val(_values[_key]);
			}
			
		};
	},
	getForm:function(id){
		var _values = $("#"+id).serializeArray();
		var values={};
		$.each(_values,function(_idx,_obj){
			if(!values[_obj.name]){
				values[_obj.name] = _obj.value;
			}else{
				if(values[_obj.name] instanceof Array){
					values[_obj.name].push(_obj.value);
				}else{
					var _temp = [values[_obj.name], _obj.value];
					values[_obj.name] = _temp;
				}
				
			}
		});
		return values;
	},
	tabs:function(id){
		$("#"+id).bind("click",function(e){
			if(e.target.id != id){
			    $.each($("#"+id+" > li"),function(i,o){
					$(o).removeClass("active");
					$("#"+$(o).attr("data-tab")).hide();
				});
				$(e.target).parent().addClass("active");
				$("#"+$(e.target).parent().attr("data-tab")).show();	
			}
		});
	}
}
