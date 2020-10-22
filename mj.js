const {simplify, parse,derivative}=require("mathjs");
let expr=[
	"39+(-20)-10",
	"25-11-(-2)",
	"1/5-3/5",
	"1/3+(-1/3)",
	"2^3 * 2^-6"

];
for(let i=0;i<expr.length;i++)
  console.log(simplify(expr[i]).toString());
