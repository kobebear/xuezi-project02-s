$(()=>{ //DOM内容加载后自动执行
//	var link=document.createElement("link");
//	link.rel="stylesheet";
//	link.href="css/header.css";
//	document.head.appendChild(link);
	$(`<link rel="stylesheet" href="css/header.css">`)
		.appendTo(document.head);
//	ajax({
//		type:"get",
//		url:"header.html"
//	})//return Promise()
//			//open(xhr.responseText)
//	.then(html=>{
//		document.getElementById("header").innerHTML=html;
//	});
  $("#header").load("header.html",function(){
		//读取location中的search
		var search=location.search;
		//如果search中包含"kw="变量
		if(search.indexOf("kw=")!=-1)
			//则读取kw变量的值，保存到文本框中
			$("#txtSearch")
				.val(decodeURI(search.split("=")[1]));

		$("#top-input>a[data-trigger=search]")
			.click(function(){
			var kw=$("#txtSearch").val().trim();
			if(kw.length!=0)
				location.href="products.html?kw="+kw;
		});

		$("#txtSearch").keyup(function(e){
			if(e.keyCode==13)
				$("#top-input>a[data-trigger=search]").click();
		});

		$.getJSON("data/users/islogin.php",data=>{
			if(data.ok==0){
				$("#loginList").show().next().hide();
			}else{
				$("#loginList").hide()
					.next().show()
					.find("#uname").html(data.user.user_name);
			}
		});
		
		$("#welcomeList>li:last>a").click(function(){
			$.get("data/users/signout.php",()=>{
				location.reload(true);
			})
		})

		$("#loginList>li:last>a").click(function(e){
			e.preventDefault();
			location.href="login.html?back="+location.href;
		})
	});
});