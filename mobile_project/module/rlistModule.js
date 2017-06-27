var rlistModule = Object.create(addressModule);
rlistModule = $.extend(rlistModule,{
    name: '商家列表页',
    dom: $('#rlist'),
    bindEvent: function(){
        
    },
    loadList: function(hkey){
        //加载商家列表页
        var sellerHash = hkey.split('-');
        var latitude = sellerHash[1];  //经度
        var longitude = sellerHash[2];  //纬度
        $.ajax({
            url: "https://mainsite-restapi.ele.me/shopping/restaurants",
            data: {
                latitude: latitude,
                longitude: longitude,
                offset: 0,
                limit: 20,
                extras: ["activities"],
                terminal: "h5",
            },
            success: function(rev){
                var sellerList = "";
                for(i=0; i<rev.length; i++){
                    sellerList += `<li>${rev[i].name}</li>`;
                }
                $('#sellerList').html(sellerList);
            },
            error: function(){
                console.log("sellerlist error");
            }
        })
    }
})