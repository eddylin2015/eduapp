<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>mbc 2017-2018 sport</title>
  </head>
  <script src=drimg.js></script>
  <script src=randgetone.js></script>
  <link type="text/css" href="sp.css" rel="stylesheet" />	
  <script src=sp.js></script>
<body>
 <span class=header_fixed000>2017~2018校運會 </span>
 <br>
 <form id=formid action=postres method=post>
 <table id=login_forom>
 <tr><td>校內編號:<td><input name=cname size=10 id=cname><input type=hidden name=appt value=SCC>
 <tr><td>教青局編號前7位數字:<td><input type=password size=10 name=fno id=fno></td>
 <tr><td colspan=2><article width=400 height=150 ></article>
 <tr><td>輸入以上5位數字:<td><input name=fimg size=10 id=fimg></td>
 <tr><td><td><input type=button onclick='login();' class="button" value=Login></td>
<td><input type=button onclick='logout();' class="button" value=Logout></td>
 </table>
 <DIV id=studbaseinfo>
 <table>
 <tr><td>姓名<td><div id=studinfo></div>
 <tr><td>班別<td><div id=classinfo></div>
 <tr><td>組別<td>
 <select id=GROUP_Name name=GROUP_Name OnChange='GroupName_Change();' disabled>
 <option value=-1>---</option>
 <option value=0>男A</option>
 <option value=1>男B</option>
 <option value=2>男C</option>
 <option value=3>男D</option>
 <option value=8>男E</option>
 <option value=4>女A</option>
 <option value=5>女B</option>
 <option value=6>女C</option>
 <option value=7>女D</option>
 <option value=9>女E</option>
 <option value=11>男A</option>
 <option value=12>男B</option>
 <option value=13>男C</option>
 <option value=14>男D</option>
 <option value=15>男E</option>
 <option value=21>女A</option>
 <option value=22>女B</option>
 <option value=23>女C</option>
 <option value=24>女D</option>
 <option value=25>女E</option>
 
 </select>
  <span onclick='change_group_edit();'>edit</span>
 </tr>
 </table>
請選:(註:選 一 至 三 項比賽項目 , 只可提交兩次. )
<table width=100%>
<tr id=tr_0><td><input name=fchk id=chk_0 type=checkbox onclick='clickimg(0);' value='v_0'><td class=td0>--- <td><canvas class=spitem  id=img_0 onclick='clickimg(0);'  width='100' height='101'></tr>
<tr id=tr_1><td><input name=fchk id=chk_1 type=checkbox onclick='clickimg(1);' value='v_1'><td class=td0>50M <td><canvas class=spitem  id=img_1 onclick='clickimg(1);'  width='100' height='101'></tr>
<tr id=tr_2><td><input name=fchk id=chk_2 type=checkbox onclick='clickimg(2);' value='v_2'><td class=td0>60M <td><canvas class=spitem  id=img_2 onclick='clickimg(2);'  width='100' height='101'></tr>
<tr id=tr_3><td><input name=fchk id=chk_3 type=checkbox onclick='clickimg(3);' value='v_3'><td class=td0>100M <td><canvas class=spitem  id=img_3 onclick='clickimg(3);'  width='100' height='101'></tr>
<tr id=tr_4><td><input name=fchk id=chk_4 type=checkbox onclick='clickimg(4);' value='v_4'><td class=td0>200M <td><canvas class=spitem  id=img_4 onclick='clickimg(4);'  width='100' height='101'></tr>
<tr id=tr_5><td><input name=fchk id=chk_5 type=checkbox onclick='clickimg(5);' value='v_5'><td class=td0>400M <td><canvas class=spitem  id=img_5 onclick='clickimg(5);'  width='100' height='101'></tr>
<tr id=tr_6><td><input name=fchk id=chk_6 type=checkbox onclick='clickimg(6);' value='v_6'><td class=td0>800M <td><canvas class=spitem  id=img_6 onclick='clickimg(6);'  width='100' height='101'></tr>
<tr id=tr_7><td><input name=fchk id=chk_7 type=checkbox onclick='clickimg(7);' value='v_7'><td class=td0>1000M <td><canvas class=spitem  id=img_7 onclick='clickimg(7);'  width='100' height='101'></tr>
<tr id=tr_8><td><input name=fchk id=chk_8 type=checkbox onclick='clickimg(8);' value='v_8'><td class=td0>1500M <td><canvas class=spitem  id=img_8 onclick='clickimg(8);'  width='100' height='101'></tr>
<tr id=tr_9><td><input name=fchk id=chk_9 type=checkbox onclick='clickimg(9);' value='v_9'><td class=td0>3000M <td><canvas class=spitem  id=img_9 onclick='clickimg(9);'  width='100' height='101'></tr>
<tr id=tr_10><td><input name=fchk id=chk_10 type=checkbox onclick='clickimg(10);' value='v_10'><td class=td0>5000M <td><canvas class=spitem  id=img_10 onclick='clickimg(10);'  width='100' height='101'></tr>
<tr id=tr_11><td><input name=fchk id=chk_11 type=checkbox onclick='clickimg(11);' value='v_11'><td class=td0>60米欄 <td><canvas class=spitem  id=img_11 onclick='clickimg(11);'  width='100' height='101'></tr>
<tr id=tr_12><td><input name=fchk id=chk_12 type=checkbox onclick='clickimg(12);' value='v_12'><td class=td0>80米欄 <td><canvas class=spitem  id=img_12 onclick='clickimg(12);'  width='100' height='101'></tr>
<tr id=tr_13><td><input name=fchk id=chk_13 type=checkbox onclick='clickimg(13);' value='v_13'><td class=td0>100米欄 <td><canvas class=spitem  id=img_13 onclick='clickimg(13);'  width='100' height='101'></tr>
<tr id=tr_14><td><input name=fchk id=chk_14 type=checkbox onclick='clickimg(14);' value='v_14'><td class=td0>110米欄 <td><canvas class=spitem  id=img_14 onclick='clickimg(14);'  width='100' height='101'></tr>
<tr id=tr_15><td><input name=fchk id=chk_15 type=checkbox onclick='clickimg(15);' value='v_15'><td class=td0>4x50M <td><canvas class=spitem  id=img_15 onclick='clickimg(15);'  width='100' height='101'></tr>
<tr id=tr_16><td><input name=fchk id=chk_16 type=checkbox onclick='clickimg(16);' value='v_16'><td class=td0>4x100M <td><canvas class=spitem  id=img_16 onclick='clickimg(16);'  width='100' height='101'></tr>
<tr id=tr_17><td><input name=fchk id=chk_17 type=checkbox onclick='clickimg(17);' value='v_17'><td class=td0>4x400M <td><canvas class=spitem  id=img_17 onclick='clickimg(17);'  width='100' height='101'></tr>
<tr id=tr_18><td><input name=fchk id=chk_18 type=checkbox onclick='clickimg(18);' value='v_18'><td class=td0>跳高 <td><canvas class=spitem  id=img_18 onclick='clickimg(18);'  width='100' height='101'></tr>
<tr id=tr_19><td><input name=fchk id=chk_19 type=checkbox onclick='clickimg(19);' value='v_19'><td class=td0>跳遠 <td><canvas class=spitem  id=img_19 onclick='clickimg(19);'  width='100' height='101'></tr>
<tr id=tr_20><td><input name=fchk id=chk_20 type=checkbox onclick='clickimg(20);' value='v_20'><td class=td0>三級跳遠 <td><canvas class=spitem  id=img_20 onclick='clickimg(20);'  width='100' height='101'></tr>
<tr id=tr_21><td><input name=fchk id=chk_21 type=checkbox onclick='clickimg(21);' value='v_21'><td class=td0>壘球 <td><canvas class=spitem  id=img_21 onclick='clickimg(21);'  width='100' height='101'></tr>
<tr id=tr_22><td><input name=fchk id=chk_22 type=checkbox onclick='clickimg(22);' value='v_22'><td class=td0>鉛球 <td><canvas class=spitem  id=img_22 onclick='clickimg(22);'  width='100' height='101'></tr>
<tr height=100>
<td>__
</table>
 <div class=fixposi>
 <table class=m0 style="border-collapse: collapse;">
 <tr class=m0><td  class=m0 colspan=4>
選項(<span id=pic_cnt>0</span>):
<tr class=m0>
 <td width=10% class=m0>
 <canvas width="80" height="70" id=pv_0 class=spitem>
 <td width=10% class=m0>
 <canvas width="80" height="70" id=pv_1 class=spitem>
 <td width=10% class=m0>
 <canvas width="80" height="70" id=pv_2 class=spitem>
  <td width=10% class=m0>
 <input type=button  class="button" value="提交/submit" onclick='btn_submit();'>
 </tr>
 </table>
 </DIV>
 </div>
 </form>
 <div id=msgbox class="center">
  <p><b>信息: </b><span id=msgbox_txt></span></p>
  <button onclick="close_msgbox('msgbox')">OK</button>
</div>

<script>
/////////////////////
close_msgbox('msgbox');
close_msgbox('studbaseinfo');
//////////////////
for(i=0;i<23;i++)
{
document.getElementById('tr_'+i).style.display = "none";
}
imageObj.onload = function() {
       for(_i0=0;_i0<ITEM_Name.length;_i0++){
       Show_SPITEM_ICON(this,"img_"+_i0,_i0,85);
	}         
};
 // dataURL='spitems.jpg';
 // dataURL='https://f3bf4773-a-62cb3a1a-s-sites.googlegroups.com/site/mbc60th2016/spitems.jpg?attachauth=ANoY7cq7IOjQW6prR9mCc5dIDJKARlfqYmU9lH8XLWGQFhZzKbwfsxuBiz8q0KObHgPovMQ4Bw0s77xED8b1bKcXfLppN4DkvGreTHhf8YfaHO0nE6m0N8ukLYjOeT8U7yr09fAIalPVcUl6LFc9axlne9kAMV05rJAo3S9JTpgfbPgE-rPvh3B99i7iLbFBChrfP4ZWlUhaqskgCwlUhVcXc2KUfeRvCQ%3D%3D&attredirects=0';
 dataURL='https://f3bf4773-a-62cb3a1a-s-sites.googlegroups.com/site/mbc60th2016/spitems.jpg?attachauth=ANoY7cpsfue_5VXknSyd7osPnBd35gJ2ycQffsWI7Sm0E1Pc9VDTjApCLd4W5F5DJUyDvDvY7DvIeeQ9_lPVQN3UnILJGR3DRxOfg0yKi50XNMjfopGv727omxn3G4hNnjt6c6B1rVpZVnfaYiXS_KFPl3z3RizQocn3-cx8R_LNv5N6DDhd1KeXhri8FT_tDQrV3u_EgsT-cUaGgvvNHAWdPQUpmXB4XA%3D%3D&attredirects=0';
  imageObj.src = dataURL;
 		for(temp_i=0;temp_i<ITEM_Name.length;temp_i++){
			if(document.getElementById("chk_"+temp_i).checked)
			{	Add_Ans(temp_i);	}
		}
//////////
App.init();
//////////
 </script>
  </body>
</html>

