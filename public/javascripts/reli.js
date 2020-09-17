function InitalizePage(){
  document.getElementById("PARTA").style.display ="none";
  document.getElementById("PARTB").style.display ="none";
  document.getElementById("SubmitButton").style.display ="none";
}
function filldata()
{
   var date=new Date();
   var datestr=date.getFullYear()+(date.getMonth()<9?'-0':'-')+  (date.getMonth()+1)+ (date.getDate()<10?'-0':'-')+date.getDate();
   document.getElementsByName("modified_date")[0].value=datestr;
   let fn=new Array(
    "stud_ref",
    "modified_date",
    "name",
    "classno",
    "seat",
    "性別",
    "年齡",
    "宗教信仰",
    "信主年數",
    "教會",
    "返教會次數",
    "洗浸禮",
    "返聖堂次數",
    "其他信仰",
    "父信仰",
    "父其他信仰",
    "母信仰",
    "母其他信仰",
    "A1信主原因",
    "A2其他原因",
    "AF希望從神得到",
    "A3JOIN活動",
    "A4活動",
    "A5其他活動",
    "A6活動時段",
    "A7其他時段",
    "A8JOIN事奉",
    "A9事奉",
    "AA其他事奉",
    "ABJOIN協助",
    "AC協助",
    "AD其他協助",
    "AEJOIN培訓",
    "AE培訓",
    "AE其他培訓",
    "AF聖經科",
    "AF建議",
    "AG喜歡福音活動聚會",
    "AG建議",
    "AG其他",
    "B1信仰印象",
    "B2其他印象",
    "B3未信原因",
    "B4其他原因",
    "B5JOIN活動",
    "B6活動",
    "B7其他活動",
    "B8活動時段",
    "B9其他時段",
    "BA喜歡福音活動聚會",
    "BA其他",
    "BA建議",
    "BB聖經科",
    "BB建議"
);
   fn.forEach(function(entry) {

      inputname=entry;
      if(entry=="A1信主原因"||
entry=="A4活動"||
entry=="A6活動時段"||
entry=="A9事奉"||
entry=="AC協助"||
entry=="AE培訓"||
entry=="AG喜歡福音活動聚會"||
entry=="B1信仰印象"||
entry=="B3未信原因"||
entry=="B6活動"||
entry=="B8活動時段"||
entry=="BA喜歡福音活動聚會"
) inputname=entry+'[]';
      
      x=document.getElementsByName(inputname);
      console.log(inputname);
      console.log(entry);
        console.log(jsondata[entry]);
      if(x!==null)  
      if(entry=='modified_date') {}
      else if(x[0].hasAttribute('type') === false || x[0].attributes['type'].value=='text')  
      {
        x[0].value=jsondata[entry];  
        
      }else if(x[0].attributes['type'].value=='radio')
      {
          for(i=0;i<x.length;i++)
          {
              v=x[i].value;
              if(v==jsondata[entry]) x[i].checked = true;
          }
      }else if(x[0].attributes['type'].value=='checkbox'){
          if(jsondata[entry]==null)return;
          var res = jsondata[entry].match(/.\d+./g);
          if(res==null) return;
          for(i=0;i<res.length;i++){
               index_=Number(res[i].replace('.',''))-1; 
               x[index_].checked=true;
          }
      }
    });
} 
function ShowPartContent(part){
    flag=false;
	for(var i=0;i<6;i++)
	{
		if(document.getElementById("宗教信仰"+i).checked==true)
		{ 
			flag=true;
		}
	}
	if(flag==false) 
	{
		alert("請填寫你的宗教信仰!");
		return;
	}
	if(part=="A"){
	   if(document.getElementById("宗教信仰0").checked==true || document.getElementById("宗教信仰1").checked==true)
		{
		document.getElementById("PARTA").style.display ="block";
		document.getElementById("PARTB").style.display ="none";
		document.getElementById("SubmitButton").style.display ="block";
		}else{
			alert("其他信仰,請填寫B部份問卷!");	
		}
	}else{
	   if(document.getElementById("宗教信仰0").checked==false && document.getElementById("宗教信仰1").checked==false)
		{
			document.getElementById("PARTA").style.display ="none";
			document.getElementById("PARTB").style.display ="block";
			document.getElementById("SubmitButton").style.display ="block";
		}else{
			alert("基督教信仰,請填寫A部份問卷!");	
		}	
	}
	
}
function copytxt(){
	return document.getElementById("demo").innerHTML;
}
function copybtn(){
		if (window.clipboardData) {  
            window.clipboardData.clearData();  
            window.clipboardData.setData("Text", copytxt());  
            alert("copy to clipboard！");  
		}
}
function showmsg0(x){
    document.getElementById("demo").innerHTML = x;
    document.getElementById('msgbox').className ='center0';
     document.getElementById('msgbox').style.display = "block";
}

function showmsg(x){

    document.getElementById("demo").innerHTML = x;
     document.getElementById('msgbox').className ='center1';
     document.getElementById('msgbox').style.display = "block";
}
function closemsg(x){
    document.getElementById('msgbox').style.display = "none";
}
function prtDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     showmsg( this.responseText);
    }
  };
  xhttp.open("GET", "/internal/RELI/info.php", true);
  xhttp.send();
}
function prtGRID() {
  window.open("/internal/RELI/grid.php");
}

  function SubmitStudReligionFormstartCallback() {
	  return true;
  }
  function SubmitStudReligionFormcompleteCallback(response) {
	  showmsg0(response);
  }
  function downloadJSAtOnload() {
   //var element = document.createElement("script");
   //element.src = "defer.js";
   //document.body.appendChild(element);
   closemsg();
   filldata();
  }
  if (window.addEventListener)
   window.addEventListener("load", downloadJSAtOnload, false);
  else if (window.attachEvent)
   window.attachEvent("onload", downloadJSAtOnload);
  else window.onload = downloadJSAtOnload;
