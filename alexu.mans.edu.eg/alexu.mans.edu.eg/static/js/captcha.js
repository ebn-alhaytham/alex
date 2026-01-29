function CreateRecaptcha(divName = 'ReCaptchaDiv', textID = 'recaptcha_response_field', key_field = 'recaptcha_key_field', table_container = 'recaptcha_container') {
    $.ajax({
        url: "/stuJCI",
        data: {
            param0: "CaptchaImage.CaptchaImage",
            param1: "GenrateImage"
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            //img_name='BarCode2.jpg'
            var data = jQuery.parseJSON(d);
            if (data["MSG"] == "success") {
                var str = "";
                str += "<table id='" + table_container + "' dir='ltr' border='0' cellspacing='0' class='ui-widget-header InputCorner' cellpadding='0' height='90' style='width: 90%;'>"; //background='/static/css/captcha/BarCodeBG.jpg'> ";
                str += "	<tr>";
                str += "		<td style='text-align:center;'> "
                str += "		<img border='0' src='/static/css/captcha/BarCode2.jpg?" + data["randomVal"] + "' width='170' height='45'></td> ";
                str += "	</tr> ";
                str += "	<tr> ";
                str += "		<td style='text-align:center;'> ";
                str += "                   	<input type='text' style='width:200px;margin-right:5pt;' id='" + textID + "'  pattern=\"^[A-Za-z0-9\\s]+$\" name='" + textID + "' class='InputCorner' placeholder='word Verification' />";
                str += "                   	<input type='hidden' name='" + key_field + "' value='" + data["randomString"] + "' TABINDEX=7  />";
                str += "                   	<img src='/static/css/captcha/refresh.png' style='width:1.5em;cursor:pointer;vertical-align: middle;' class='ReloadBTN'>";
                str += "               </td>";
                str += "	</tr>";
                str += "	<tr> ";
                str += "		<td style='text-align:center;'> ";
                str += "			<label for='' generated='true' class='error' style='color:red;'></label>"
                str += "               </td>";
                str += "	</tr>";
                str += "</table> ";

                $("#" + divName).html(str);
                $('#' + textID).on('input', function() {
                    $(this).val($(this).val().replace(/[^A-Za-z0-9\u0600-\u06FF\s]/g, ''));
                });

                $('#recaptcha_login_container .ReloadBTN').click(function() {

                    CreateRecaptcha(divName, textID, key_field, table_container);
                });
                $('#recaptcha_container .ReloadBTN').click(function() {

                    CreateRecaptcha(divName, textID, key_field, table_container);
                });
            }
        }
    });
}

function VerifyingAnswer(Dict) {
    var flag = false;
    $.ajax({
        url: "/stuJCI",
        data: {
            param0: "CaptchaImage.CaptchaImage",
            param1: "VerifyingAnswer",
            param2: JSON.stringify(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(data) {
            flag = data;
        }
    });
    return flag;
}