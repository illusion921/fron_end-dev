/*//入口文件
//监听hash值得变化
function init(){
	var hash = location.hash || '#address';
	var dom = $(hash);
	dom.show();
	dom.siblings().hide();
}
init();
window.onhashchange = function(){
	init();
}*/

//路由
var hashModuleMap = {
	address: addressModule,
	rlist: rlistModule,
	search: searchModule,
	detail: detailModule
};
var prePage = null;
var currentPage = null;
function routeControll(){
	var hKey = location.hash.slice(1) || 'address';
	var page = hashModuleMap[hKey];
	prePage = currentPage;
	currentPage = page;	//将当前页面的map关系保存下来，当下一个特面切换时，将值赋给prePage
	if (prePage) {
		prePage.leave();
	}
	page.enter();
	page.init();
}
routeControll();

window.onhashchange = function(){
	routeControll();
}