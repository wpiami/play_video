/**
 * add by liyangli 此为工具包，主要包含公用函数
 */
// 设定默认查询时间
function doSetDate() {
	var date = new Date();
	var queryType = $("#queryType").val();
	var wdate = "";
	var dateMsg = "";
	if (queryType == "day") {
		wdate = "WdatePicker()";
		dateMsg = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
				+ date.getDate();
	} else if (queryType == "month") {
		wdate = "WdatePicker({dateFmt:'yyyy-MM'})";
		dateMsg = date.getFullYear() + "-" + (date.getMonth() + 1);
	} else {
		wdate = "WdatePicker({dateFmt:'yyyy'})";
		dateMsg = date.getFullYear();
	}
	$("#queryDate").attr("onfocus", wdate);
	$("#queryDate").val(dateMsg);
}

/**
 * 升序比较函数，通过数组排序进行用
 * 
 * @param v1
 * @param v2
 * @returns {Number}
 */
function compare(v1, v2) {
	return v1 - v2;
}

function strToJson(str) {
	return eval(str);
}

String.prototype.endWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
}

String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
}

// 日期格式 yyyy-MM-dd h:mm:ss
Date.prototype.format = function(format, args) {
	var args = args || {};
	var o = {
		"M+" : args.month || this.getMonth() + 1, // month
		"d+" : args.date || this.getDate(), // day
		"h+" : args.hour || this.getHours(), // hour
		"m+" : args.minu || this.getMinutes(), // minute
		"s+" : args.second || this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

// 校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
String.prototype.isRegisterUserName = function() {
	if (s == null || this.length == 0)
		return false;
	var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
	return patrn.test(this);
}
// 校验是否IP地址
String.prototype.isIP = function() {
	if (this.length == 0)
		return false;
	var patrn = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
	return patrn.test(this);
}

// 校验是否全由数字组成
String.prototype.isDigit = function() {
	if (this.length == 0)
		return false;
	var patrn = /^[0-9]{1,20}$/;
	return patrn.test(this);
}

String.prototype.isPort = function() {
	if (this.length == 0)
		return false;
	var patrn = /^[0-9]{1,20}$/;
	if (patrn.test(this)) {
		if (parseInt(this) >= 0 && parseInt(this) <= 65535) {
			return true;
		}
	}
	return false;
}
function SelecAllSubItems(attr_name, attr_value, checked) {
	if (checked) {
		$("[" + attr_name + "='" + attr_value + "']").attr("checked", 'true');// 全选
	} else {
		$("[" + attr_name + "='" + attr_value + "']").removeAttr("checked");// 取消全选
	}
	$("[" + attr_name + "='" + attr_value + "'][disabled]").removeAttr(
			"checked");// 还原禁用状态
}

String.prototype.trim = function() {
	return $.trim(this);
}