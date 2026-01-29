/*_radwa_*/
var flagYearSemester = 'None';
var userType = ""
var RegType = ""
var valueRadioClick = '';
var Lang = (Lang ? Lang : 'A')
var counterLogin = 0;


// $(".select2-container div").hover(function() {
//   $(this).css("z-index",4)
// });
// $(".select2-container div:not").hover(function() {
//   $(this).css("z-index",'unset')
// });
$(document).ready(function() {
    $.ajaxSetup({
        dataFilter: function(data, type) {
            if (data == 'refresh') {
                alert("انتهت مدة الفاعلية");
                logout();
                //window.location = "/";
            } else if (data == 'notSigned') {
                alert("انتهت مدة الفاعلية");
                logout();
                //window.location = "/";
            } else if (data == 'relax') {
                logout();
            }
            return data;
        }
    });
    //=============================================================
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
    setCookie('activeSession', new Date(), 0.1);
    $(document).click(function() {
        setCookie('activeSession', new Date(), 0.1);
    });

    setInterval(function() {
        var activeSession = new Date(unescape(readCookie('activeSession')));
        var endSession = addMinutes(activeSession, 30);
        if (endSession < new Date()) {
            alert('انتهت مدة الفاعلية');
            logout();
        }
    }, 1000);
    setInterval(function() {}, 180000);
});

function logout() {
    $.get('/studentLogOut', {}, function() {
        window.location.href = '/';
    });
}

function setCookie(c_name, value, expiremin) {
    var exdate = new Date();
    exdate.setMinutes((exdate.getMinutes() + expiremin));
    document.cookie = c_name + "=" + escape(value) + ((expiremin == null) ? "" : ";expires=" + exdate.toUTCString());
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}


function sub_login(UserName, Password) {
    if (UserName != "" && Password != "") {
        $.ajax({
            url: "/studentLogin",
            data: {
                UserName: UserName,
                Password: Password,
                sysID: "313.",
                UserLang: Lang || 'E',
                userType: userType
            },
            type: "post",
            cache: false,
            async: true,
            beforeSend: function() {
                $('#login_btn').prop('disabled', true);
                //$("#loginHomePageDiv").html("<div align='center'><img src='/static/graduates/images/LoadingProgressBar.gif' title='Loading'></Div>");
            },
            success: function(d) {

                $('#login_btn').prop('disabled', false);
                var data = jQuery.parseJSON(d);

                if (userType == '1' || userType == '3') {
                    if (data.rows[0].row.LoginOK == "True") {
                        if (userType == '3') {

                            window.location = "/static/stuffPortal.html?num=" + randomNumber();
                            check_bug = true;
                            flagYearSemester = data.rows[0].row.flagYearSemester;

                            sessionStorage.setItem('flagYearSemester', flagYearSemester)

                        } else if (data.rows[0].row.sysLang != "") {

                            Lang = data.rows[0].row.sysLang;
                            username = (data.rows[0].row.username + '|').split('|')[(Lang == "A") ? 0 : 1];
                            sysID = data.rows[0].row.sysID;
                            sysURI = data.rows[0].row.sysURI;
                            userType = data.rows[0].row.userType;
                            flagYearSemester = data.rows[0].row.flagYearSemester;
                            sessionStorage.setItem('flagYearSemester', flagYearSemester);
                            sessionStorage.setItem("SESSION_KEY", data.rows[0].row.SESSION_KEY);
                            check_bug = true;
                            //$("body").load(sysURI + "?num=" + randomNumber());
                            window.location = sysURI + "?num=" + randomNumber();

                        } else {

                            // $("#employeesLoginFrm input:text,#employeesLoginFrm input:password").val('');
                            jAlert((Lang == "A" ? "عفوا ليس لك الحق فى الدخول للنظام" : "Sorry, You are not authorized to use this system"));

                        }
                    } else {
                        // $("#employeesLoginFrm input:text,#employeesLoginFrm input:password").val('');
                        if (data.rows[0].row.LoginOK == "invalidIP") {
                            jAlert((Lang == "A" ? "عفوا ليس لك الحق فى الدخول للنظام" : "Sorry, You are not authorized to use this system"), "Warning");
                        } else {
                            jAlert((Lang == "A" ? "من فضلك تأكد من اسم المستخدم وكلمة السر" : "Please insert correct username and password."), "Warning");
                        }


                    }
                } else {

                    $('#login_btn').prop('disabled', false);
                    if (data.rows[0].row.LoginOK == "True") {
                        check_bug = true;
                        window.location = "/static/PortalStudent.html"

                    } else if (data.rows[0].row.LoginOK == "Portal") {
                        jAlert(getName("سيتم تحويلك الى مدخل بوابة الخدمات الطلابية لنظام ابن الهيثم")); //|You will be redirected to new Ibn AL-Haytham student portal
                        check_bug = true;
                        window.location = data.rows[0].row.portalURL

                        // window.location = "/static/PortalStudent.html"


                    } else {
                        // $("#employeesLoginFrm input:text,#employeesLoginFrm input:password").val('');
                        if ("messageError" in data.rows[0].row) {
                            jAlert(getName(data.rows[0].row.messageError));
                        } else {
                            jAlert((Lang == "A" ? "من فضلك تأكد من اسم المستخدم وكلمة السر" : "Please insert correct username and password."), "Warning");

                        }


                    }

                }
            },
            error: function() {
                $('#login_btn').prop('disabled', false);
                error();
            }
        });


    } else {
        jAlert((Lang == "A" ? "من فضلك أدخل اسم المستخدم وكلمة السر" : "Please insert username and password."));
    }


}

function Login() { // hadeel 20-6-2012
    counterLogin += 1;
    $.ajax({
        url: "",
        context: document.body,
        success: function(s, x) {

            $('html[manifest=saveappoffline.appcache]').attr('content', '');
            $(this).html(s);
        }
    });
    var UserName = $("#name").val();
    var Password = $("#password").val();
    userType = $('[name="usertype"]:checked').val();
    if ($("#DivCaptchaFormData").length > 0 && $("#recaptcha_login_field").length > 0) {
        if (!($("#recaptcha_login_field").val())) {
            jAlert('please enter word verification first');
            return;
        } else {
            var queryForm = {};
            queryForm["recaptcha_response_field"] = $("#recaptcha_login_field").val();
            queryForm["recaptcha_key_field"] = $("input[name=recaptcha_key_login_field]").val();
            var codeFlag = VerifyingAnswer(queryForm);

            if (codeFlag == "true") {
                $('label[for="recaptcha_login_field"]').html("");
                sub_login(UserName, Password);
            } else {
                var msgValidator = "Code error";
                $('label[for="recaptcha_login_field"]').html(msgValidator);
                $('label[for="recaptcha_login_field"]').show();
            }
        }
    } else {
        sub_login(UserName, Password);

    }


    get_captcha();





}

function get_captcha() {

    if (counterLogin == 3) {
        var str = "";
        str += "<div id='DivCaptchaFormData' style='margin:6px;width:100%'>";
        //  str += "	<form id='captchaForm' name='captchaForm' >";
        str += "		<table border='0' style='border-collapse:collapse;width:100%;height:100%'>";
        str += "			<tbody>";

        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td width='25%'>";
        // str += "						" + getName("تأكيد الكلمة| Word Verification", "E");
        // str += "					</td>";
        str += "					<td style='width:50%'>";
        str += "						<div id='ReCaptchaDivLogin' style='padding-top: .5em;'></div>";
        str += "					</td>";
        str += "					<td width=25% align=left>";
        str += "						<label for='recaptcha_login_field' generated='true' class='error' style='color:red;'></label>"
        str += "					</td>";
        str += "				</tr>";
        // str +="<tr style='line-height:2em;color:#045c97;'>";
        //  str += "					<td width=25% colspan='2'>";
        //  str+="                        <button value='save' id='saveCaptchaLogin'>Save</button>           ";
        //
        //  str += "					</td>";
        // str += "				</tr>";
        str += "			</tbody>";
        str += "		</table>";
        //    str += "	</form>";
        str += "</div>";
        $("#captcha_login").html(str);
        CreateRecaptcha("ReCaptchaDivLogin", "recaptcha_login_field", "recaptcha_key_login_field", "recaptcha_login_container");
        //              if ($("#DivCaptchaFormData").length == 0) {
        //     $("#employeesLoginFrm").append(str);
        //     CreateRecaptcha();
        //     $("#DivCaptchaFormData").validate({
        //         rules: {
        //
        //             recaptcha_login_field: {
        //                 required: true
        //             }
        //         },
        //         messages: {
        //
        //             recaptcha_login_field: {
        //                 required: '&nbsp;&nbsp;*'
        //             }
        //         }
        //     });
        // }



        //  captcha_login
    }
}

/*_radwa@23/9/2012_*/
function stuffMenuSubSys() {
    var str = "";
    for (var i1 = 0; i1 < stuffSubSys.length; i1++) {
        var SubSysName = $('<div>' + stuffSubSys[i1].Name.split('|')[(Lang == "A") ? 0 : 1] + '</div>').clone().children().remove().end().text();
        // var SubSysID = data[i1].ID;
        if (i1 == 0) {
            CurrSubSysID = 0;
            CurrSubSysName = SubSysName;
        }
        str += "<li id='" + i1 + "' class='MenuSubSys' >";
        str += "	<a href='#' title='" + SubSysName + "' class='" + ((i1 == 0) ? ' active ' : ' ') + "'>";
        str += " 		<span class='" + $('<div>' + stuffSubSys[i1].Name.split('|')[1] + '</div>').clone().children().remove().end().text().replace(/ /g, "") + "-32'>" + stuffSubSys[i1].Name.split('|')[(Lang == "A") ? 0 : 1];
        str += "		</span>";
        str += "	</a>";
        str += "</li>";
    }
    $(str).appendTo("#nav-one");
    var BorderToHide = "border-" + (Lang == "A" ? "right" : "left");
    $("ul.nav li").first().css(BorderToHide, 'none');

    $(".MenuSubSys").click(function(event, callback) {
        // CurrAppID = "";
        //$("ul.nav li a").css('color', 'white');
        //$(this).children().css('color', '#FFFF22');
        $(this).closest('ul').find('a.active').removeClass('active');
        $(this).find('a').addClass('active');

        if (document.getElementById('SideMenu').style.display == 'none') {
            $("#SideMenu").show();
            $("#show_hid").val('>');
        }
        CurrSubSysID = $(this).attr("id");
        CurrSubSysName = $(this).children().children().html();

        //mail


        if (callback) {
            stuffMenuApp(callback);
        } else {
            stuffMenuApp();
        }
    });
    stuffMenuApp();
}

/*_radwa@23/9/2012_*/
function stuffMenuApp(callback) {

    var data = stuffSubSys[CurrSubSysID].subSys;
    if (data) {
        if ($('#SideMenu').html() != null)
            $('#SideMenu').empty();
        if ($('#sub1').html() == null) {
            $("<div style='' id='my_menu' class='sdmenu'></div><div id='appSideMenu' ></div>").appendTo("#SideMenu");
            for (i1 = 0; i1 < data.length; i1++) {
                var HolderName = (data[i1].Name).split('|')[(Lang == "A") ? 0 : 1];
                var HolderID = i1;
                var Apps = data[i1].Apps;
                $("<div id=sub" + i1 + "><span dir=" + dir + ">" + HolderName + "</span></div>").appendTo("#my_menu");
                for (var i2 = 0; i2 < Apps.length; i2++) {
                    var AppName = (Apps[i2].Name).split('|')[(Lang == "A") ? 0 : 1];
                    var AppID = Apps[i2].appID;

                    $("<a href='#' id='" + AppID + "' >" + AppName + "</a>").appendTo("#sub" + i1)
                }
            }
        }
    }
    var myMenu = null;
    if (myMenu == null) {
        myMenu = new SDMenu("my_menu");
        myMenu.init();
    }


    $("#my_menu a").click(function() {
        $('#my_menu a').removeClass('current')
        $(this).addClass('current')
        var ID = $(this).attr("id");
        CurrAppID = ID;
        CurrAppName = $(this).clone().children().remove().end().text(); //$(this).html();
        stuffShowApp();
    });
    if (callback) {
        callback();
    }
    getNewMessages();
}

/*_radwa@123/9/2012_*/
function stuffShowApp() {
    dictionary = stuffSubSys[CurrSubSysID].subSys;

    function getElement(idVal, eKey) {
        for (i = 0; i < dictionary.length; i++) {

            if (dictionary[i][eKey] == idVal) return dictionary[i];
        }
    }
    currentSubMenuP = getElement(CurrAppID.split('.')[0] + "." + CurrAppID.split('.')[1] + "." + CurrAppID.split('.')[2] + ".", "ID")
    if (currentSubMenuP && currentSubMenuP.Apps)
        dictionary = currentSubMenuP.Apps;
    var data = getElement(CurrAppID, "appID");
    //<img src="/static/images/site_under_construction.gif" align=center style="display: block;margin-left: auto;margin-right: auto;margin-top: 150px;">
    if (data) {
        //var rightLvl=CheckRight4Access(1);
        if (data.Url) {
            var lvls = [""];
            if (data.applevel) {
                lvls = data.applevel.split(',');
            }

            var show = false;
            for (var x = 0; x < lvls.length; x++) {
                show = show || (ChekAppLevel(lvls[x], (lvls.length == 1)))
            }
            if (show) {
                var Url = data.Url
                var UrlVariable = (Url.indexOf("?") > -1) ? Url.split('?')[1] : "";
                Url = Url.split('?')[0];
                var AppearanceMySide = false;
                CurrDictVariables = {};
                if (UrlVariable != "") {
                    UrlVariable = UrlVariable.split('&')
                    for (var i = 0; i < UrlVariable.length; i++) {
                        var key = UrlVariable[i].split('=')[0];
                        var value = UrlVariable[i].split('=')[1];
                        if (key == 'flag')
                            AppearanceMySide = true;
                        else {
                            CurrDictVariables[key] = value;
                        }
                    }
                }
                if (AppearanceMySide) {
                    SideMenu(CurrAppName, Url);
                    DesignFrame(CurrAppName, ' ', true);
                } else if (Url == "")
                    DesignFrame(CurrAppName, NoDataToShow(), true);
                else
                    DesignFrame(CurrAppName, Url);
                AdjustSystemHeight();
            } else {

                $('#SideMenuContainer').html('');
                //DesignFrame(CurrAppName, NoDataToShow(), true);
                var strScope = "<center><span style='font-weight: bold; font-family: arial; font-size: 20px; color: red;'>" + getName("برجاء مراجعة المجال |please verify the right scope ") + "</span></center>";
                DesignFrame(CurrAppName, strScope, true);
                if ((lvls.length > 1)) {
                    $('#scopeDiv').trigger('click');
                    $("#lblChooseScope").html(getName("برجاء مراجعة المجال |please verify the right scope "));
                }

            }
        } else {
            $("#BasicData").html('<div style="text-align:center"><img src="/static/images/site_under_construction.gif" style=""></div>');
        }
    } else {
        DesignFrame(CurrAppName, NoDataToShow(), true);
    }

}

function MenuSubSys() { //hadeel
    var str = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.BasicData",
            param1: "MenuSubSys"
        },
        type: "post",
        cache: false,
        async: true,
        success: function(results) {
            var data = jQuery.parseJSON(results);
            if (data) {
                for (var i1 = 0; i1 < data.length; i1++) {
                    var SubSysName = $('<div>' + data[i1].Name.split('|')[(Lang == "A") ? 0 : 1] + '</div>').clone().children().remove().end().text();
                    var SubSysID = data[i1].ID;
                    if (i1 == 0) {
                        CurrSubSysID = SubSysID;
                        CurrSubSysName = SubSysName;
                    }
                    str += "<li id='" + SubSysID + "'  class='MenuSubSys' >";
                    str += "	<a href='#' title='" + SubSysName + "' class='" + ((i1 == 0) ? ' active ' : ' ') + "'>";
                    str += " 		<span class='" + $('<div>' + data[i1].Name.split('|')[1] + '</div>').clone().children().remove().end().text().replace(/ /g, "") + "-32'>" + data[i1].Name.split('|')[(Lang == "A") ? 0 : 1];
                    str += "		</span>";
                    str += "	</a>";
                    str += "</li>";
                }
            }
        },
        complete: function() {
            $(str).appendTo("#nav-one");
            var BorderToHide = "border-" + (Lang == "A" ? "right" : "left");
            $("ul.nav li").first().css(BorderToHide, 'none');
            $(".MenuSubSys").click(function(event, callback) {

                CurrAppID = "";
                //$("ul.nav li a").css('color', 'white');
                //$(this).children().css('color', '#FFFF22');
                $(this).closest('ul').find('a.active').removeClass('active');
                $(this).find('a').addClass('active');

                if (document.getElementById('SideMenu').style.display == 'none') {
                    $("#SideMenu").show();
                    $("#show_hid").val('>');
                }
                CurrSubSysID = $(this).attr("id");
                CurrSubSysName = $(this).children().children().html();
                //mail
                if (callback) {
                    MenuApp(callback);
                } else {
                    MenuApp();
                }
            });
            MenuApp();
        },
        error: function() {
            error();
        }
    });
}

// hadeel edit
/*_radwa_*/
function MenuApp(callback) {
    //GetSubSystemHelp();
    $("#BasicData").html('');
    var str = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.BasicData",
            param1: "MenuApp",
            param2: CurrSubSysID || 'x.'
        },
        type: "post",
        cache: false,
        async: true,
        success: function(results) {
            var data = jQuery.parseJSON(results);
            if (data) {
                if ($('#SideMenu').html() != null)
                    $('#SideMenu').empty();
                if ($('#sub1').html() == null) {
                    $("<div style='' id='my_menu' class='sdmenu'></div><div id='appSideMenu' ></div>").appendTo("#SideMenu");
                    for (i1 = 0; i1 < data.length; i1++) {
                        var HolderName = (data[i1].Name).split('|')[(Lang == "A") ? 0 : 1];
                        var HolderID = data[i1].ID;
                        var Apps = data[i1].Apps;
                        $("<div id=sub" + i1 + "><span dir=" + dir + ">" + HolderName + "</span></div>").appendTo("#my_menu");
                        for (var i2 = 0; i2 < Apps.length; i2++) {
                            var AppName = (Apps[i2].Name).split('|')[(Lang == "A") ? 0 : 1];
                            var AppID = Apps[i2].ID;
                            $("<a href='#' id='" + AppID + "' >" + AppName + "</a>").appendTo("#sub" + i1)
                        }
                    }
                }
            }
        },
        complete: function() {
            var myMenu = null;
            if (myMenu == null) {
                myMenu = new SDMenu("my_menu");
                myMenu.init();
                /*  if (Lang != "A") {//hadeel edited here
                      $("#my_menu span").css("background-position", "10px");
                      $("#my_menu span").css("text-indent", "20px");
                  }
                  else {
                      $("#my_menu span").css("background-position", "230px");
                      //$("#my_menu .collapsed span").css("background-image", "url(/static/css/collapsed.png)");
                      $("#my_menu span").css("text-indent", "20px");
                  }*/
            }

            $("#my_menu a").click(function() {
                $('#my_menu a').removeClass('current')
                $(this).addClass('current')
                var ID = $(this).attr("id");
                CurrAppID = ID;
                CurrAppName = $(this).clone().children().remove().end().text() //$(this).html();
                ShowApp();
            });
            if (callback) {
                callback();
            }
            getNewMessages();
        },
        error: function() {
            error();
        }
    });
}

function ShowApp() { //hadeel

    if (CheckAppsRight4Access(1)) {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "general.BasicData",
                param1: "GetUrl",
                param2: CurrAppID
            },
            type: "post",
            cache: false,
            async: true,
            success: function(d) {
                var data = jQuery.parseJSON(d);

                if (data && data[0]) {
                    //var rightLvl=CheckRight4Access(1);
                    var lvls = data[0].applevel.split(',');
                    var show = false;
                    for (var x = 0; x < lvls.length; x++) {
                        show = show || (ChekAppLevel(lvls[x], (lvls.length == 1)))
                    }
                    if (show) {
                        var Url = data[0].Url
                        var UrlVariable = (Url.indexOf("?") > -1) ? Url.split('?')[1] : "";
                        Url = Url.split('?')[0];
                        var AppearanceMySide = false;
                        CurrDictVariables = {};
                        if (UrlVariable != "") {
                            UrlVariable = UrlVariable.split('&')
                            for (var i = 0; i < UrlVariable.length; i++) {
                                var key = UrlVariable[i].split('=')[0];
                                var value = UrlVariable[i].split('=')[1];
                                if (key == 'flag')
                                    AppearanceMySide = true;
                                else {
                                    CurrDictVariables[key] = value;
                                }
                            }
                        }
                        StartYear = data[0].StartYear;
                        EndYear = data[0].EndYear;
                        if (CurrentAcadmicYear != "") {
                            if (parseInt(CurrentAcadmicYear) < parseInt(StartYear) || parseInt(CurrentAcadmicYear) > parseInt(EndYear)) {
                                CurrentAcadmicYear = "";
                            }
                        }
                        if (AppearanceMySide) {
                            SideMenu(CurrAppName, Url);
                            DesignFrame(CurrAppName, ' ', true);
                        } else if (Url == "")
                            DesignFrame(CurrAppName, NoDataToShow(), true);
                        else
                            DesignFrame(CurrAppName, Url);
                        AdjustSystemHeight();
                    } else {


                        $('#SideMenuContainer').html('');
                        DesignFrame(CurrAppName, NoDataToShow(), true);
                        if ((lvls.length > 1)) {
                            $('#scopeDiv').trigger('click');
                            $("#lblChooseScope").html(getName("برجاء مراجعة المجال |please verify the right scope "));
                        }

                    }
                } else
                    DesignFrame(CurrAppName, NoDataToShow(), true);
            },
            error: function() {
                error();
            }
        });
    } else {
        $('#SideMenuContainer').html('');
        DesignFrame(CurrAppName, NoDataToShow(), true);
        $('#scopeDiv').trigger('click');
        $("#lblChooseScope").html(getName("ليست لك صلاحيات للتعامل مع هذه المؤسسة |You don't have rights to deal with this foundation"));
    }
}

function PagingBarNavigatorCompact(TotalNoOfRecord, PageSize, PageNo, sourcePage, DataDict) {
    var imgpath = "/static/images/"
    if (Lang == "E") {
        Last = imgpath + "firstpg.gif";
        First = imgpath + "lastpg.gif";
        Next = imgpath + "prevpg.gif";
        Privious = imgpath + "nextpg.gif";
        Lastd = imgpath + "First.d.gif";
        Firstd = imgpath + "Last.d.gif";
        Nextd = imgpath + "Previous.d.gif";
        Priviousd = imgpath + "Next.d.gif";
        From = "from";
    } else {
        First = imgpath + "firstpg.gif";
        Last = imgpath + "lastpg.gif";
        Privious = imgpath + "prevpg.gif";
        Next = imgpath + "nextpg.gif";
        Firstd = imgpath + "First.d.gif";
        Lastd = imgpath + "Last.d.gif";
        Priviousd = imgpath + "Previous.d.gif";
        Nextd = imgpath + "Next.d.gif";
        From = "من";
    }
    TotalNoOfPages = Math.ceil(TotalNoOfRecord / PageSize);
    if (PageNo <= 0) {
        PageNo = 1;
    }
    if (PageNo > TotalNoOfPages) {
        PageNo = TotalNoOfPages;
    }
    draw = "";
    if (TotalNoOfPages > 1) {
        draw += "<br><table class=centercontent_text_Blue_9pt align=center dir='" + ((Lang == "E") ? "ltr" : "rtl") + "' style='width:150px'><tr>";
        if (PageNo > 1) {
            draw += "<td  ><img style='border:0px;cursor:pointer;float:none;'  border=0 src='" + First + "' onClick='" + sourcePage + "(" + DataDict + ",1)'></td>";
            draw += "<td   ><img style='border:0px;cursor:pointer;float:none;' border=0 src='" + Privious + "' onClick='" + sourcePage + "(" + DataDict + "," + (parseInt(PageNo) - 1) + ")'></td>";
        } else {
            draw += "<td> <img style='border:0px;cursor:pointer;float:none;' border=0 src='" + Firstd + "'> </td>";
            draw += "<td> <img style='border:0px;cursor:pointer;float:none;' border=0 src='" + Priviousd + "'> </td>";
        }
        var str = "<select id='paging-pageNo' onChange='" + sourcePage + "(" + DataDict + ",this.value)'style='width:80px;' >"
        for (var i1 = 1; i1 <= TotalNoOfPages; i1++) {
            str += "<option value='" + i1 + "' " + ((PageNo == i1) ? "selected" : "") + ">" + i1 + "</option>"
        }
        str += "</select>"
        draw += "<td>" + str + "</td><td> " + From + " </td><td>" + TotalNoOfPages + "</td>";
        //draw+="<td><input type=text onChange='" + sourcePage +"("+DataDict+",this.value)'  value='" + PageNo + "' size=4 style='border: thin #333333 none;font-size=12 px;font-family:tahoma'></td><td> " + From + " </td><td>" + TotalNoOfPages + "</td>";
        if (PageNo < TotalNoOfPages) {
            draw += "<td   ><img style='border:0px;cursor:pointer;float:none;' border=0 src='" + Next + "' onClick='" + sourcePage + "(" + DataDict + "," + (parseInt(PageNo) + 1) + ")'></td>";
            draw += "<td   ><img  style='border:0px;cursor:pointer;float:none;' border=0 src='" + Last + "' onClick='" + sourcePage + "(" + DataDict + "," + parseInt(TotalNoOfPages) + ")'></td></tr>";
        } else {
            draw += "<td> <img style='border:0px;cursor:pointer;float:none;' border=0 src='" + Nextd + "'> </td>";
            draw += "<td> <img style='border:0px;cursor:pointer;float:none;' border=0 src='" + Lastd + "'> </td></tr>";
        }
        draw += "</table>";
    }
    return draw;
}

//hadeel edits //19-4
/*_radwa_*/
function SideMenu(CurrAppName, url, Flag) {
    CurrentName = "";
    LastTabSelected = 0;
    $('#my_menu').hide();
    var str = "";
    str += "	<div class='subAppSearch'>";
    str += " 		<div style='color:white;padding-right:15px;padding-left:15px;' align='" + align + "' id='header' class='SideMenuHeader'>";
    str += CurrAppName;
    str += "	<span style='float:" + ((Lang == "A") ? "left" : "right") + ";'><img src='images/back1.png'  id='imgBack' title='back'/></span>	</div>";
    str += "	</div>";
    str += "<table border='0' cellpadding='0' cellspacing='0' align='' style=''>";

    str += "	<tr>";
    str += "		<td style='' align='" + align + "' valign='top' id='SideMenuContainer' dir='" + dir + "' colspan=2>";
    str += "		</td>";
    str += "	</tr>";
    /*str += "	<tr>";
    str += "		<td style='background:url(images/green-rect_04.jpg) no-repeat;width:257px;height:10px;' colspan=2>";
    str += "		</td>";
    str += "	</tr>";*/
    str += "</table>";

    $('#appSideMenu').html(str);
    $('#appSideMenu').show();
    $('#imgBack').click(function() {
        $('#my_menu').show();
        $('#appSideMenu').hide();
        $('#BasicData').html('');
        $("#SideMenu").css("width", "");
        $("#BasicData").css("margin-left", "");

    });
    $('#imgBack').css('cursor', 'pointer');
    if (!Flag)
        $('#SideMenuContainer').load(url + ((url.indexOf("?") > -1) ? "&" : "?") + "num=" + randomNumber());
    else
        $('#SideMenuContainer').html(url);
    $('#BasicData').css('max-width', String(screen.width - parseInt($('#SideMenu').css('width').split('px')[0])) + 'px');
}

//// hadeel
function DesignFrame(Title, url, Flag) { //flase>>1 >>> load
    var str = '<div id="DivBasicData"></div>';
    $("#BasicData").html(str);
    var Titles = [Title];
    var InnerHtml = [url];
    var Types = Flag ? ["0"] : ["1"];
    TabView(Titles, InnerHtml, Types, 'DivBasicData');
}

function TabView(Titles, InnerHtml, Types, Container, id, appIDs = []) {

    var str = "";
    str += '<div id=' + (id ? id : "tabs") + ' class="container-fluid">';
    str += '  <ul class="nav nav-tabs"style="margin-bottom:10px;">';
    var Href = '';
    for (var i = 0; i < Titles.length; i++) {
        if (Types[i] == "1")
            Href = InnerHtml[i];
        else
            Href = '#tabs-' + (i + 1)
        str += '<li ><a href="' + Href + '" id=' + i + '>' + Titles[i] + '</a></li>';
    }
    str += '  </ul>';
    for (var i = 0; i < InnerHtml.length; i++) {
        if (Types[i] == "0") {
            appID = appIDs[i] ? appIDs[i] : "";
            str += '<div id="tabs-' + (i + 1) + '"  data-appid="' + appID + '">';
            str += '</div>';
        }
    }
    str += '</div>';
    if (!Container)
        Container = "BasicData";
    $("#" + Container).html('');
    $("#" + Container).html(str);
    for (var i = 0; i < Types.length; i++) {
        if (Types[i] == 0) {
            $("#tabs-" + (i + 1)).html(InnerHtml[i]);
        }
    }
    //$( "#tabs" ).tabs( "destroy" )
    $("#" + (id ? id : "tabs")).tabs({
        ajaxOptions: {
            error: function(xhr, status, index, anchor) {
                $(anchor.hash).html(getName("عفوا لايمكننا فتح هذا المحتوى الان سنعمل على اصلاح هذا العطل سريعاً|Couldn't load this tab. We'll try to fix this as soon as possible. "));
            }
        },
        selected: LastTabSelected
    });
    $("#" + (id ? id : "tabs")).bind("tabsselect", function(event, ui) {
        LastTabSelected = ui.index;
    });
    //$( "#tabs" ).tabs( "select" , LastTabSelected )
    if (Lang == "A")
        $("#" + (id ? id : "tabs") + " >ul >li").css("float", "right");
    if (CurrAppID != '') {
        if ($("#" + (id ? id : "tabs") + " >ul >li").find('.syshelp').length <= 0)
            $("#" + (id ? id : "tabs") + " >ul >li:last").after('<li style="float:' + (Lang == "A" ? "left" : "right") + '"><a href="#"><img  class=syshelp src="/static/images/help_icon.gif" ></a>')
        $('#' + Container).delegate('.syshelp', 'click', function() {


            var Dict = {};
            Dict["ID"] = CurrAppID;
            Dict["ScopeID"] = ScopeID;
            Dict["getNotes"] = '1'
            $.ajax({
                url: "/getJCI",
                data: {
                    param0: "systemAdmin.systemTable",
                    param1: "getSystemTableObjectByID",
                    param2: JSON.stringify(Dict)
                },
                success: function(d) {
                    var data = jQuery.parseJSON(d);

                    if (data && data.length > 0) {
                        if (data[0].notes != '') jAlert(data[0].notes)
                    }

                }
            });
        })
    }

}

function TreeMenu() {
    Locations = "<label style='color:red;font-size:11pt;' id='lblChooseScope'></label>";

    //hadeel
    if (StartScope == '') {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "general.Tree",
                param1: "StartScope"
            },
            type: "post",
            cache: false,
            async: false,
            success: function(d) {

                var data = jQuery.parseJSON(d);

                for (i1 = 0; i1 < data.length; i1++) {
                    StartScope += "," + data[i1].f3;
                    depth = data[i1].depth;
                }
            },
            error: function() {
                error();
            }
        });
    }
    $.ajax({ // tree perant nodes
        url: "/getJCI",
        data: {
            param0: "general.Tree",
            param1: "Locations",
            param2: StartScope || 'x.',
            param3: depth || 'x.'
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {

                listStartScopes = data
                var universitiesAutoCompleteList = []
                Locations = "<label style='color:red;font-size:11pt;' id='lblChooseScope'></label>";
                Locations += "<div style='margin-bottom: 8px;color:#2779aa''><input type='radio' name='shapeTree' value='1' checked >&nbsp;<label  >" + getName('الشكل الأول|The first Shape') + "</label>";
                Locations += "<input type='radio' name='shapeTree'  value='2' >&nbsp;<label >" + getName('الشكل الثانى|The second Shape') + "</label></div>";
                Locations += "<ul id='treeview' dir='" + dir + "' style='color:#045c97;'>";
                Locations += "<form id='shape2Tree' style='display: none'>	<table id=TreeTbl2>";
                if (depth == '1' || depth == "0") {
                    Locations += "			<tr height=50px>";
                    Locations += "                         <td><input type='radio'  name='scopeTreeRadio' value='1'>&nbsp;" + getName('جامعة|University') + "</td>"
                    Locations += "                         <td><select  id= 'FromUniv2' class='ui-input ui-widget-content ui-corner-all FromUniv2'style='width:100%;' onchange='drawFaculties(this)'>   <option value=''>---</option> "

                    for (i1 = 0; i1 < listStartScopes.length; i1++) {
                        universitiesAutoCompleteList.push(listStartScopes[i1].f2)
                        Locations += "<option value='" + listStartScopes[i1].item_id + "' fullsign='" + getName(listStartScopes[i1].f2) + "' >" + getName(listStartScopes[i1].f2) + "</option>"
                    }


                    Locations += "                           </select></td> "
                    Locations += "             </tr>   "
                }

                Locations += "			<tr height=50px >";
                Locations += "                         <td><input type='radio'  name='scopeTreeRadio' value='2'>&nbsp;" + getName('كلية|faculty') + " </td>"
                Locations += "                         <td><select id= 'FromFac' style='width:100%' onchange='drawProgramsLevels(this,\"program\")'>  <option value=''>---</option>                   "
                if (depth == '2') {
                    for (i1 = 0; i1 < listStartScopes.length; i1++) {
                        universitiesAutoCompleteList.push(listStartScopes[i1].f2)
                        Locations += "<option value='" + listStartScopes[i1].item_id + "' fullsign='" + getName(listStartScopes[i1].f2) + "' >" + getName(listStartScopes[i1].f2) + "</option>   "
                    }
                }


                Locations += "                           </select></td> "
                Locations += "             </tr>    "

                Locations += "			<tr height=50px>";
                Locations += "                         <td><input type='radio'  name='scopeTreeRadio' value='3'>&nbsp;" + getName('برنامج|program') + " </td>"
                Locations += "                         <td><select id= 'FromProg' style='width:100%' onchange='drawProgramsLevels(this,\"level\")' >   </select></td>                  "
                Locations += "             </tr>  "
                Locations += "			<tr height=50px>";
                Locations += "                         <td><input type='radio'  name='scopeTreeRadio' value='4'>&nbsp;" + getName('مستوى|level') + " </td>"
                Locations += "                         <td style='width: 100%'><select id= 'FromLevel' style='width: 100%'>  </select></td>                  "
                Locations += "             </tr>    "
                Locations += "   </table>   </form> ";

                Locations += "<div id='shape1Tree'>"
                for (i1 = 0; i1 < data.length; i1++) {
                    var color = "";
                    if (ScopeName == '') {
                        ScopeID = data[i1].item_id;
                        if (Lang == "A") {
                            ScopeName = data[i1].f2.split('|')[0]
                        } else {
                            ScopeName = (data[i1].f2.split('|')[1] ? data[i1].f2.split('|')[1] : data[i1].f2.split('|')[0])
                        }
                        color = "red";
                    }
                    Locations += "<li class='expandable'>";
                    Locations += "	<img style='cursor:pointer;width:14px;cursor:pointer;vertical-align:bottom;' " + ((data[i1].count != "0") ? " src='images/Tplus.png' onClick=\"NextLevel('" + data[i1].item_id + "','" + getName(data[i1].f2) + "'" + (parseInt(depth) >= 2 ? ",'lvl'" : '') + ")\" " : "src='images/Tminus.png'") + " id='img" + data[i1].item_id + "'  />";
                    Locations += "	&nbsp;"
                    //Locations += "	<span style='cursor:pointer;" + ((color != "") ? "color:" + color + ";" : "") + "' class='ClassLocationTable'  scopeValue='" + data[i1].item_id + "|" + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "'  onClick=\"setSelected($(this));\" >";//
                    Locations += "	<span style='cursor:pointer;" + ((color != "") ? "color:" + color + ";" : "") + "'  class='ClassLocationTable'  scopeValue=\"ScopeID='" + data[i1].item_id + "'|" + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "\"  onClick=\"setSelected($(this));\" >"; //
                    if (Lang == "A") {
                        Locations += data[i1].f2.split('|')[0]
                    } else {
                        Locations += (data[i1].f2.split('|')[1] ? data[i1].f2.split('|')[1] : data[i1].f2.split('|')[0])
                    }

                    // Locations += data[i1].f2.split('|')[Lang == "A" ? 0 : 1];
                    Locations += "	</span>";
                    Locations += "</li>";
                    Locations += "<ul style='display: none;' id='ul" + data[i1].item_id + "' ParentScopeValue='" + data[i1].item_id + "|" + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "'  ></ul>";
                }
                Locations += "</div>"
                Locations += "</ul>";

            }

        },
        error: function() {
            error();
        }
    });
    changeScope(ScopeID, ScopeName)
}

function getFacultiesLevels(nextPart, lvl) {
    var data = []
    if (nextPart == "")
        return []
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.Tree",
            param1: "NextLevel",
            param2: nextPart,
            param3: (lvl ? 'lvl' : 'noLvl'),
            param4: CurrAppID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            data = jQuery.parseJSON(d);
        },
        error: function() {
            error();
        }
    })
    return data
}

function NextLevel(item_id, ParentName, lvl) { // ;
    var prevPart = '';
    var nextPart = '';
    if (item_id.indexOf('|') >= 0) {
        prevPart = item_id.split('|')[0]
        nextPart = item_id.split('|')[1]
    } else {
        nextPart = item_id;
    }
    var eqn = 0;
    if (lvl)
        eqn = $('ul [id="ul' + nextPart + '"]').length - 1;
    if ($('ul [id="ul' + nextPart + '"] ').eq(eqn).prev('li').children('img').attr('src') != 'images/Tminus.png') {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "general.Tree",
                param1: "NextLevel",
                param2: nextPart,
                param3: (lvl ? 'lvl' : 'noLvl'),
                param4: CurrAppID
            },
            type: "post",
            cache: false,
            async: false,
            success: function(d) {
                var data = jQuery.parseJSON(d);
                if (data && data[0]) {
                    var ID = '';
                    var html = '';
                    var adding = true; // ما اجمعشي في حالة جامعة
                    if (nextPart.split('.').length == 2) {
                        adding = false;
                    }
                    if (lvl) {
                        adding = true;
                    }



                    for (i1 = 0; i1 < data.length; i1++) {
                        if (data[i1].item_type == '7.3.' || data[i1].item_type == '7.')
                            adding = true;
                        html += "<li class='" + ((data[i1].count != "0") ? "expandable" : "last") + "'>"
                        // يتم وضع هذا الجزء علشان  تربية
                        if ((data[i1].f2).search(/<font color=blue>/gi) < 0) {
                            html += "	<img style='cursor:pointer;width:14px;cursor:pointer;vertical-align:bottom;' " + ((data[i1].count != "0" && data[i1].item_type != '7.3.') ? " src='images/Tplus.png' onClick=\"NextLevel('" + (prevPart || lvl ? item_id + '|' : '') + data[i1].item_id + "','" + ParentName + ' - ' + getName(data[i1].f2) + "','" + (data[i1].item_type == '7.' ? 'lvl' : 'noLvl') + "')\" " : "src='images/Tminus.png'") + "   id='img" + data[i1].item_id + "'   />"
                            html += "	&nbsp;";
                            //html += "		<span style='cursor:pointer;' class='ClassLocationTable' scopeValue='" + (adding ? item_id + '|' + data[i1].item_id : data[i1].item_id) + "|" + data[i1].f6 + "|" + ParentName + ' - ' + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "' onClick=\"setSelected($(this));\" >" + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "</span></li>"; //changeScope('"+data.rows[i1].row.item_id+"','"+data.rows[i1].row.f2.split('|')[Lang=="A" ? 0 : 1]+"')
                            html += "		<span style='cursor:pointer;' class='ClassLocationTable' scopeValue=\"" + (adding ? (item_id.indexOf("|") >= 0 ? ("ScopeID='" + item_id.split('|')[0] + "'|ScopeProgID='" + item_id.split('|')[1] + "'|ScopeLevelID='" + data[i1].item_id) : ("ScopeID='" + item_id + "'|ScopeProgID='" + data[i1].item_id)) : "ScopeID='" + data[i1].item_id) + "'|ScopeProgType='" + data[i1].f6 + "'|" + ParentName + ' - ' + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "\" onClick=\"setSelected($(this));\" >" + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "</span></li>"; //changeScope('"+data.rows[i1].row.item_id+"','"+data.rows[i1].row.f2.split('|')[Lang=="A" ? 0 : 1]+"')
                            html += "<ul style='display:none;' id='ul" + data[i1].item_id + "'></ul>";

                        } else {
                            html += "		<span class='ClassLocationTable' >" + data[i1].f2.split('|')[Lang == "A" ? 0 : 1] + "</span></li>";
                        }
                    }
                    if ($('ul [id="ul' + nextPart + '"]').length > 1) // هاشتغل مع اخر واحد
                    {
                        var eqn = 0;
                        if (lvl)
                            eqn = $('ul [id="ul' + nextPart + '"]').length - 1;
                        else
                            eqn = 0
                        $('ul [id="ul' + nextPart + '"] ').eq(eqn).show();
                        $('ul [id="ul' + nextPart + '"] ').eq(eqn).html(html);
                        $('ul [id="ul' + nextPart + '"] ').eq(eqn).prev('li').children('img').attr('src', 'images/Tminus.png');
                    } else
                        $('ul [id="ul' + nextPart + '"]').html(html);
                    document.getElementById('img' + nextPart).src = 'images/Tminus.png';
                    document.getElementById('ul' + nextPart).style.display = '';
                } else {
                    $('ul [id="ul' + nextPart + '"]').hide();
                    if ($('ul [id="ul' + nextPart + '"]').length > 1) {

                        $('ul [id="ul' + nextPart + '"] ').eq(eqn).hide();
                    }
                    $("#img" + nextPart).removeClass("expandable");
                    $("#img" + nextPart).addClass("collapsable");
                    document.getElementById('img' + nextPart).src = 'images/Tplus.png';
                }
            },
            error: function() {
                error();
            }
        });
    } else {
        if (document.getElementById('ul' + nextPart).style.display == '') {
            $('ul [id="ul' + nextPart + '"] ').eq(eqn).hide();
            //document.getElementById('img'+nextPart).src='images/Tplus.png';
            $('ul [id="ul' + nextPart + '"] ').eq(eqn).prev('li').children('img').attr('src', 'images/Tplus.png');
            $("#img" + item_id).removeClass("collapsable");
            $("#img" + item_id).addClass("expandable");
        } else {
            $('ul [id="ul' + nextPart + '"] ').eq(eqn).hide();
            //document.getElementById('img'+nextPart).src='images/Tminus.png';
            $('ul [id="ul' + nextPart + '"] ').eq(eqn).prev('li').children('img').attr('src', 'images/Tminus.png');
            $("#img" + nextPart).removeClass("expandable");
            $("#img" + nextPart).addClass("collapsable");
        }
    }
}

//Amira
function setSelected(obj) {
    $('.ClassLocationTable').each(function(index) {
        $(this).removeAttr("selectedValue");
        $(this).css("background-color", "#f1f5f8");
    });
    obj.attr('selectedValue', 'true');
    $(obj).css("background-color", "#94ccf7");
}

function ShowScopeDialog() { //hadeel
    // Locations=""
    //     valueRadioClick = sessionStorage.getItem('radioTree');
    //    $("input[name=shapeTree][value='"+valueRadioClick+"']").prop('checked', true);
    //var treeContentShape1="";
    var listStartScopes = [];

    if (Locations == "")
        TreeMenu();

    var Dict = {}
    Dict["Flag"] = "Scope";
    Dict["Title"] = ((Lang == "A") ? "إختيار الموقع" : "Locations");
    Dict["str"] = Locations;
    Dict["overlay"] = true;
    Dict["Action"] = "closeTreeDialog()";
    CreateDialog(Dict);

}

//AmiraAlkhwaga
function ShowUserDataDialog() {
    UserData = GetUserData();
    var Dict = {}
    Dict["Flag"] = "UserData";
    Dict["str"] = UserData;
    Dict["Title"] = ((Lang == "A") ? "بيانات المستخدم" : "User data");
    Dict["Action"] = "closeTreeDialog()";
    Dict["overlay"] = true;

    CreateDialog(Dict);
    flagYearSemester = sessionStorage.getItem('flagYearSemester');

    if (flagYearSemester == '0') {

        //$("#slcSemester").hide();
        //$("#slcAcadmic").prop( "disabled", true );
        //$("#slcSemester").prop( "disabled", true );
        $("#AcdRow").hide();
        $("#SemRow").hide();
    }


}

//function CheckYearSemester() {
//
//}
function GetUserData() {
    UserData = "";
    UserData += "<table id='UserDataTbl' dir='" + dir + "'>";
    flagYearSemester = sessionStorage.getItem('flagYearSemester');

    if (RegType == 'AcademicAdvisorReg' && flagYearSemester == 0) {
        UserData += "<tr><td style='text-align:center;padding-top:20px'><span style='font-weight:bold;color:red;font-size:17px'>ليس لك الحق بالتعديل</span></td></tr>"

    }
    //  if (typeof RegType == 'undefined' || RegType != 'AcademicAdvisorReg') {
    UserData += "	<tr><td><span>" + Language + "</span></td><td><select id='slcLang'>";
    if (Lang == 'A') {
        UserData += "<option value='A' selected>" + Arabic + "</option><option value='E'>" + English + "</option>";
    } else {
        UserData += "<option value='A' >" + Arabic + "</option><option value='E' selected>" + English + "</option>";
    }
    UserData += "		</select></td></tr>";
    //}
    UserData += "  	<tr id='AcdRow'><td><span>" + Acadmicyear + "</span></td><td><select id='slcAcadmic'></select></td></tr> ";
    UserData += "	<tr id=SemRow><td><span>" + Semester + "</span></td><td><select id='slcSemester'></select></td></tr> ";
    UserData += "</table>";
    return UserData;
}

function ShowChangePassDialog() {

    PassData = GetPassData();
    var Dict = {}
    Dict["Flag"] = "PassData";
    Dict["str"] = PassData;
    Dict["Title"] = ((Lang == "A") ? "تغيير كلمة المرور" : "Change Password");
    Dict["Action"] = "closeTreeDialog()";
    Dict["overlay"] = true;
    CreateDialog(Dict);
}

function showChangePasswordAutomatic() {

    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        data: {
            param0: "systemAdmin.sysUsersData",
            param1: "check_password_to_change",
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                if (data.show_dialog) {
                    PassData = GetPassData();
                    var Dict = {}
                    Dict["Flag"] = "PassData";
                    Dict["str"] = PassData;
                    Dict["Title"] = ((Lang == "A") ? "تغيير كلمة المرور" : "Change Password");
                    // Dict["Action"] = "closeTreeDialog()";
                    //  Dict["overlay"] = true;
                    CreatePrivateDialogPassword(Dict);
                }

            }

        },
        error: function() {
            error();
        }
    });
}

function GetPassData() {
    // patternReg=`^(|[^'"\\\\])*$`
    pattern = "[^'\x22]+"
    PassData = "";
    PassData += "<table id='ChangePassTbl' dir='" + dir + "'>";
    PassData += "<tr><td><span>" + OldPassword + "</span></td><td><input id='OldPassTxt' name='OldPassTxt'  pattern=" + pattern + "  type='password'/></td></tr>"
    PassData += "<tr><td><span>" + NewPassword + "</span></td><td><input id='PassTxt' name='PassTxt' pattern=" + pattern + " type='password'/></td></tr> ";
    PassData += "<tr><td><span>" + RePassword + "</span></td><td><input id='RePassTxt' name='RePassTxt' type='password'/></td></tr> ";
    PassData += "</table>";
    return PassData;
}

//----------//

function closeTreeDialog() {
    if ($("#treeview").length > 0) {
        var shapeValueRadio = $("input[name='shapeTree']:checked").val()
        Locations = "<div style='margin-bottom: 8px;color:#2779aa'><input type='radio' name='shapeTree' value='1' " + ((shapeValueRadio == '1') ? 'checked' : '') + " >&nbsp;<label >" + getName('الشكل الأول|The first Shape') + "</label>";
        Locations += "<input type='radio' name='shapeTree'  value='2' " + ((shapeValueRadio == '2') ? 'checked' : '') + ">&nbsp;<label >" + getName('الشكل الثانى|The second Shape') + "</label></div>";
        Locations += "<ul id='treeview' dir='" + dir + "'>" + $("#treeview").html() + "</ul>";
    }

}

function changeScope(id, name, shape = 'shape1') {
    $("#treeview .ClassLocationTable").css("color", "#000000");
    if (id && shape == 'shape1') {
        $("img[id='img" + id + "']").next().css("color", "Red")
    }
    if (shape == 'shape2')
        ScopeID = id

    ScopeName = name;
    ChangeScopeNamewithAcadmicYear();
    if (CurrAppID != "") {

        if (typeof RegType !== 'undefined' && RegType == 'AcademicAdvisorReg') {
            stuffShowApp();
        } else {
            ShowApp();
        }

    }
}

// hadeel edits
function testLoading(targetId, url) {
    if (!$('#' + targetId).html()) {
        $('#' + targetId).load(url);
    }

}

//Amira/////////////////////////////////////
/*_radwa_*/
function FloatingMenu() {
    $float_speed = 1500; //milliseconds
    $float_easing = "easeOutQuint";
    $menu_fade_speed = 500; //milliseconds
    $page_load_fade_delay = 2000; //milliseconds
    $closed_menu_opacity = 0.75;

    //cache vars
    $fl_menu = new Object();
    $fl_menu_menu = new Object();
    $fl_menu_label = new Object();
    $fl_menu_item = new Object();

    //handle aabic and english classes
    if ($("#fl_menu").hasClass('fl_menuAr')) {
        $fl_menu = $("#fl_menu");
        $fl_menu_menu = $("#fl_menu .menuAr");
        $fl_menu_label = $("#fl_menu .labelAr");
        $fl_menu_item = $("#fl_menu .menuAr .menu_itemAr");
    } else {
        $fl_menu = $("#fl_menu");
        $fl_menu_menu = $("#fl_menu .menuEn");
        $fl_menu_label = $("#fl_menu .labelEn");
        $fl_menu_item = $("#fl_menu .menuEn .menu_itemEn");
    }
    //menuPosition = $fl_menu.position().top;
    //FloatMenu();
    $fl_menu_item.delay($page_load_fade_delay).fadeTo($menu_fade_speed, 0, function() {
        $fl_menu_item.css("display", "none");
    });
    $fl_menu_label.click(function() {
        if ($fl_menu_item.css("display") == 'none') { //mouse click  display empty
            //stop fadeing label
            $fl_menu_label.stop().fadeTo($menu_fade_speed, 1);
            //show items
            $fl_menu_item.css("display", "block").stop().fadeTo($menu_fade_speed, 1);
        } else { //mouse click &data displayed
            $fl_menu_label.stop().fadeTo($menu_fade_speed, $closed_menu_opacity, function() {
                $fl_menu_item.css("display", "none");
            });
            $fl_menu_item.stop().fadeTo($menu_fade_speed, 1);
        }
    });
    //$fl_menu_label.click(function(){
    //	});
    //$(window).scroll(function () {
    //	FloatMenu();
    //});
    //function FloatMenu(){
    //	var scrollAmount=$(document).scrollTop();
    //	var newPosition=menuPosition+scrollAmount;
    //	if($(window).height()<$fl_menu.height()+$fl_menu_menu.height()){
    //		$fl_menu.css("top",menuPosition);
    //	} else {
    //		$fl_menu.stop().animate({top: newPosition}, $float_speed, $float_easing);
    //	}
    //}
}

//hadeel app level
function ChekAppLevel(level, allowMsg) {
    var res = false;
    var msg = ' ';
    // abdullah Change 34.1.% to acadmic type
    if (!level)
        res = true;
    else if (level == '0') {



        if (typeof ScopeID != 'undefined' && ScopeID + "" != "" && CheckScopeRight(ScopeID, "34.1.1.") && ScopeProgID == "" && ScopeLevelID == "") {
            res = true;
        } else {
            if (allowMsg)
                msg = ("يجب اختيار جامعة لهذا التطبيق |This application deals with university only ");
            res = false;
        }
    } else if (level == '1') {
        if (typeof ScopeID != 'undefined' && ScopeID + "" != "" && (CheckScopeRight(ScopeID, "34.1.2.") || CheckScopeRight(ScopeID, "34.1.4.")) && ScopeProgID == "" && ScopeLevelID == "") {
            res = true;
        } else {
            if (allowMsg)
                msg = ("يجب اختيار كلية لهذا التطبيق|This application deals with Faculty only ");
            res = false;
        }
    } else if (level == '2') {
        if (typeof ScopeID != 'undefined' && ScopeID + "" != "" && ScopeProgID != "" && ScopeLevelID == "") {
            res = true;
        } else {
            if (allowMsg)
                msg = ("يجب اختيار برنامج لهذا التطبيق|This application deals with programs only ");
            res = false;
        }
    } else if (level == '3') {
        if (typeof ScopeID != 'undefined' && ScopeID + "" != "" && ScopeLevelID != "") {
            res = true;
        } else {
            if (allowMsg)
                msg = ("يجب اختيار مستوى لهذا التطبيق|This application deals with levels only ");
            res = false;
        }
    } else if (res == false && !allowMsg)
        msg = ("لا يمكنك التعامل مع هذا التطبيق برجاء مراجعة المجال |Cann't deal with this application Please check the scope");
    if (!res && msg != ' ') {
        $('#scopeDiv').trigger('click');
        $("#lblChooseScope").html(getName(msg));
    }
    return res;

}

function getNewMessages() {

    var data = {
        param0: "Mail.Mail",
        param1: "getNewMessages"
    };
    if ($('#emailTable.Indox').length > 0) {
        data['param2'] = "1";
    }
    $.ajax({
        url: "/getJCI",
        data: data,
        type: "post",
        cache: false,
        async: false,
        dataType: 'json',
        success: function(data) {
            if (data && data['count'] == 0) {
                $('#mailTD').html($('#mailTD').clone().children().remove().end().text());
                $('#urmCount').html('');
            } else {
                $('#mailTD').html($('#mailTD').clone().children().remove().end().text() + '<span class="notification">' + data['count'] + '</span>');
                $('#urmCount').html('(' + data['count'] + ')');
            }
            if (data && data['messages'] > 0) {

            }
        },
        error: function() {
            //error();
        }
    });
}