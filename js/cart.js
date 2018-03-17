$(()=>{
	var $chbAlls=$(".check-top>img,.all>span>img");
	$chbAlls.click(function(){
		var $img=$(this);
		var checkall=
			$img.attr("src").endsWith("normal.png")?1:0;
		$.get("data/cart/checkAll.php",{checkall},()=>{
			loadCart();
		})
	})
function loadCart(){
	$.getJSON("data/cart/getCart.php",items=>{
		$chbAlls.attr("src",
			items.every(item=>item.is_checked==1)?
				"img/cart/product_true.png":
				"img/cart/product_normal.png"
		);

		var html="";
		var total_count=0;
		var total=0;
		for(var item of items){
			var {
				iid, product_id, title, price, count, spec, is_checked, sm
			}=item;
			if(is_checked==1){
				total+=price*count;
				total_count+=parseInt(count);
			}
			html+=`<div class="imfor">
				<div class="check">
					<img src="img/cart/product_${is_checked==0?'normal':'true'}.png" data-iid="${iid}" alt="">
				</div>
				<div class="product">
					<a href="product_details.html?lid=${product_id}">
						<img src="${sm}" alt="">
					</a>
					<span class="desc">
						<a href="product_details.html?lid=${product_id}">${title}</a>
					</span>
					<p class="col">
						<span>规格：</span>
						<span class="color-desc">${spec}</span>
					</p>
				</div>
				<div class="price">
					<p class="price-desc">阿甲专享价</p>
					<p>
						<b>¥</b>${parseFloat(price).toFixed(2)}
					</p>
				</div>
				<div class="num">
					<span class="reduce" data-iid="${iid}">&nbsp;-&nbsp;</span>
					<input type="text" value="${count}">
					<span class="add" data-iid="${iid}">&nbsp;+&nbsp;</span>
				</div>
				<div class="total-price">
					<span>¥</span>
					<span>${(price*count).toFixed(2)}</span>
				</div>
				<div class="del">
					<a href="#" data-iid="${iid}">删除</a>
				</div>
			</div>`;
		}
		$("#content-box-body").html(html);
		$(".totalPrices,.foot-price").html("¥"+total.toFixed(2));
		$(".total,.totalOne").html(total_count);

	});
}
$.getJSON("data/users/islogin.php",data=>{
	if(data.ok==1){
		loadCart();
		$("#content-box-body").on("click",
			".imfor>.check>img,.reduce,.add,.del>a",
			function(e){
			e.preventDefault();
			var $tar=$(this);
			if($tar.is("img")){
				var iid=$tar.data("iid");
				var checked=
					$tar.attr("src").endsWith("normal.png")?1:0;
				$.get("data/cart/check.php",{iid,checked},()=>{
					loadCart();
				});
			}else if($tar.is("a")){
				var iid=$tar.data("iid");
				$.get("data/cart/deleteOne.php",{iid},()=>{
					loadCart();
				})
			}
		});
		$("#box>.foot>.base>a").click(function(){
			$.get("data/cart/deleteChecked.php",()=>{
				loadCart();
			})
		});
		
	}else{
		location.href="login.html?back="+location.href;
	}
});

});