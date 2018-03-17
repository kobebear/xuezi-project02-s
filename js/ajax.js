function ajax({type,url,data,dataType}){
	return new Promise(open=>{
		var xhr=new XMLHttpRequest();//1.创建Xhr
		xhr.onreadystatechange=function(){//2.绑定事件
			if(xhr.readyState==4&&xhr.status==200){
				if(dataType==="json")
					open(JSON.parse(xhr.responseText));
				else
					open(xhr.responseText);
			}
		}
		if(type==="get"){//3.拼接参数，打开连接
			url+="?"+data;//username=zhangdong&upwd=123456
		}
		xhr.open(type,url,true);
		//4.发送请求
		if(type==="get")//如果是get
			xhr.send(null);
		else//否则
			xhr.send(data);
	})
}