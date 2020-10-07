/**
1	50M
2	60M
3	100M
4	200M
5	400M
6	800M
7	1000M
8	1500M
9	3000M
10	5000M
11	60米欄
12	80米欄
13	100米欄
14	110米欄
15	4x50M
16	4x100M
17	4x400M
18	跳高
19	跳遠
20	三級跳遠
21	壘球
22	鉛球
**/
var ITEM_Name=[
"---","50M","60M","100M","200M","400M","800M","1000M","1500M","3000M","5000M","60米欄","80米欄","100米欄","110米欄","4x50M","4x100M","4x400M","跳高","跳遠","三級跳遠","壘球","鉛球"];
var ITEM_GROUP=[];
//old group id
ITEM_GROUP[0]=[0,	0,	0,	3,	4,	5,	6,	0,	8,	0,	10,	0,	0,	0,	14,	0,	0,	0,	18,	19,	20,	0,	22];
ITEM_GROUP[1]=[0,	0,	0,	3,	4,	5,	6,	0,	8,	9,	0,	0,	0,	13,	0,	0,	0,	0,	18,	19,	20,	0,	22];
ITEM_GROUP[2]=[0,	0,	0,	3,	4,	0,	0,	0,	8,	0,	0,	0,	12,	0,	0,	0,	0,	0,	18,	19,	0,	0,	22];
ITEM_GROUP[3]=[0,	0,	2,	0,	0,	0,	0,	7,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	18,	19,	0,	21,	0];
ITEM_GROUP[4]=[0,	0,	0,	3,	4,	5,	6,	0,	8,	9,	0,	0,	0,	13,	0,	0,	0,	0,	18,	19,	0,	0,	22];
ITEM_GROUP[5]=[0,	0,	0,	3,	4,	5,	6,	0,	8,	9,	0,	0,	12,	0,	0,	0,	0,	0,	18,	19,	0,	0,	22];
ITEM_GROUP[6]=[0,	0,	0,	3,	4,	0,	0,	0,	8,	0,	0,	11,	0,	0,	0,	0,	0,	0,	18,	19,	0,	0,	22];
ITEM_GROUP[7]=[0,	0,	2,	0,	0,	0,	0,	7,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	18,	19,	0,	21,	0];
ITEM_GROUP[8]=[0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	18,	19,	0,	21,	0];
ITEM_GROUP[9]=[0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	18,	19,	0,	21,	0];


//new group id
//////////////////////////////////////////////////////////////
var ans=[
0,0,0,0,0,
0,0,0,0,0,
0,0,0,0,0,
0,0,0,0,0,
0,0,0];
var pvans=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var max_ans=3;
var imageObj = new Image();
/////////////////////////////////////////////////////////////
var validation = {
    isEmailAddress:function(str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty:function (str) {
        var pattern =/\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber:function(str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame:function(str1,str2){
        return str1 === str2;
    }
};  
function Show_SPITEM_ICON(img,canvas_id,itemid,size)
{
    canvas = document.getElementById(canvas_id);
    context = canvas.getContext('2d');
    if(itemid<12){
         context.drawImage(img, 85*itemid, 0, 85, 85,   0, 0,size,size);
    }else{
         context.drawImage(img, 85*(itemid-12), 87, 85, 85,   0, 0,size,size);
    }
 }
function Add_Ans(x)
{
	temp=0;
	for(i=0;i<ans.length;i++){temp+=ans[i];}
 	if(temp<max_ans){
 		ans[x]=1;
 		document.getElementById("chk_"+x).checked = true;
 		document.getElementById("img_"+x).style.cssText = "border-radius: 20px;"
 		for(j=0;j<pvans.length;j++)
 		{
 			if(pvans[j]==-1) {
 				pvans[j]=x;
 				Show_SPITEM_ICON(imageObj,"pv_"+j,x,85);
 				break;
 			}
 		}
 		document.getElementById("pic_cnt").innerHTML=temp+1;
 		return true;
 	}else{
 		alertmsg("超出"+max_ans+"個選項!");
 		document.getElementById("chk_"+x).checked = false;
 		return false;
 	}
}
function Remove_AllAns()
{
	for(i=0;i<ans.length;i++){
		Remove_Ans(i);
		//temp+=ans[i];
		}
}
function Remove_Ans(x)
{
	ans[x]=0;
	document.getElementById("img_"+x).style.cssText = "border-radius: 0px;"
	for(j=0;j<pvans.length;j++)
 	{
 		if(pvans[j]==x) {
 			pvans[j]=-1;
 			Show_SPITEM_ICON(imageObj,"pv_"+j,23,85);			
 			break;
 		}
 	}
	document.getElementById("chk_"+x).checked = false;
	document.getElementById("pic_cnt").innerHTML=Number(document.getElementById("pic_cnt").innerHTML)-1;
}
function clickimg(x){
   if(ans[x]==1)
   {
   	  Remove_Ans(x);
   }else{
   	 Add_Ans(x)
   }
}
function btn_submit()
{
	//temp_fno=document.getElementById("fno").value;
	temp_cname=document.getElementById("cname").value;
	if(temp_cname.length<2) {alertmsg("請塡姓名長度大於2!");document.getElementById("cname").focus();return ;}
	//if(!validation.isNumber(temp_fno)) {alertmsg("請塡學生證號碼前7位!");document.getElementById("fno").focus();return;}
	temp=0;
	for(i=0;i<ans.length;i++)
	{
		temp+=ans[i];
	}
 	if( temp >0 && temp<=max_ans){
 	document.getElementById('GROUP_Name').disabled = false;
 	document.getElementById("formid").submit();
	}else{
		alertmsg("請選"+max_ans+"項!("+temp+")");
	}
}
function close_msgbox(x) {
        document.getElementById(x).style.display = "none";
}
function show_msgbox(x){
       document.getElementById(x).style.display = "block";
}
function alertmsg(x)
{
    document.getElementById("msgbox_txt").innerHTML=x;
    document.getElementById("msgbox").style.display = "block";
}
function logout()
{
		document.getElementById("cname").value="";
  		document.getElementById("fno").value="";
  		document.getElementById("fimg").value="";
    	document.getElementById("studinfo").innerHTML="--";
		document.getElementById("classinfo").innerHTML="--";
		document.getElementById("GROUP_Name").value="--";
		document.getElementById('GROUP_Name').disabled = false;
  	    for(i=0;i<ITEM_GROUP[return_group].length;i++)
 			{
 				document.getElementById('tr_'+i).style.display = "none";
 			}
		Remove_AllAns();
}
function login()
{
    /////input param
    /////return_group
 
      return_group=0;
      var xhttp = new XMLHttpRequest();
  	  xhttp.onreadystatechange = function() {
    		if (xhttp.readyState == 4 && xhttp.status == 200) {
      			var res = xhttp.responseText.split("\n");
      			return_group=0;
      			if(res[0]=="nothing"){
      			alertmsg(xhttp.responseText);
      			}else{
      			document.getElementById("studinfo").innerHTML=res[0];
      			document.getElementById("classinfo").innerHTML=res[1];
      			document.getElementById("GROUP_Name").value=res[4];
      			return_group=res[4];
      			document.getElementById('GROUP_Name').disabled = true;
 				for(i=0;i<ITEM_GROUP[return_group].length;i++)
     			{
        			if(ITEM_GROUP[return_group][i]>0)
     				document.getElementById('tr_'+i).style.display = "block";
     			}
     			document.getElementById('GROUP_Name').disabled = true;
     			show_msgbox('studbaseinfo');
     			Remove_AllAns();
     			     ans_arr=res[res.length-1].split(",");
     			     if(ans_arr[0]=="REC"){
     			    	for(temp_i=2;temp_i<ans_arr.length;temp_i++){
     			    		__tmptmpans=ans_arr[temp_i].split("_");
     			    		if(__tmptmpans.length>1){
     							Add_Ans(__tmptmpans[1]);
     			    		}
     					}
     			     }else if(ans_arr[0]=="URL")
     			    	 {
     			    	 window.location.assign(ans_arr[1]);
     			    	 }
     			}	
    		}else{
    				alertmsg("waiting....!("+xhttp.readyState + ") (" + xhttp.status+")"+xhttp.responseText);
    		}
  		};
  		xhttp.open("POST", "read", true);
  		xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  		temp_cname=document.getElementById("cname").value;
  		
		xhttp.send("cname="+temp_cname+"&appt=REC");
}
function change_group_edit()
{
var person = prompt("Please enter your birthdate last 4 digits", "");
if (person != null && person == "0000") {
    document.getElementById('GROUP_Name').disabled = false;
}
}
function GroupName_Change()
{
	return_group=document.getElementById("GROUP_Name").value;
	for(i=0;i<ITEM_GROUP[return_group].length;i++)
     {
        if(ITEM_GROUP[return_group][i]>0){
     	document.getElementById('tr_'+i).style.display = "block";
     	}else{
     	document.getElementById('tr_'+i).style.display = "none";
     	}
     }
}