<?php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$checkAll=$_REQUEST["checkall"];
if($uid!=null&&$checkAll!=null){
	$sql="update xz_shoppingcart_item set is_checked=$checkAll where user_id=$uid";
	mysqli_query($conn,$sql);
}