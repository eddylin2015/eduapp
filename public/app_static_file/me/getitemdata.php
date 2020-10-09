<?
$type_fileid=array(
		"slideimg"=>"0B7AnI_rdMN75OWlYLTJQVzRwQ0k",
		"news"  =>"0B7AnI_rdMN75OV9ZSW5vbmJmSXc",
		"sw"    =>"0B7AnI_rdMN75RVFrRDd6bmZ1Rlk",
		"act"   =>"0B7AnI_rdMN75NFhyaFp0SjNfbTA",
		"moral7"=>"0B7AnI_rdMN75UGZiSHBNckt6MUk",
		"moral6"=>"0B7AnI_rdMN75Z19CZjBoUUJUQzg",
		"moral5"=>"0B7AnI_rdMN75S3RrMUhDbjZYS2M",
		"moral4"=>"0B7AnI_rdMN75SVRlWUw4MU4wVzA",
		"moral3"=>"0B7AnI_rdMN75VE1JUUNsdzhKSzQ",
		"moral1"=>"0B7AnI_rdMN75ZXpPUlVGUDRHYk0",
		"moral2"=>"0B7AnI_rdMN75ZE1HTHQ4bVRzdkE",
		"moral9"=>"0B7AnI_rdMN75RmdWbXlKWmg0a0E",
		"moral8"=>"0B7AnI_rdMN75czlUT0NUakNXTU0",
		"morala"=>"0B7AnI_rdMN75UktvTU1fY3JQZms");
$t=$_REQUEST['t'];
$dmText ="";

	include_once('gapc_config.php');
	$slideimg_id=$type_fileid[$t];
	$dmText=readtxt($slideimg_id,$client);
	echo $dmText;

?>
