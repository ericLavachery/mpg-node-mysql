// SINGLE TABLE CHANGE
socket.on('single_table_change', function(data) {
    // changed table
    $('#serverReturn').empty().append(data.prop+' = '+data.value);
    setTimeout(serverMessageOut, 1500);
    function serverMessageOut() {
        $('#serverReturn').empty();
    };
});
