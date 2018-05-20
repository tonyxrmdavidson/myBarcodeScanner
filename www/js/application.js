$(document).ready(function () {
    $('#scan_button').on('click', function () {
        cordova.plugins.barcodeScanner.scan(       
            function (result) {
                console.log(result);
                //(result.cancelled) ? swal('The scan was cancelled') : scanSuccess(result);  //short cut version
                if (result.cancelled) {
                    swal('The scan was cancelled');
                }
                else {
                    scanSuccess(result);
                }
            }, 
            function (error) {
                swal("Scanning failed: " + error);
                $('#scanner_body').append("<p>" + error + "</p>");
            },
            {
                "preferFrontCamera" : false,
                "showFlipCameraButton" : true,
                "showTorchButton" : true,
                "formats" : "QR_CODE,PDF_417,CODE_39,DATA_MATRIX",
                "orientation" : "portrait"
            }
        );
    });

    $('#clear').on('click',function (){
        $('#scanner_body').empty();
    });

});

function scanSuccess(scan){
    var message;
    if(scan.text.includes("http")){
        $('#scanner_body').append("<p><a href='" + scan.text + "'>" + scan.text + "</a></p>");
        message = 'You scanned a URL!';
    }else{
        $('#scanner_body').append("<p>" + scan.text + "</p>");
        message = 'You scanned a String!';
    }
    swal({
        text: message,
        timer: 1000,
        type: 'success'
    }) 
}



