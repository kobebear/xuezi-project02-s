$(()=>{
//	var link=document.createElement("link");
//	link.rel="stylesheet";
//	link.href="css/footer.css";
//	document.head.appendChild(link);
	$(`<link rel="stylesheet" href="css/footer.css">`)
		.appendTo(document.head);
//	ajax({
//		type:"get",
//		url:"footer.html"
//	})//return Promise()
//			//open(xhr.responseText)
//	.then(html=>{
//		document.getElementById("footer").innerHTML=html;
//	});
	$("#footer").load("footer.html");
});