var myCodes;

function loadListeners(){
    loadCodes();
    document.addEventListener('pause', function(){
        saveCodes(myCodes);
    }, false);
    document.addEventListener('resume', function(){
       loadCodes();
    } , false);

    $('#scan_button').on('click', function () {
        cordova.plugins.barcodeScanner.scan(       
            function (result) {
                (result.cancelled) ? swal('The scan was cancelled') : scanSuccess(result); 
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
        myCodes = {'codes':[]}
        saveCodes(myCodes);
    });

    $('#scanner_page').on('pagebeforeshow',function(){
        loadCodesToBody();
    });
    $('#scanner_page').trigger('pagebeforeshow');
}

$(document).ready(function () {
    loadListeners();
});

function loadCodesToBody(){
    for(a = 0; a < myCodes.codes.length; a++){
        var code = myCodes.codes[a];
        $('#scanner_body').append("<p>" + code + "</p>");
    }
}

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
    });
    saveNewCode(scan.text);   
}

function saveNewCode(text){
    myCodes.codes.push(text);
    saveCodes(myCodes);
}

function loadCodes(){
    var codeString = localStorage.getItem('qrcodes');
    if(codeString){
        myCodes = JSON.parse(codeString);
    }else{
        myCodes = {
            codes:[]
        };
    }
    saveCodes(myCodes);
}

function saveCodes(codes){
    localStorage.setItem('qrcodes',JSON.stringify(codes));
}




