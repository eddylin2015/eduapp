var profileUserName 
$(document).ready(function () {
    profileUserName = document.getElementById("profileUserName");
    if (profileUserName) {
        //$("#xuexi_mnu").append("<li><a href='/internal/attend'>預約訪客登記</a></li>");
        $("#inter_mnu").append("<li><a href='/internal/worknote'>支援-工作看板</a></li>");
		$("#inter_mnu").append("<li><a href='/internal/mail'>支援-暫存電郵</a></li>");
        //$("#inter_mnu").append("<li><a href='/internal/workgrid'>支援-預訂電腦室</a></li>");
        //$("#inter_mnu").append("<li><a href='/internal/kideval'>幼部-評估表</a></li>");
    }
});