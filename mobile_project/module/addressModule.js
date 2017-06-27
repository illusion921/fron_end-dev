function debounce(func,wait){
	var timeId = null;    //将timeId设为null
	//产生一个闭包
	return function(){
		console.log(this);
		var _self = this;   //将当前调用对象保存在_self中  $('#address_search')

		clearTimeout(timeId);  //每当input发生变化时，调用debounce函数，执行到此处的时候，将timeId置为空
		timeId = setTimeout(function(){
			func.call(_self);  //调用某一个对象的方法，替换当前的方法，这里是指将当前this指向替换为_self
			//apply(thisObj[, argArray])  两个参数，第一个参数是必需的，第二个参数为传入方法的参数，一个参数也必须写成数组的形式
			//call(thisObj[, arg1[, arg2[, [,...argN]]]]) call传入的方法参数可以为多个，var a1 = add.call(sub,4,2);
		},wait || 300);   //每隔300毫秒，执行一次函数func
	}
};
var addressModule = {
	name: '地址搜索页',
	dom: $('#address'),
	init: function(){
		this.bindEvent();

	},
	bindEvent: function(){
		//绑定事件
		this.loadList();
		$('#address_search').click(function(event){
			var addressList = '';
			var inputAdress = $('#input_address').val();
			$.ajax({
				url: "https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby",
				type: "GET",
				data:{
					keyword: inputAdress,
					offset: 0,
					limit: 20,
				},
				success: function(rev){
					for(i=0;i<rev.length;i++){
						addressList +=`<li><a href="#rlist-${rev[i].latitude}-${rev[i].longitude}">${rev[i].name}</a></li>`;
					}
					$('#address_list').html(addressList);
				},
				error: function(){
					console.log("error");
				}
			})
		})
			
		
	},
	loadList: function(){
		$('#input_address').on("input",debounce(function(e){
			var _self = this;  //this 代表绑定的input事件
			$.ajax({
				url: "https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby",
				type: "GET",
				data:{
					keyword: $(_self).val(),
					offset: 0,
					limit: 20,
				},
				success: function(rev){
					var addressList = '';
					for(i=0;i<rev.length;i++){
						addressList += `<li><a href="#rlist-${rev[i].latitude}-${rev[i].longitude}">${rev[i].name}</a></li>`;
					}
					$('#address_list').html(addressList);
				},
				error: function(){
					console.log("error");
				}
			})
		}))
	},
	enter: function(){
		this.dom.show();
	},
	leave: function(){
		this.dom.hide();
	},
}