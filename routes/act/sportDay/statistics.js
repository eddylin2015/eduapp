const fs = require('fs');
//const fileUrl = new URL('file:///tmp/hello');
const GroupNames=["項目/組別","男A","男B","男C","男D","男E","女A","女B","女C","女D","女E","小計"]
const ItemNames = [
    "---", "50M", "60M", "100M", "200M", "400M", "800M", "1000M", "1500M", "3000M", "5000M", "60米欄", "80米欄", "100米欄", "110米欄", "4x50M", "4x100M", "4x400M", "跳高", "跳遠", "三級跳遠", "壘球", "鉛球"];
const df=[]
df.push(GroupNames);
for(let i=1;i<ItemNames.length;i++)
{
    df.push([ItemNames[i],0,0,0,0,0,0,0,0,0,0,0])
}
df.push(["小計",0,0,0,0,0,0,0,0,0,0,0])
let json_str=fs.readFileSync("c:/code/eduapp/routes/act/sportday/secert_data.json","utf-8");
let obj=JSON.parse(json_str);
for(let i=0;i<obj.length;i++)
{
    let row=obj[i];
    console.log(obj[i]);
    let itemstr_=row[row.length-1];
    let gidx=0;
    for(let j=0;j<GroupNames.length;j++)   
    {
        if(row[7]==GroupNames[j]) {gidx=j;break;}
    }
    for(let j=0;j<ItemNames.length;j++)   
    {
        let idx=ItemNames.length-j-1;
        if(itemstr_.indexOf(ItemNames[idx])>-1){
          itemstr_=itemstr_.replace(ItemNames[idx],`.${idx}.`)
          df[idx][gidx]+=1;
        }
    }
}
for(let i=1;i<df.length;i++)
{   let sum=0;
    for(let j=1;j<df[i].length-1;j++)
      sum+=df[i][j]
    df[i][df[i].length-1]  =sum;
}
for(let j=1;j<df[0].length;j++)
 {let sum=0;
  for(let i=1;i<df.length-1;i++)
  {   
    
      sum+=df[i][j]
  }
  df[df.length-1][j]  =sum;
 
}
for(let i=1;i<df.length;i++)
{   
    for(let j=1;j<df[i].length;j++)
      if(df[i][j]==0) df[i][j]="-";
}
  

for(let i=0;i<df.length;i++)
  console.log("    <tr><td>",df[i].join("<td>\t"));