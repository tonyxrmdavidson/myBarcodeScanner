$(document).ready(function () {
    $('#scan_button').on('click', function () {
        cordova.plugins.barcodeScanner.scan(       
            function (result) {
                console.log(result);
                if (result.cancelled) {
                    $('#scanner_body').append("<p>The scan was cancelled</p>");
                    swal('The scan was cancelled');
                }
                else {
                    $('#scanner_body').append("<p>" + result.text + "</p>");
                    swal('The result of the scan was "' + result.text + '"');
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
});


