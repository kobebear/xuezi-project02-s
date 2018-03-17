<?php
//data/products/getProductsByKw.php
//header("Content-Type:application/json");
require_once("../init.php");
@$callback=$_REQUEST["callback"];
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
if($pno==null)
	$pno=0;
$output=[
	"count"=>0, //查询结果商品数量
	"pageSize"=>9, //每页商品数量
	"pageCount"=>0, //总页数=count/pageSize 上取整
	"pageNo"=>$pno, //当前第几页, 从0开始
	"plist"=>[]  //商品列表
];
if($kw!=null){
	$sql="SELECT lid, title, price, (select md from xz_laptop_pic where laptop_id=lid limit 1) as md FROM `xz_laptop` ";
	//$kw:  macbook air 128g
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){
	//title like '%macbook%' and title like '%air%' and ...
		$kws[$i]=" title like '%$kws[$i]%' ";
	}
	//where ...
	$sql.=" where ".implode(" and ",$kws);
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["count"]=count($products);
	$output["pageCount"]=
		ceil($output["count"]/$output["pageSize"]);
  $sql.=" limit ".
		    $output["pageNo"]*$output["pageSize"].
		    ",".
				$output["pageSize"];
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["plist"]=$products;
	echo "$callback('".json_encode($output)."')";
	     //callback('json')
}
