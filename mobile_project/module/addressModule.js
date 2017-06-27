function debounce(func,wait){
	var timeId = null;
	return function(){
		console.log(this);
		var _self = this;

		clearTimeout(timeId);
		timeId = setTimeout(function(){
			func.call(_self);
		},wait || 300);
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
						addressList += "<li>" + rev[i].name + "</li>";
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
						addressList += "<li>" + rev[i].name + "</li>";
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