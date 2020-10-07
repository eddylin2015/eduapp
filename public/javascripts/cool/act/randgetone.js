var images = ["spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg",
"spitems.jpg"];

function RandGetOne(x, y) {
    if (confirm("Random Row by row" + y + "?")) {
        alert(ArrayPast2Table(x, y));
    }
}
function RandGetOne1(x, y) {
    document.getElementById("res_" + y).innerHTML = ArrayPast2Table(x, y);
}

function ShowHideOrignData() {
    if (document.getElementById("divtbl").style.display == "none") {
        document.getElementById("divtbl").style.display = "block";
    } else {
        document.getElementById("divtbl").style.display = "none";
    }
}

function CheckDup() {
    var res_temp = "";
    var b = [];
    var cnt = 0;
    var columnNo = 2;
    var table = document.getElementById('tbl');
    for (var temp_row_i = 1; temp_row_i < table.rows.length - 1; temp_row_i++) {
        var row = table.rows[temp_row_i];
        var texta = row.cells[2].innerHTML;
        if (b.indexOf(texta) > -1) {
            res_temp += texta + "(" + row.cells[0].innerHTML + ":" + row.cells[1].innerHTML + ");\n";
        } else {
            b[cnt] = texta;
            cnt++;
        }
    }
    alert(res_temp);
}
function ArrayPast2Table(tablename, columnNo) {
    var res_temp = "";
    var int_arr = [];
    var int_arr_cnt = 0;
    var table = document.getElementById(tablename);
    for (var temp_row_i = 1; temp_row_i < table.rows.length; temp_row_i++) {
        var row = table.rows[temp_row_i];
        var cellLength = row.cells.length;
        if (row.cells[columnNo + 1].innerHTML == "1") {
            row.cells[columnNo + 1].setAttribute("style", "background-color: lime");
            int_arr[int_arr_cnt] = row.cells[0].innerHTML;
            int_arr_cnt++;
        }
    }
    temp_int_arr = Math.floor((Math.random() * int_arr_cnt));
    var res_temp = "姓名 Name: " + table.rows[Number(int_arr[temp_int_arr])].cells[1].innerHTML + ";     枱號 No." + table.rows[Number(int_arr[temp_int_arr])].cells[2].innerHTML;
   // alert("候選人數" + int_arr_cnt + "|隨機數字為:" + temp_int_arr + "|對應: ID:" + int_arr[temp_int_arr] + "\n" + res_temp);
    table.rows[Number(int_arr[temp_int_arr])].cells[columnNo + 1].setAttribute("style", "background-color: red");
    return res_temp;
}