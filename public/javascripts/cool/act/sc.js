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

 */
var ITEM_Name=["--",
"田徑興趣A班",
"田徑興趣B班",
"三擲培訓A班",
"三擲培訓B班",
"足球A班",
"足球B班",
"籃球A班",
"籃球B班",
"籃球C班",
"排球A班",
"排球B班",
"乒乓球班",
"中學長跑隊",
"體能訓練班",
"跆拳道班",
"劍擊班",
"柔道班",
"網球班",
"合唱團A團",
"合唱團B團",
"舞蹈團總培訓",
"戲劇A班",
"戲劇B班",
"趣味實踐藝術坊",
"視覺藝術社",
"動力信仰班",
"急救班",
"天文興趣小組",
"基礎傳播學培訓班",
"星期五廣播小組",
"機械人設計班",
"魔術興趣班",
"汽球造型設計班",
"特義工能club fun(義工班)",
"正能量義工小組",
"陶藝拉柸基礎班",
"管樂團",
"低音大提琴班",
"大提琴B班",
"大提琴A班",
"小提琴B班",
"中提琴B班",
"小提琴A班",
"中提琴A班",
"管弦樂團",
"中學羽毛球班",
"學生會領袖培育工作坊",
"Python駭客任務(程式設計)",
"小提琴C班",
"高中職技手鈴隊"
];
var ITEM_GROUP=[];
//old group id
ITEM_GROUP[0]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[1]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[2]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[3]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[4]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[5]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[6]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
ITEM_GROUP[7]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,40,41,42,43,44,45,46,47,48,49,50];
//new group id
//////////////////////////////////////////////////////////////
var ans=[
         0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0,0,0,
         0];
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
function Show_SPITEM_ICON(img,canvas_id,itemid,size,ftext)
{
    canvas = document.getElementById(canvas_id);
    context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, 85, 85,   0, 0,size,size);
    context.font = "25px Arial";
    if(ftext.length>4){
    ft1=ftext.substring(0,4);
    ft2=ftext.substring(4,ftext.length);
    context.fillText(ft1,3,25);
    context.fillText(ft2,3,65);}else{
    	context.fillText(ftext,3,25);
    }
    /*
    if(itemid<12){
         context.drawImage(img, 85*itemid, 0, 85, 85,   0, 0,size,size);
    }else{
         context.drawImage(img, 85*(itemid-12), 87, 85, 85,   0, 0,size,size);
    }*/
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
 				Show_SPITEM_ICON(imageObj,"pv_"+j,x,85,ITEM_Name[x]);
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
 			Show_SPITEM_ICON(imageObj,"pv_"+j,23,85,"");			
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
	temp_fno=document.getElementById("fno").value;
	temp_cname=document.getElementById("cname").value;
	if(temp_cname.length<2) {alertmsg("請塡姓名長度大於2!");document.getElementById("cname").focus();return ;}
	if(!validation.isNumber(temp_fno)) {alertmsg("請塡學生證號碼前7位!");document.getElementById("fno").focus();return;}
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
      			return_group=res[4];
      			classlist=["G1","G2","G3","C1","C2","C3"];
      			fix2class=res[1].substring(1,3);
      			for(i=0;i<classlist.length;i++)
      				{
      				if(fix2class==classlist[i])
      					{
      					return_group=i;		
      					break;
      					}
      				}
      			document.getElementById("GROUP_Name").value=return_group;
      			
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
     			     if(ans_arr[0]=="RCC"){
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
  		xhttp.open("POST", "mbc60th/sp_item_login", true);
  		xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  		temp_cname=document.getElementById("cname").value;
  		temp_fno=document.getElementById("fno").value;
  		temp_fimg=document.getElementById("fimg").value;
		xhttp.send("cname="+temp_cname+"&fno="+temp_fno+"&fimg="+temp_fimg+"&appt=RCC");
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