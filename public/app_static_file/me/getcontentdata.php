<?
$dmText="";
$t=$_REQUEST['t'];
include_once('g_detail_id.php');
if(array_key_exists($t, $detail_fileid) ){
	include_once('gapc_config.php');
	$slideimg_id=$detail_fileid[$t];
	$dmText=readtxt($slideimg_id,$client);
}else{
	$url="http://202.175.185.186/mbcapp/GetContentData.php?t=".$_REQUEST['t'];
	$dmText = file_get_contents($url,false);
}
echo $dmText;
?>
</table>
	</center>
</body>
</html>

