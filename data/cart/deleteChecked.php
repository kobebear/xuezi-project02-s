<?php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	$sql="delete from xz_shoppingcart_item where user_id=$uid and is_checked=1";
	mysqli_query($conn,$sql);
}