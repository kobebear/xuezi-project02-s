$("input:button").click(function(){
	$.post(
		"data/users/signin.php",
		{
			uname:$("#txtName").val(),
			upwd:$("#txtPwd").val()
		}
	).then(data=>{
		var search=location.search;
		if(search!==""){
			var i=search.indexOf("=");
			location.href=search.slice(i+1);
		}else{
			location.href="index.html";
		}
	})
})