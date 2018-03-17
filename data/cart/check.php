<?php
//data/cart/check.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$checked=$_REQUEST["checked"];
if($iid!=null&&$checked!=null){
	$sql="update xz_shoppingcart_item set is_checked=$checked where iid=$iid";
	mysqli_query($conn,$sql);
}