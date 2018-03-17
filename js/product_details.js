$(()=>{
	if(location.search!==""){
		var lid=location.search.split("=")[1];
		$.getJSON(
			"data/products/getProductById.php", //url
			"lid="+lid, //data
			success//success
		)
		function success(data){
			console.log(data);
			var {details, imgs, specs}=data;
			var {title, subtitle, price, promise, lname, os, memory, resolution, video_card, cpu, video_memory, category, disk}=details;
			document.querySelector("#show-details>h1")
				.innerHTML=title;
			document.querySelector("#show-details>h3>a")
				.innerHTML=subtitle;
			document.querySelector(
				"#show-details>div.price>div.stu-price>span"
			).innerHTML="¥"+parseFloat(price).toFixed(2);
			document.querySelector(
				"#show-details>div.price>div.promise>b"
			).innerHTML="服务承诺："+promise;

			var html="";
			for(var s of specs){
				var {lid,spec}=s;
				html+=`<a href="product_details.html?lid=${lid}" 
					class=${lid===details.lid?"active":""}
				>${spec}</a>`;
			}
			document.querySelector(
				"#show-details>div.spec>div"
			).innerHTML=html;

			document.querySelector("#param>ul").innerHTML=`<li>
				<a href="javascript:;">商品名称：${lname}</a>
			</li>
			<li><a href="javascript:;">系统：${os}</a></li>
			<li>
				<a href="javascript:;">内存容量：${memory}</a>
			</li>
			<li>
				<a href="javascript:;">分辨率：${resolution}</a>
			</li>
			<li>
				<a href="javascript:;">显卡型号：${video_card}</a>
			</li>
			<li><a href="javascript:;">处理器：${cpu}</a></li>
			<li>
				<a href="javascript:;">显存容量：${video_memory}</a>
			</li>
			<li>
				<a href="javascript:;">分类：${category}</a>
			</li>
			<li>
				<a href="javascript:;">硬盘容量：${disk}</a>
			</li>`;

			document.getElementById("product-intro")
			.innerHTML=details.details;
			//作业: 实现放大镜效果
			var mImg=document.getElementById("mImg");
			mImg.src=imgs[0].md;
			var lgDiv=document.getElementById("largeDiv");
			lgDiv.style.backgroundImage="url("+imgs[0].lg+")"
			var html="";
			for(var img of imgs){
				var {sm,md,lg}=img;
				html+=`<li class="i1">
					<img src="${sm}" data-md="${md}" data-lg="${lg}">
				</li>`
			}
			var ulImgs=document.getElementById("icon_list");
			ulImgs.innerHTML=html;
			var LIWIDTH=62;
			ulImgs.style.width=LIWIDTH*imgs.length+"px";

			var abackward=
				document.querySelector("#preview>h1>a.backward"),
				  aforward=
				document.querySelector("#preview>h1>a.forward");
			if(imgs.length<5) 
				aforward.className="forward disabled";
			var moved=0,offset=20;
			aforward.onclick=function(){
				if(this.className.indexOf("disabled")==-1){
					moved++;
					ulImgs.style.left=-LIWIDTH*moved+offset+"px";
					checkA();
				}
			}
			abackward.onclick=function(){
				if(this.className.indexOf("disabled")==-1){
					moved--;
					ulImgs.style.left=-LIWIDTH*moved+offset+"px";
					checkA();
				}
			}
			function checkA(){
				if(moved==0)
					abackward.className="backward disabled";
				else if(imgs.length-5==moved)
					aforward.className="forward disabled";
				else{
					aforward.className="forward";
					abackward.className="backward";
				}
			}

			ulImgs.onmouseover=function(e){
				var tar=e.target;
				if(tar.nodeName==="IMG"){
					mImg.src=tar.dataset.md;
					lgDiv.style.backgroundImage=
						"url("+tar.dataset.lg+")";
				}
			}

			var mask=document.getElementById("mask"),
				  sMask=document.getElementById("superMask");
			sMask.onmouseover=function(){
				mask.style.display="block";
				lgDiv.style.display="block";
			}
			sMask.onmouseout=function(){
				mask.style.display="none";
				lgDiv.style.display="none";
			}
			var MSIZE=175, MAX=175;
			sMask.onmousemove=function(e){
				var top=e.offsetY-MSIZE/2,
					  left=e.offsetX-MSIZE/2;
				if(top<0) top=0; 
				else if(top>175) top=175;
				if(left<0) left=0;
				else if(left>175) left=175;
				mask.style.left=left+"px";
				mask.style.top=top+"px";
				lgDiv.style.backgroundPosition=
					-16/7*left+"px "+(-16/7*top)+"px"
			}
		};

		var $reduce=
			$("#show-details>.account>.number-reduce");
		$reduce.click(handler);
		var $add=
			$("#show-details>.account>.number-add");
		$add.click(handler);
		function handler(){
			//this->btn
			var $btn=$(this);
			var $input=$btn.siblings("input");
			var n=parseInt($input.val());
			if($btn.html()=="+")
				n++;
			else if(n>1)
				n--;
			$input.val(n);
		}

		$("#show-details>.shops>.cart").click(function(){
			$.get("data/users/islogin.php",data=>{
				if(data.ok==1){
					var lid=location.search.split("=")[1];
					var count=
						$("#show-details>.account>input").val();
					$.get("data/cart/addCart.php",{lid,count},()=>{
						alert("加入购物车成功!");
					});
				}else{
					location.href="login.html?back="+location.href;
				}
			})
		})
	}
});