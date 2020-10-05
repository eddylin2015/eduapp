function exportTableToCSV($table, filename) {
    var $rows = $table.find('tr:has(td)'),
    // Temporary delimiter characters unlikely to be typed by keyboard
    // This is to avoid accidentally splitting the actual contents
    tmpColDelim = String.fromCharCode(11), // vertical tab character
    tmpRowDelim = String.fromCharCode(0), // null character
    // actual delimiter characters for CSV format
    colDelim = '","',
    rowDelim = '"\r\n"',
    // Grab text from table into CSV formatted string
    csv = '"' + $rows.map(function(i, row) {
    var $row = $(row),  $cols = $row.find('td');
    return $cols.map(function(j, col) {
      var $col = $(col), text = $col.html().indexOf("<script>")>-1?$col.html().replace(/<script>[\w\W]+<\/script>/,""):$col.text();
      return text.replace(/"/g, '""'); // escape double quotes
    }).get().join(tmpColDelim);
    }).get().join(tmpRowDelim)
    .split(tmpRowDelim).join(rowDelim)
    .split(tmpColDelim).join(colDelim) + '"';
    // Deliberate 'false', see comment below
    var universalBOM = "\uFEFF";
    if (false && window.navigator.msSaveBlob) {
       var blob = new Blob([decodeURIComponent(universalBOM+csv)], { type: 'text/csv;charset=utf8' });
       window.navigator.msSaveBlob(blob, filename);
     } else if (window.Blob && window.URL) {
        // HTML5 Blob        
        var blob = new Blob([universalBOM+csv], { type: 'text/csv;charset=utf8'});
        var csvUrl = URL.createObjectURL(blob);
        console.log(csvUrl);
        $(this).attr({'download': filename,'href': csvUrl });
     } 
     else 
     {
        var csvData = "data:text/csv;charset=utf-8," + encodeURIComponent(universalBOM+csv);   
        $(this).attr({'download': filename,'href': csvData, 'target': '_blank'});
     }
  }
  /*
  a(href="#",class="export") Export Table data into Excel
  style.
  a.export, a.export:visited {
    display: inline-block;
    text-decoration: none;
    color:#000;
    background-color:#ddd;
    border: 1px solid #ccc;
    padding:8px;
  }

  $(document).ready(function() {
      $(".export").on('click', function(event) {
        var args = [$('#tableContent>table'), 'export0.csv'];
        exportTableToCSV.apply(this, args);
      });
  });
  */