$(document).ready(function () {
    $('#scan_button').on('click', function () {
        cordova.plugins.barcodeScanner.scan(       
            function (result) {
                console.log(result);
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
        $('#scanner_body').remove();
    });
    
});

function scanSuccess(scan){
    $('#scanner_body').append("<p>" + scan.text + "</p>");
    swal({
        title: 'Auto close alert!',
        text: 'I will close in 2 seconds.',
        timer: 2000,
        type: 'success',
        onOpen: () => {
          swal.showLoading()
        }
    }).then((result) => {
        if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.timer
        ) {
          console.log('I was closed by the timer')
        }
    })    
}



