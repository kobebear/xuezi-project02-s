$(function(){
	function loadPage(pageNo){
		pageNo=pageNo||0;
		var search=location.search;
		if(search!==""){
			var kw=search.split("=")[1];
			$.ajax({
				url:hostAddress+"/data/products/getProductsByKw.php",
				type:"get",
				data:"kw="+kw+"&pno="+pageNo,
				dataType:"jsonp",
				beforeSend:function(xhr){
					console.log(
						"向data/products/getProductsByKw.php发送请求");
					console.log(xhr);//network
				},
				complete:function(xhr){
					console.log("向data/products/getProductsByKw.php发送请求...完成");
					console.log(xhr);
				},
				success:function(data){
					console.log("向data/products/getProductsByKw.php发送请求...成功");
					data=eval("("+data+")");
					var plist=data.plist,html="";
					for(var i=0;i<plist.length;i++){
						var p=plist[i];
						var lid=p.lid,md=p.md,price=p.price,title=p.title;
						html+=[
		'<li>',
			'<a href="product_details.html?lid='+lid+'">',
				'<img src="'+md+'" alt="">',
			'</a>',
			'<p>',
				'<span class="price">',
					"¥"+parseFloat(price).toFixed(2),
				'</span>',
				'<a href="product_details.html?lid='+lid+'">'+title+'</a>',
			'</p>',
			'<div>',
				'<span class="reduce">-</span>',
				'<input type="text" value="1">',
				'<span class="add">+</span>',
				'<a href="javascript:;" class="addCart" data-lid="'+lid+'">加入购物车</a>',
			'</div>',
		'</li>'	].join("");
					}
					$("#show-list").html(html);
					var count=data.count,
							pageSize=data.pageSize,
							pageCount=data.pageCount,
							pageNo=parseInt(data.pageNo);
					html='<a href="javascript:;" class="previous">上一页</a>';
					for(var i=1;i<=pageCount;i++){
						if(i==pageNo+1)
							html+='<a href="javascript:;" class="current">'+i+'</a>';
						else
							html+='<a href="javascript:;">'+i+'</a>';
					}
					html+='<a href="javascript:;" class="next">下一页</a>';
					
					$pages.html(html);
					console.log(pageNo,pageCount);
					if(pageNo==0) 
						$pages.children(":first").addClass("disabled");
					if(pageNo==pageCount-1)
						$pages.children(":last").addClass("disabled");
				},
				error:function(xhr,err){
					console.log("向data/products/getProductsByKw.php发送请求...失败");
					console.log(err)
					console.log(xhr);
				}
			})
		}
	}
	function loadCart(){
		$.getJSON("data/users/islogin.php",data=>{
			if(data.ok==1){
				$.getJSON("data/cart/getCart.php",items=>{
					var html="";
					var total=0;
					for(var item of items){
						var {iid,title,count,price}=item;
						total+=price*count;
						html+=`<div class="item">
							<span title="${title}">${title}</span>
							<div>
								<span class="reduce" data-iid="${iid}">-</span>
								<input type="text" value="${count}">
								<span class="add" data-iid="${iid}">+</span>
							</div>
							<p>
								<span>¥${(price*count).toFixed(2)}</span>	
							</p>
						</div>`;
					}
					$("#cart>.cart_content").html(html);
					$("#total").html(total.toFixed(2));
			  })
			}
		});
	}
	var hostAddress=
		"http://127.0.0.1/dd/PROJECT/xuezi-project02-s";
	var $pages=$("#pages");
	$pages.on("click","a:not(.disabled,.current)",function(){
		//this->a
		var $a=$(this);
		if($a.is(".previous"))
			loadPage($("#pages>a.current").html()-2);
	  else if($a.is(".next"))
			loadPage($("#pages>a.current").html());
		else
			loadPage($a.html()-1);
	});
	loadPage();
	loadCart();
	$("#show-list").on("click",".reduce,.add,.addCart",function(){
		var $btn=$(this);
		if($btn.is(".addCart")){
			$.getJSON("data/users/islogin.php",data=>{
				if(data.ok==1){
					var lid=$btn.data("lid");
					var count=$btn.siblings("input").val();
					$.get("data/cart/addCart.php",{lid,count},()=>{
						alert("加入购物车成功!");
						loadCart();
					})
				}else{
					location.href="login.html?back="+location.href;
				}
			})
		}else{
			var $input=$btn.siblings("input");
			var n=parseInt($input.val());
			if($btn.html()=="+")
				n++;
			else if(n>1)
				n--;
			$input.val(n);
		}
	});

	$("#cart>.cart_content").on("click",".reduce,.add",function(){
		//this->span
		var $span=$(this);
		var n=parseInt($span.siblings("input").val());
		if($span.is(".add"))
			n++;
		else
			n--;
		$.get(
			"data/cart/updateCart.php",
			{
				iid:$span.data("iid"),
				count:n
			},
		).then(()=>{
			loadCart();			
		})
	})
})