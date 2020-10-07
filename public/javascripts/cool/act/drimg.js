var _x53988 = [
    '#FF0000',
    'init',
    'code',
    '',
    'codecode',
    'canvas',
    'createElement',
    'height',
    'width',
    'appendChild',
    'getElementsByTagName',
    'article',
    'ctx',
    'getContext',
    '2d',
    'fillStyle',
    'solid',
    'strokeStyle',
    '#ECD018',
    '#0000FF',
    'lineWidth',
    'lineCap',
    'round',
    'loadDoc',
    'addEventListener',
    'click',
    'decc',
    'pow',
    'length',
    'redbtn',
    'floor',
    'white',
    'fillRect',
    'green',
    'onreadystatechange',
    'readyState',
    'status',
    'responseText',
    'open',
    'GET',
    'numberimg',
    'send'
];
var canvas_pencolor = _x53988[0];
var lastPt = null;
var App = {};
App[_x53988[1]] = function () {
    App[_x53988[2]] = _x53988[3];
    App[_x53988[4]] = 0;
    App[_x53988[5]] = document[_x53988[6]](_x53988[5]);
    App[_x53988[5]][_x53988[7]] = 200;
    App[_x53988[5]][_x53988[8]] = 600;
    document[_x53988[10]](_x53988[11])[0][_x53988[9]](App[_x53988[5]]);
    App[_x53988[12]] = App[_x53988[5]][_x53988[13]](_x53988[14]);
    App[_x53988[12]][_x53988[15]] = _x53988[16];
    App[_x53988[12]][_x53988[17]] = _x53988[18];
    App[_x53988[12]][_x53988[17]] = _x53988[19];
    App[_x53988[12]][_x53988[20]] = 5;
    App[_x53988[12]][_x53988[21]] = _x53988[22];
    App[_x53988[23]]();
    App[_x53988[5]][_x53988[24]](_x53988[25], function () {
        App[_x53988[23]]();
    }, false);
};
App[_x53988[26]] = function (txt) {
    App[_x53988[4]] = Number(txt[Math[_x53988[27]](5, 0) - 1]);
    App[_x53988[2]] = txt[Math[_x53988[27]](5, 0) - 1];
    for (ti = 1; ti < txt[_x53988[28]] - 1; ti++) {
        if (App[_x53988[4]] == 0) {
            App[_x53988[2]] += txt[ti];
            App[_x53988[4]] = Number(txt[ti]);
        } else {
            App[_x53988[4]]--;
        }
    }
    return App[_x53988[2]];
};
App[_x53988[29]] = function (txt) {
    var arr = [];
    for (var i = 0; i < 5; i++) {
        arr[i] = [];
    }
    yz = txt[_x53988[28]] / 5;
    for (ti = 0; ti < txt[_x53988[28]]; ti++) {
        arr[Math[_x53988[30]](ti / yz)][ti % yz] = Number(txt[ti]);
    }
    App[_x53988[12]][_x53988[15]] = _x53988[31];
    App[_x53988[12]][_x53988[32]](0, 0, App[_x53988[5]][_x53988[8]], App[_x53988[5]][_x53988[7]]);
    App[_x53988[12]][_x53988[15]] = _x53988[33];
    for (i = 0; i < 5; i++) {
        for (j = 0; j < yz; j++) {
            for (k = 0; k < 3; k++) {
                if (arr[i][j] & Math[_x53988[27]](2, k)) {
                    App[_x53988[12]][_x53988[32]](j * 70 + 20 * k, i * 20, 20, 20);
                }
            }
        }
    }
};
App[_x53988[23]] = function () {
    var xhttp = new XMLHttpRequest();
    xhttp[_x53988[34]] = function () {
        if (xhttp[_x53988[35]] == 4 && xhttp[_x53988[36]] == 200) {
            var ttt = xhttp[_x53988[37]];
            App[_x53988[29]](App[_x53988[26]](ttt));
        }
    };
    xhttp[_x53988[38]](_x53988[39], _x53988[40], true);
    xhttp[_x53988[41]]();
};
