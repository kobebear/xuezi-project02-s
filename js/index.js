/****广告轮播****/
$(()=>{
	var LIWIDTH=960, moved=0, interval=500, wait=3000, timer=null;
	$.getJSON("data/index/getIndexCarousel.php",data=>{
		var html="";
		for(var c of data){
			var {href, title, img}=c;
			html+=`<li>
				<a href="${href}" title="${title}">
					<img src="${img}">
				</a>
			</li> `;
		}
		var {href, title, img}=data[0];
		html+=`<li>
			<a href="${href}" title="${title}">
				<img src="${img}">
			</a>
		</li> `;
		var $ulImgs=$("#banner>.banner-img");
		$ulImgs.html(html)
			.css("width",LIWIDTH*(data.length+1));
		var $ulIdxs=$(".indicators");
		$ulIdxs.html("<li></li>".repeat(data.length))
			.children(":first").addClass("hover");

		function move(dir){//1  -1
			dir=dir||1;
			if(moved==0&&dir==-1){
				moved=data.length;
				$ulImgs.css("left",-LIWIDTH*moved);
			}
			moved+=dir;
			$ulImgs.animate({
				left:-LIWIDTH*moved
			},interval,function(){
				if(moved==data.length){
					moved=0;
					$ulImgs.css("left",0);
				}
				$ulIdxs.children(":eq("+moved+")")
					.addClass("hover")
					.siblings().removeClass("hover");
			});
		}
		timer=setInterval(move,wait);//每等3秒，就播放一个500毫秒的动画

		$("#banner").hover(
			function(){clearInterval(timer); timer=null},
			function(){
				timer=setInterval(move,wait);
			}
		);

		$ulIdxs.on("click","li:not(.hover)",function(){
			var $li=$(this);
			moved=$li.index();
			$ulImgs.animate({ 
				left: -LIWIDTH*moved 
			},interval,function(){
				$ulIdxs.children(":eq("+moved+")")
					.addClass("hover")
					.siblings().removeClass("hover");
			});
		});

		$(".ck-right").click(function(){
			if(!$ulImgs.is(":animated"))
				move();
		});
		$(".ck-left").click(function(){
			if(!$ulImgs.is(":animated"))
				move(-1);
		})
	})
});
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/getIndexProducts.php",
		dataType:"json"
	}).then(data=>{
		var {recommended, new_arrival, top_sale}=data;
		var html="";
		var i=0;
		for(var p of recommended){
			var {title,details,price,href,pic}=p;
			if(i<2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="details">${details}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else{
				html+=`<div class="product">
          <img src="${pic}">
          <p class="name">${title}</p>
          <p class="price">¥${parseFloat(price).toFixed(2)}</p>
          <a href="${href}">查看详情</a>
        </div>`
			}
			i++;
		}
		document.querySelector("#f1>div.floor-content")
			.innerHTML=html;

		var html="";
		var i=0;
		for(var p of new_arrival){
			var {title,details,price,href,pic}=p;
			if(i<2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="details">${details}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else{
				html+=`<div class="product">
          <img src="${pic}">
          <p class="name">${title}</p>
          <p class="price">¥${parseFloat(price).toFixed(2)}</p>
          <a href="${href}">查看详情</a>
        </div>`
			}
			i++;
		}
		document.querySelector("#f2>div.floor-content")
			.innerHTML=html;

		var html="";
		var i=0;
		for(var p of top_sale){
			var {title,details,price,href,pic}=p;
			if(i<2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="details">${details}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else{
				html+=`<div class="product">
          <img src="${pic}">
          <p class="name">${title}</p>
          <p class="price">¥${parseFloat(price).toFixed(2)}</p>
          <a href="${href}">查看详情</a>
        </div>`
			}
			i++;
		}
		document.querySelector("#f3>div.floor-content")
			.innerHTML=html;
	})
});
/****楼层滚动****/
$(()=>{
	var $divLift=$("#lift"),
		  $ulLift=$("#lift>ul"),
	    $floors=$(".floor");
	$(window).scroll(function(){
		var scrollTop=document.body.scrollTop
							||document.documentElement.scrollTop;
		var offsetTop1=$("#f1").offset().top;
		if(offsetTop1<=scrollTop+innerHeight/2)
			$divLift.show();
		else
			$divLift.hide();

		$floors.each((i,f)=>{
			var $f=$(f);
			var offsetTop=$f.offset().top;
			if(offsetTop<=scrollTop+innerHeight/2){
				$ulLift.children(":eq("+i+")").addClass("hover")
					.siblings().removeClass("hover");
			}
		})

		$ulLift.children().click(function(){
			//this->li
			var $li=$(this);
			var i=$li.index();
			var offsetTop=$(".floor:eq("+i+")").offset().top;
			$("html").stop(true).animate({
				scrollTop:offsetTop
			},500);
		})
	})
})