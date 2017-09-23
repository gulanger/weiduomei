//定义组件
// 首页组件
var Home = {
	template:"#home",
	// 绑定数据
	data:function(){
		return{
			menu:[
				{id:"home",text:"首页"},
				{id:"fenlei",text:"分类"},
				{id:"shop",text:"购物车"},
				{id:"login",text:"我的"}
			],
			carousel:[],
			carousel1:false,
			list:[],
			xiangqing:[],
			renqi:[],
		}
	},
	// 定义事件回调函数
	methods:{
		// 点击返回按钮回到顶部
		goBack:function(){
			window.scrollTop = 0
		}
		
	},
	// 组件创建完成 请求数据
	created:function(){
		this.$http.get("data/shouye.json").then(function(res){
			// 请求成功，存储数据
			if(res.data.errno === 0){
				this.carousel = res.data.data.carousel;
				this.list = res.data.data.list
				this.xiangqing = res.data.data.xiangqing
				this.renqi = res.data.data.renqi
			}
		})
	},
	updated:function () {
       if(!this.carousel1 && this.carousel.length != 0){
           this.carousel1 = new Swipe("#carousel",{
               auto:true,
               speed:3000
              
           });
           this.carousel1.init();
       }
    }
}
// 分类组件
var Fenlei = {
	template:"#fenlei",
	data:function(){
		return{
			list:[],
			srdg:[],
			menu:[
				{id:"home",text:"首页"},
				{id:"fenlei",text:"分类"},
				{id:"shop",text:"购物车"},
				{id:"login",text:"我的"}
			]
		}
	},
	// 创建组件完成，请求数据
	created:function(){
		this.$http.get("data/fenlei.json").then(function(res){
			// 请求成功，存储数据
			if(res.data.errno === 0){
				this.list = res.data.data.list;
				this.srdg = res.data.data.srdg
			}
		})
	}
}
// 购物组件
var Shop = {
	template:"#shop",
	data:function(){
		return{
			menu:[
				{id:"home",text:"首页"},
				{id:"fenlei",text:"分类"},
				{id:"shop",text:"购物车"},
				{id:"login",text:"我的"}
			]
		}
	}
}
// 用户中心组件
var Login = {
	template:"#login",
	data:function(){
		return{
			menu:[
				{id:"home",text:"首页"},
				{id:"fenlei",text:"分类"},
				{id:"shop",text:"购物车"},
				{id:"login",text:"我的"}
			],
			istrue : false
		}
	},
	methods:{
		xiaoshi:function(){
			this.istrue = !this.istrue
		}
	}
	
}
// 蛋糕组件
var Dangao = {
	template:"#dangao",
	// 绑定数据
	data:function(){
		return {
			list:[],
			menu:[
				{id:"home",text:"首页"},
				{id:"fenlei",text:"分类"},
				{id:"shop",text:"购物车"},
				{id:"login",text:"我的"}
			],
			fenleir:['不限','天然奶油蛋糕','法式蛋糕','乳酪蛋糕','慕斯蛋糕','巧克力风味蛋糕','大型庆典蛋糕'],
			kouweir:['巧克力口味','水果口味','天然奶油口味','芝士口味','慕斯口味'],
			changjingr:['祝福','爱情','童趣','友情','祝寿','宴会'],
			isFenlei:false,
			isKouwei:false,
			isChangjing:false,
		}
	},
	// 创建组件完成，请求数据
	created:function(){
		this.$http.get("data/dangao.json").then(function(res){
			// 请求成功存储数据
			if(res.data.errno === 0){
				this.list = res.data.data.list
			}
		})
	},
	methods:{
		fenlei:function(){
			this.isFenlei = !this.isFenlei,
			this.isKouwei = false,
			this.isChangjing = false
		},
		kouwei:function(){
			this.isKouwei = !this.isKouwei,
			this.isFenlei = false,
			this.isChangjing = false
		},
		changjing:function(){
			this.isChangjing = !this.isChangjing,
			this.isFenlei = false,
			this.isKouwei = false
		},
		xiaoliang:function(){
			this.isFenlei = false,
			this.isKouwei = false,
			this.isChangjing = false
		}
	}
}
//面包列表组件
var Mianbao = {
	template:"#mianbao",
	// 绑定数据
	data:function(){
		return {
			nav:[],
			menu:[
				{id:"/home",text:"首页"},
				{id:"/fenlei",text:"分类"},
				{id:"/shop",text:"购物车"},
				{id:"/login",text:"我的"}
			]
		}
	},
	// 请求导航的数据
	created:function(){
		this.$http.get("data/liebiao.json").then(function(res){
			//请求成功存储数据
			if(res.data.errno === 0){
				this.nav = res.data.data
			}
		})
	}
}
//面包详情组件
var Food = {
	template:"#tpl_food",
	// 绑定数据
	data:function(){
		return {
			list:[],
			// 缓存所有的数据
			all:{}
			
		}
	},
	// 定义事件回调函数
	methods:{
		// 更新item的值，增加数量
		add:function(item){
			item.num++
		},
		reduce:function(item){
			item.num--
		}
	},
	// 请求数据
	created:function(){
		var id = this.$route.params.foodId || 01
		this.$http.get("data/" + id + ".json").then(function(res){
			// 请求数据成功 保存数据
			if(res.data.errno === 0){
				this.list = res.data.data;
				// 缓存数据
				this.all[id] = res.data.data;
			}

		})
	},
	// 监听实例化对象上的属性的变化
	watch:{
		"$route":function(){
			// 请求新的数据
			var id = this.$route.params.foodId || "01"
			// 判断数据是否在缓存中存在，如果不在就发送新的请求
			if(!this.all[id]){
				this.$http.get("data/" + id + ".json").then(function(res){
					// 请求成功保存数据
					if(res.data.errno === 0){
						this.list = res.data.data;
					}
				})
			}else{
				// 如果缓存中有，直接读取缓存
				this.list = this.all[id]
			}
		}
	}
}
// 配送组件
var Peisong = {
	template:"#peisong"
}
// 货卡组件
var Huoka = {
	template:"#huoka"
}
//第一步 定义规则
var routes = [
	
		{
			path:"/home",
			component:Home,
		},
		{
			path:"/fenlei",
			component:Fenlei
		},
		{
			path:"/shop",
			component:Shop
		},
		{
			path:"/login",
			component:Login
		},
		{
			path:"/dangao",
			component:Dangao
		},
		{
			path:"/mianbao",
			component:Mianbao,
			// 子路由
			children:[
				{
					path:"food/:foodId",
					component:Food
				}

			]
		},
		{
			path:"*",
			redirect:"/home"
		}
	]

	
	

// 定义store
// var store = new Vuex.Store({
// 	// 定义状态数据
	
// })
//第二步 实例化
var router = new VueRouter({
	routes:routes
})
// 第三步 注册
var app = new Vue({
	el:"#app",
	// 注册路由
	router:router,
	// 注册store
	// store:store

})