var check_bug;

function AdjustSystemHeight() {

    var HeaderHeight = parseInt($("#TDHeaderHomePage").height());
    //var FooterHeight=($("#TDFooterHomePage")?parseInt($("#TDFooterHomePage").height()):0);

    $("#HomePageMainContent").css("height", screen.height - HeaderHeight + "px");
}

function randomNumber() {
    return Math.floor(Math.random() * 100000);
}

/////////////////////////////////CheckScopeRight
function CheckScopeRight(ScopeID, FoundationType) {
    var chkscope = false;
    var params = {
        param0: "general.BasicData",
        param1: "ChkScope",
        param2: ScopeID,
        param3: FoundationType
    };
    //Rights(object):    def CheckScopeRigh
    $.ajax({
        url: "/getJCI",
        type: "POST",
        data: params,
        cache: false,
        async: false,
        //processData: false,
        error: function(xhr, err) {
            chkscope = false;
        },
        success: function(data) {
            var results = jQuery.parseJSON(data);
            try {
                if (results) {
                    chkscope = true;
                } else {
                    chkscope = false;
                }
            } catch (e) {
                e = null;
                chkscope = false;
            }
        },
        complete: function(jqXHR, textStatus) {

        }
    });
    return chkscope;
}


function error() {
    document.body.style.cursor = "default";
    if (Lang == "A")
        jAlert("عفوا لقد حدث خطأ أثناء تحميل الصفحة من فضلك أبلغ المسوؤل عن النظام");
    else
        jAlert("An error occured while select options loading, please contact your system administrator.");

}

String.prototype.trim = function() {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function dicToString(dic) {
    data = "{";
    for (var s in dic) {
        if (data != "{")
            data += ",";
        data += '"' + s + '":"' + dic[s] + '"';
    }
    data += "}";
    return data;
}

function ReqFix(str) {
    return str.trim().replace(/  /gi, " ").replace(/\//g, " ").replace(/'/gi, "’").replace(/"/gi, "”").replace(/\\/gi, "").replace(/>/gi, "&gt;").replace(/\n/gi, " ").replace(/\f/gi, " ").replace(/\r/gi, " ").replace(/\t/gi, " ").replace(/\v/gi, " ").replace(/\r\n\r\n/gi, "\r\n").replace(/\r\n/gi, "<br>").replace(/<br><br>/gi, "<br>").replace(/<br> <br>/gi, "<br>").replace(/</gi, "&lt;");
}

function UnReqFix(str) {
    return str.replace(/’/gi, "'").replace(/”/gi, "\"").replace(/<br>/gi, "\r\n").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}

function replaceNewLine(myString, nFlag) {
    if (nFlag == 0) {
        var regX = /\r\n|\r|\n/g;
        var replaceString = '<br>';
    } else {
        var regX = /<br>/g;
        var replaceString = '\n'
    }
    return myString.trim().replace(regX, replaceString).replace(/  /gi, " ").replace(/'/gi, "’").replace(/"/gi, "”").replace(/\\/gi, "");
}

function isEnglishLetterKey(evt, value) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    var txt = String.fromCharCode(charCode)
    if (txt.match(/^[a-zA-Z\b ]+$/)) {
        if (charCode == 32) {
            var last_char = value.charAt(value.length - 1);
            if (last_char == " ")
                return false;
        }
        return true
    }
    return false
}

function isEnglishLetterNumbersKey(evt, value) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var txt = String.fromCharCode(charCode);
    if (txt.match(/^[a-zA-Z0-9\b ]+$/)) {
        if (charCode == 32) {
            var last_char = value.charAt(value.length - 1);
            if (last_char == " ")
                return false;
        }
        return true;
    }
    return false;
}

function GetPrograms(ColID, selectedId) {
    var str = "";
    var Name = "";
    var ID = "";
    var DictSearch = {};
    DictSearch["PageNO"] = 1;
    var PageNO = 1;
    DictSearch["Total"] = 0;
    DictSearch["PageSize"] = 100;
    DictSearch["ScopeID"] = ColID;
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: false,
        data: {
            param0: "general.Search",
            param1: "SearchForProgram",
            param2: dicToString(DictSearch),
            param3: ColID
        },
        success: function(d) {

            var data = jQuery.parseJSON(d);
            var selected = "";
            if (data) {
                for (var x = 0; x < data.length; x++) {
                    selected = "";
                    Name = getName(data[x].Name);
                    ID = data[x].ID;
                    if (ID == selectedId) {
                        selected = " selected = selected "
                    }
                    str += '<option "' + selected + '" value="' + ID + '" title="' + Name + '">' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;
}

function ConvertNumberToArabic(number) {
    if (number && number != "null") {
        const numberPattern = /\d+/g;

        const easternNumerals = {
            '0': '٠',
            '1': '١',
            '2': '٢',
            '3': '٣',
            '4': '٤',
            '5': '٥',
            '6': '٦',
            '7': '٧',
            '8': '٨',
            '9': '٩'
        };

        number = String(number).replace(/\d/g, digit => easternNumerals[digit]);
    }
    return number
    // const convertedVariable1 = variable1.replace(numberPattern, match => convertToEasternArabic(match));

}

function isArabicLetterKey(evt, value) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    var txt = String.fromCharCode(charCode)
    if (txt.match(/^[ء-ي\b ]+$/)) {
        if (charCode == 32) {
            var last_char = value.charAt(value.length - 1);
            if (last_char == " ")
                return false;
        }
        return true
    }
    return false
}

function isArabicLetterNumbersKey(evt, value) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var txt = String.fromCharCode(charCode);
    if (txt.match(/^[ء-ي0-9\b ]+$/)) {
        if (charCode == 32) {
            var last_char = value.charAt(value.length - 1);
            if (last_char == " ")
                return false;
        }
        return true;
    }
    return false;
}

function parseArabic(numberInput) { // PERSIAN (فارسی), ARABIC (عربي) , URDU (اُردُو)

    numberInput = (numberInput.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
        return d.charCodeAt(0) - 1632;
    }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
        return d.charCodeAt(0) - 1776;
    }));
    return numberInput
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode >= 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isDecimaltKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 46) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function NoDataToShow() {
    var str = "<center><span style='font-weight: bold; font-family: arial; font-size: 20px; color: red;'>" + (Lang == "A" ? "لا يوجد بيانات للعرض" : "No Data To be shown") + "</span></center>";
    return str;
}

function DoNotHaveRight() {
    var str = "<center><span style='font-weight: bold; font-family: arial; font-size: 20px; color: red;'>" + (Lang == "A" ? "ليس لك الحق فى إستخدام هذا التطبيق ." : "You do not have the right to regularly use this application.") + "</span></center>";
    DesignFrame(CurrAppName, str, true);
    SideMenu(CurrAppName, str, true);
}

function CheckAppsRight4Access(RightNumber) {
    var str = false;
    if (RightNumber != "") {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "general.BasicData",
                param1: "CheckAppsRight4Access",
                param2: CurrAppID || 'x.',
                param3: ScopeID || 'x.',
                param4: RightNumber,
                param5: "IP",
                param6: ScopeProgID || 'x.',
                param7: userType

            },
            type: "post",
            cache: false,
            async: false,
            success: function(d) {
                var data = jQuery.parseJSON(d);
                if (data) {
                    str = true;
                }
            },
            error: function() {
                error();
            }
        });
    }
    return str;
}


function CheckRight4Access(RightNumber) {
    var str = false;
    if (RightNumber != "") {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "general.BasicData",
                param1: "CheckRight4Access",
                param2: CurrAppID || 'x.',
                param3: ScopeID || 'x.',
                param4: RightNumber,
                param5: ScopeProgID || 'x.',
                param6: userType
            },
            type: "post",
            cache: false,
            async: false,
            success: function(d) {
                var data = jQuery.parseJSON(d);
                if (data) {
                    str = true;
                }
            },
            error: function() {
                error();
            }
        });
    }
    return str;
}


function ChangeScopeNamewithAcadmicYear() {
    //userID send
    //if (typeof RegType === 'undefined') {
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General ",
            param1: "GetUserData" //,
            //param2 : userID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                Lang = data[0].Lang;
                //var AcademicSemesters = data[0].AcademicSemester;
                var AcademicSemesterNames = data[0].AcademicSemesterName;
                //var part = 0;
                AcademicYear = data[0].AcademicYear;
                AcademicYearName = data[0].AcademicYearName;
                //if (ScopeProgType == "StudyYear") {
                //	part = 1;
                //}
                //AcademicSemester = AcademicSemesters[part];
                AcademicSemester = data[0].AcademicSemester;
                AcademicSemesterName = data[0].AcademicSemesterName;

                /*_radwa_*/
                username = data[0].username;
                _UserID = data[0]["_UserID"];
                emailUser = data[0]["emailUser"]
                scopeUser = data[0]["scopeUser"]
                telephoneUser = data[0]["telephoneUser"]

            }
        },
        error: function() {
            error();
        }
    });
    //}
    if (AcademicSemesterName) {

        if (Lang == 'A') {
            AcademicSemesterName = AcademicSemesterName.split('|')[0];
            AcademicSemesterName = "  الفصل الدراسي " + AcademicSemesterName;
        } else {
            AcademicSemesterName = AcademicSemesterName.split('|')[1];
            AcademicSemesterName = AcademicSemesterName + " semester  ";
        }
    }
    AcademicYearName = AcademicYearName.split('|')[0];

    $("#ScopeName").html(ScopeName.replace('University', 'Univ') + '<br> ' +
        (Lang == 'A' ? ' العام الاكاديمى ' : 'Acad.Year ') + AcademicYearName + (Lang == 'A' ? ' - ' : ', ') +
        AcademicSemesterName + ' ' + (CurrentAcadmicYear != '' ? "&nbsp;<div value='" + AcademicYear + "|" + AcademicSemester + "' dir='" + dir + "' style='display:inline;color:#ffff22;'>(" + getFullGraduationYear(CurrentAcadmicYear) + ")</div>" : "")); //+ "<div id='DivDialogScopeName'></div>"
}

function GetRigthLevel() {
    var appRight = 0;
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.BasicData",
            param1: "GetRightLevel",
            param2: CurrAppID || 'x.',
            param3: ScopeID,
            param4: ScopeProgID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                appRight = data;
                /*_radwa_*/
            }
        },
        error: function() {
            error();
        }
    });
    return parseInt(appRight);
}

function GetDatePickerDict() {
    return {
        closeText: 'إغلاق',
        prevText: '&#x3c;السابق',
        nextText: 'التالي&#x3e;',
        currentText: 'اليوم',
        monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        monthNamesShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
        dayNamesMin: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
        weekHeader: 'أسبوع',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
}

function LoadDatePicker() {
    if (Lang == "A") {
        jQuery(function($) {
            $.datepicker.regional['ar'] = GetDatePickerDict();
            $.datepicker.setDefaults($.datepicker.regional['ar']);
        });
    } else $.datepicker.setDefaults($.datepicker.regional['en']);
    $.datepicker.setDefaults({
        dateFormat: 'dd/mm/yy'
    });
}

function fillSelectWithNumbers(selectName, step, startNumber, endNumber, selected) {
    if (!startNumber && startNumber != 0) startNumber = 1;
    if (!endNumber) endNumber = 30;
    if (!step) step = 1;
    var str = "";
    for (var x1 = startNumber; x1 <= endNumber; x1 += step) {
        if (selectName == "") str += "<option value='" + x1 + "' " + ((x1 == selected) ? "selected" : "") + ">" + x1 + "</option>";
        else $("<option value='" + x1 + "' " + ((x1 == selected) ? "selected" : "") + ">" + x1 + "</option>").appendTo("#" + selectName);
    }
    return str;
}

function getFullGraduationYear(graduationYear) {
    if (Lang == "A")
        return graduationYear + "-" + (parseInt(graduationYear) - 1);
    else
        return (parseInt(graduationYear) - 1) + "-" + graduationYear;
}

function GetAcademicYears(SelectID, OptionFlag) {
    var Selected = parseInt(CurrentAcadmicYear);
    if (!SelectID) SelectID = "";
    if (!OptionFlag) OptionFlag = false;
    var str = ""
    if (SelectID != "") $("#" + SelectID).html('');
    if (StartYear != "" && EndYear != "") {
        if (OptionFlag == true) {
            if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
            else str += '<option value="">---</option>';
        }
        for (var i = parseInt(EndYear); i >= parseInt(StartYear); i--) {
            var Name = getFullGraduationYear(i);
            var ID = i;
            if (SelectID != "") $("<option value='" + i + "'  " + ((i == Selected) ? "selected" : "") + "  title='" + getFullGraduationYear(i) + "'>" + getFullGraduationYear(i) + "</option>").appendTo("#" + SelectID)
            else str += '<option value="' + i + '"  ' + ((i == Selected) ? "selected" : "") + '  title="' + getFullGraduationYear(i) + '">' + getFullGraduationYear(i) + '</option>';
        }
    }
    return str;
}

function getFoundationUser(FoundID, selectClass) {
    if (FoundID && FoundID != "") {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "systemAdmin.sysUsersData",
                param1: "getFoundationUser",
                param2: FoundID
            },
            type: "post",
            cache: false,
            async: false,
            success: function(data1) {

                var data = jQuery.parseJSON(data1);


                str = $("<option value='" + FoundID + "'  title='" + data[0]['Name'] + "'>" + getName(data[0]['Name']) + "</option>").appendTo("." + selectClass)


            }
        });
    }

}

function getLevels() {
    var str = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "StudyPlanData.StudyPlan",
            param1: "get_levels",
            param2: ScopeID,
            param3: ScopeProgID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(data1) {
            var data = jQuery.parseJSON(data1);
            if (data) {
                str += '<option value="">---</option>';
                for (var x = 0; x < data.length; x++) {
                    var Name = getName(data[x].levelName);
                    var ID = data[x].levelId;
                    str += '<option value="' + ID + '"    title="' + Name + '"     >' + Name + '</option>';


                }

            }
        }

    });
    return str;


}

function get_printed_doc() {
    var str = "";
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: false,
        data: {
            param0: "StudentBasicData.Reports",
            param1: "get_system_report",
        },
        success: function(data1) {
            var data = jQuery.parseJSON(data1);
            var data = data['report_data']
            if (data) {
                str += '<option value="">---</option>';
                for (var x = 0; x < data.length; x++) {
                    var Name = getName(data[x].Name);
                    var ID = data[x].ID;
                    str += '<option value="' + ID + '"    title="' + Name + '"     >' + Name + '</option>';


                }

            }
        },
        error: function() {
            alert("Error in get_printed_doc");
        }
    });
    return str;
}

function check_document_block_for_student(student_data) {
    var block_dict = {};
    if ("student_id" in student_data && "year_id" in student_data && "semester_id" in student_data && "report_id" in student_data) {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "EducationPrintedDocument.DocumentData",
                param1: "check_document_block_for_student",
                param2: JSON.stringify(student_data),

            },
            type: "post",
            cache: false,
            async: false,
            success: function(data1) {
                block_dict = jQuery.parseJSON(data1);

            }
        });
    }
    return block_dict;
}

function DrawHeaderReport(header, rightlogo, leftlogo, cssRightLogoStyle = "", cssLeftLogoStyle = "", showLogoCheck = true, allDistance = {}, fontSize = '', accreditationDict = {}, pageNo = null, fontFamily = "", HLang = Lang) {

    if (fontSize == '') {
        fontSize = "10"
    }
    if (cssLeftLogoStyle == '') {
        cssLeftLogoStyle = "width:120px;height:120px;"
    }
    if (cssRightLogoStyle == '') {
        cssRightLogoStyle = "width:120px;height:120px;"
    }
    var top = "",
        bottom = "",
        left = "",
        right = "";
    if (Object.keys(allDistance).length > 0) {
        top = allDistance['top']
    }

    tablebuilderHeader = " <table id=headerTbl name=headerTbl border=0  dir=" + (HLang == 'A' ? 'rtl' : 'ltr') + "  style='height:70px;width:100%'> "
    tablebuilderHeader += "        <tr>"
    tablebuilderHeader += "            <TD  style='color=#990000;font:12pt arial;text-align:center;width:20%' align=center >" + (!showLogoCheck || rightlogo == "" ? "" : "<IMG src='/static/images/" + rightlogo + "'  style='" + cssRightLogoStyle + "'  id='ImgLogo' ><br>") + "</TD> "
    tablebuilderHeader += "     <TD  align='center' style='color:#2779c3;font-weight:bold;font-size:16px;text-align:center;" + (top ? 'padding-top:' + top + 'px' : '') + "' ><b><font style='font-size:" + fontSize + "pt;" + (fontFamily ? 'font-family:' + fontFamily + '' : '') + "'>" + header + " </font> </TD>"
    tablebuilderHeader += "     <td style='width:20%'><br>" + (!showLogoCheck || leftlogo == "" ? "" : "<IMG src='/static/images/" + leftlogo + "'   id='ImgLogo' style='" + cssLeftLogoStyle + "' ><br>") + "</td> </tr>"
    tablebuilderHeader += "    <TR  style='width:80%' align='center'> "
    if (Object.keys(accreditationDict).length) {
        tablebuilderHeader += "<td style='white-space: nowrap;width:100px;'>"
        tablebuilderHeader += "<label style='font-weight: bold;font-size:12px'>" + (accreditationDict['languageAccreditation'] == 'A' ? accreditationDict['accreditationDecision'] : accreditationDict['accreditationDecisionEn']) + (accreditationDict['accreditationStartDate'] ? (accreditationDict['accreditationStartDate']) : "") + (accreditationDict['accreditationEndDate'] ? (accreditationDict['accreditationEndDate']) : "") + "</font>"
        tablebuilderHeader += "</td>"
    }
    tablebuilderHeader += "           <TD colspan=3 style='color=#990000;font:12pt arial;' valign='bottom'  align = " + ((HLang == "A") ? "left" : "right") + "  ><font style='font-size:12px;color:#000000;'  >" + ((HLang == "A") ? "نظام ابن الهيثم لإدارة شئون الطلاب " : "Ibn-Hythim System Credit Hours ") + " " + GetDate() + "</font> "
    if (typeof username !== 'undefined') {

        if (username) {
            tablebuilderHeader += "<font style='font-size:12px;color:#000000;'>" + getName("مستخرج البيان|Statement Extractor", HLang) + " " + getName(username, HLang) + (pageNo ? " " + getName("صفحة|page") + " " + pageNo : "") + "</font>"
        }
    }
    tablebuilderHeader += "            </td> "
    tablebuilderHeader += "    </tr>"
    tablebuilderHeader += "</table>"
    return tablebuilderHeader

}

function getPreviousFoundation(FoundID, selectID) {



    //if (JobLocationId=="") {
    //	JobLocationId=ScopeID;
    //}


    Data = {}
    Data["FoundID"] = FoundID;
    Data["JobLocationId"] = ScopeID;


    $.ajax({
        url: "/getJCI",
        data: {
            param0: "systemAdmin.sysUsersData",
            param1: "getFoundationUserPrevious",
            param2: dicToString(Data)
        },
        type: "get",
        cache: false,
        async: false,
        success: function(data1) {

            var data = jQuery.parseJSON(data1);
            //$("<option value='"+FoundID+"'  title='"+data[0]['Name']+"'>"+getName(data[0]['Name'])+"</option>").appendTo("#slcWork")
            //

            if (data != "") {


                $.each(data, function(k, v) {

                    $('#' + selectID).html("<option value='" + data[k]['ID'] + "'  title='" + data[k]['Name'] + "'>" + getName(data[k]['Name']) + "</option>")

                });


            }


        }
    });


}

function get_map_degrees(Dict, addEmptyOption = true) {

    var str = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "basicAttributes.basicAttributes",
            param1: "Map_Degrees_tbl",
            param2: JSON.stringify(Dict),
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            var str_title = ''
            if (data && data[0]) {
                MapDegrees = data[0]['MapDegrees'];
                if (addEmptyOption) str += '<option value="">---</option>';

                for (var x = 0; x < data.length; x++) {
                    var Name = "";
                    Name = getName(data[x].name_deg);
                    var ID = data[x].ID;
                    if (MapDegrees) {
                        str_title = MapDegrees[ID]
                    }

                    str += '<option value="' + ID + '"    title="' + Name + '"   titleEn="' + str_title + '"  >' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    if (str != "")
        return str;

}

function GetDegreeName(Dict) { /*Dict[item_id]*/
    if (!Dict)
        return false;
    var Name = "";
    var str = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "basicAttributes.basicAttributes",
            param1: "Map_Degrees_tbl",
            param2: dicToString(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                for (var x = 0; x < data.length; x++) {
                    Name = getNameByDic(data[x].name_deg, Lang);
                    var ID = data[x].ID;
                }
            }
        },
        error: function() {
            error();
        }
    });
    return Name;
}

function get_rule_military(university_id) {
    var military_type_male_female = '0'
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "systemAdmin.SystemRule",
            param1: "getSystemRulesMilitaryData",
            param2: university_id,
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var result = jQuery.parseJSON(d);
            if (result) {
                military_type_male_female = result["militaryTypeCheck"];

            }
        },
        error: function() {
            error();
        }
    });
    return military_type_male_female;



}

function GetBasicattributes(Dict, Selected, SelectID, OptionFlag, lvlFlag, FlagAcadmic) {

    /*Dict[item_id],Dict[order]*/
    if (!Dict) return false;
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    if (SelectID != "") $("#" + SelectID).html('');
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetBasicattributes",
            param2: JSON.stringify(Dict),
            param3: (lvlFlag ? lvlFlag : '')
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data && data[0]) {
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }
                for (var x = 0; x < data.length; x++) {
                    var Name = "";
                    //if (FlagAcadmic!=""){
                    //	Name=data[x].Name.split('|')[0];
                    //

                    //}else{
                    //	Name=getName(data[x].Name);
                    //}


                    Name = getName(data[x].Name);


                    var ID = data[x].ID;
                    if (SelectID != "") $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
                    else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    if (str != "")
        return str;
}

function SuccessGrades(ProgID) {
    var str = ""
    if (ProgID) {

        $.ajax({
            url: "/getJCI",
            type: "post",
            cache: false,
            data: {
                param0: "general.General",
                param1: "getSuccessGrades",
                param2: ProgID
            },
            async: false,
            success: function(d) {
                var data = jQuery.parseJSON(d);
                str += '<option value=""  title="">---</option>';
                for (var x = 0; x < data.length; x++) {
                    str += '<option value="' + data[x]["item_id"] + '"  title="' + getName(data[x]["f2"]) + '">' + getName(data[x]["f2"]) + '</option>';
                }
            }

        });
        return str;

    }

}

function allProgGrades(ProgID) {
    var str = ""
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        data: {
            param0: "general.General",
            param1: "getProgAllGrades",
            param2: ProgID
        },
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            str += '<option value=""  title="">---</option>';
            for (var x = 0; x < data.length; x++) {
                str += '<option value="' + data[x]["item_id"] + '"  title="' + getName(data[x]["f2"]) + '">' + getName(data[x]["f2"]) + '</option>';
            }
        }

    });
    return str;

}


function FailGrades() {
    var str = ""
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        data: {
            param0: "general.General",
            param1: "getFailGrades"
        },
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            str += '<option value=""  title="">---</option>';
            for (var x = 0; x < data.length; x++) {
                str += '<option value="' + data[x]["item_id"] + '"  title="' + getName(data[x]["f2"]) + '">' + getName(data[x]["f2"]) + '</option>';
            }
        }

    });
    return str;

}

//----
//-----------hadeel
function GetFromSystem(Dict, Selected, SelectID, OptionFlag, flag) {
    /*Dict[item_id],Dict[order]*/
    if (!Dict) Dict = {};
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    if (!flag) flag = "Next"
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetFromSystems",
            param2: flag,
            param3: dicToString(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data[0]) {
                if (SelectID != "") $("#" + SelectID).html('')
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }
                for (var x = 0; x < data.length; x++) {
                    var Name = data[x].Name.split('|')[0];
                    var ID = data[x].ID;
                    if (SelectID != "") {
                        $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
                    } else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
                }
            } else {}
        },
        error: function() {
            error();
        }
    });
    return str;

}

//-----------
function GetFromRegion(Dict, Selected, SelectID, OptionFlag, flag) {
    /*Dict[item_id],Dict[order]*/
    if (!Dict) Dict = {};
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    if (!flag) flag = "Next"
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetFromRegion",
            param2: flag,
            param3: dicToString(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data[0]) {
                if (SelectID != "") $("#" + SelectID).html('')
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }
                for (var x = 0; x < data.length; x++) {
                    var Name = data[x].Name.split('|')[0];
                    var ID = data[x].ID;
                    if (SelectID != "") {
                        $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
                    } else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;

}

// hadeel edited here
function fillRegionSelect(thiss, flag) {

    item_id = $("#" + $(thiss).attr('flag')).val() + '';
    var selected = "";
    var IDs = "";
    var length = item_id + ''.split('.').length;

    if (length > 2 && flag == "Prev") {
        IDs = item_id.split('.')
        for (i = 0; i < length - 2; i++) {
            selected += IDs[i] + '.';
        }
    }

    GetFromRegion({
        "item_id": item_id
    }, selected, $(thiss).attr('flag'), "", flag);
}

function get_active_faculties(Dict, Selected, SelectID, OptionFlag, flag) {

    if (!Dict) Dict = {};
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    if (!flag) flag = "Next"
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "get_active_all_faculties",
            param2: flag,
            param3: dicToString(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {

            var data = jQuery.parseJSON(d);
            if (data[0]) {
                if (SelectID != "") $("#" + SelectID).html('')
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }

                for (var x = 0; x < data.length; x++) {

                    var Name = getName(data[x].Name);
                    var universityName = getName(data[x].universityName)
                    var ID = data[x].ID;
                    if (SelectID != "") {
                        $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + universityName + "-" + Name + "</option>").appendTo("#" + SelectID);
                    } else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + universityName + '-' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;

}
//-----------
//hadeel
function GetFromFoudation(Dict, Selected, SelectID, OptionFlag, flag) {
    /*Dict[item_id],Dict[order]*/

    if (!Dict) Dict = {};
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    if (!flag) flag = "Next"
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetFromFoundations",
            param2: flag,
            param3: dicToString(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {

            var data = jQuery.parseJSON(d);
            if (data[0]) {
                if (SelectID != "") $("#" + SelectID).html('')
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }

                for (var x = 0; x < data.length; x++) {
                    var Name = data[x].Name.split('|')[0];
                    var ID = data[x].ID;
                    if (SelectID != "") {
                        $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
                    } else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;

}

function fillFoundationSelect(thiss, flag, item_type) {

    item_id = $("#" + $(thiss).attr('flag')).val() + '';
    var selected = "";
    var IDs = "";
    var length = (item_id + '').split('.').length;

    if (length > 2 && flag == "Prev") {
        IDs = item_id.split('.')
        for (i = 0; i < length - 2; i++) {
            selected += IDs[i] + '.';
        }
    }

    GetFromFoudation({
        "item_id": item_id,
        "item_type": (item_type ? item_type : '')
    }, selected, $(thiss).attr('flag'), "", flag);
}


//----------------
function fillSystemSelect(thiss, flag) {

    item_id = $("#" + $(thiss).attr('flag')).val() + '';
    var selected = "";
    var IDs = "";
    var length = item_id + ''.split('.').length;

    if (length > 2 && flag == "Prev") {
        IDs = item_id.split('.')
        for (i = 0; i < length - 2; i++) {
            selected += IDs[i] + '.';
        }
    }

    GetFromSystem({
        "item_id": item_id
    }, selected, $(thiss).attr('flag'), "", flag);
}

function GetTypesUser() {

    var Dict = {};
    Dict['ScopeID'] = ScopeID;
    Dict['AppID'] = CurrAppID;
    var str = "";


    $('.error').html('');
    $.ajax({
        url: "/getJCI",
        type: "POST",
        cache: false,
        async: false,
        data: {
            param0: "systemAdmin.usersTypesTable",
            param1: "GetTypesUser",
            param2: JSON.stringify(Dict)
        },
        success: function(data1) {
            var Data = jQuery.parseJSON(data1);
            if (Data) {
                str += '<option  value="" title="---" >---</option>';

                for (var x = 0; x < Data.length; x++) {
                    selected = "";
                    Name = getName(Data[x].f2);
                    id = Data[x].id;
                    item_id = Data[x].item_id;
                    str += '<option  value="' + item_id + '" title="' + Name + '" >' + Name + '</option>';

                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;
}

//----------------
function GetCurrentDate() {
    /*var d = new Date();
     return d;*/
    var currentDateTime = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "getDateTime",
        },
        type: "post",
        cache: false,
        async: false,
        success: function(data) {
            data = JSON.parse(data)
            if (data) {
                currentDateTime = data.currentDateTime;
            } else {
                currentDateTime = '';
            }
        }
    });
    return currentDateTime;
}
/*
 function GetCurrentYear() {
 //return GetCurrentDate().getFullYear();
 return GetCurrentDate()
 }*/

//DD/MM/YYYY
function GetDate() {
    //function GetDate(date) {
    /*if (!date) {
     var date = GetCurrentDate();
     }
     var y = date.getFullYear();
     var d = date.getDate();
     var m = date.getMonth() + 1;
     return (d < 10 ? '0' + d : d) + '/' + (m < 10 ? '0' + m : m) + '/' + y*/
    var date = GetCurrentDate();
    return date;
}

//getDay() <http://www.w3schools.com/jsref/jsref_getday.asp>
//getFullYear() <http://www.w3schools.com/jsref/jsref_getfullyear.asp>
//getMonth() <http://www.w3schools.com/jsref/jsref_getmonth.asp>

function chkdate(val) {
    msg = '';
    CurDate = new Date(Date());
    var c1 = val.split('-');
    if (c1.length != 3) {
        c1 = val.split('/');
        if (c1.length != 3) {
            msg = 'يكتب التاريخ بهذه الطريقة: يوم/شهر/سنة';
            return '0';
        }
    }
    c1[0] = RmvLeading(c1[0], '0');
    c1[1] = RmvLeading(c1[1], '0');
    c1[2] = RmvLeading(c1[2], '0');
    if (isNaN(c1[0]) || c1[0] < 1 || c1[0] > 31) {
        msg = c1[0] + ': قيمة غير صحيحة لليوم';
        return '0';
    } else if (c1[1] == 2 && c1[2] % 4 == 0 && c1[0] > 29) {
        msg = c1[0] + ': قيمة غير صحيحة لليوم ' + '' + 'شهر فبراير 29 سنه كبيسة';
        return '0';
    } else if (c1[1] == 2 && c1[2] % 4 != 0 && c1[0] > 28) {
        msg = c1[0] + ': قيمة غير صحيحة لليوم ' + '' + 'شهر فبراير 28 سنه بسيطة';
        return '0';
    } else if (((c1[1] % 2 == 0 && c1[1] < 8) || c1[1] == 9 || c1[1] == 11) && c1[0] > 30) {
        msg = c1[0] + ': قيمة غير صحيحة لليوم ' + ' ' + 'شهر ' + c1[1] + ':  30 يوم';
        return '0';
    }
    if (isNaN(c1[1]) || c1[1] < 1 || c1[1] > 12) {
        msg = c1[1] + ': قيمة غير صحيحة للشهر';
        return '0';
    }
    if (isNaN(c1[2]) || c1[2] < 1900 || c1[2] > CurDate.getFullYear() + 30) {
        msg = c1[2] + ': قيمة غير صحيحة للسنة';
        return '0';
    }
    c1[0] = parseInt(c1[0], 10);
    c1[1] = parseInt(c1[1], 10);
    c1[2] = parseInt(c1[2], 10);
    val = c1.join('/');
    return val;
}

function RmvLeading(str, delimiter) {
    var retVal = '';
    var init = true;
    var count = delimiter.length;
    for (var i = 0; i < str.length; i++)
        if (str.substr(i, count) == delimiter) {
            if (!init)
                retVal += str.substr(i, 1);
            else
                i += count - 1
        }
    else {
        retVal += str.substr(i, 1);
        init = false;
    }
    return retVal;
}

function CheckDateValidate(tthis) {
    var val = $(tthis).val();
    if (val != "") {
        if (chkdate(val) != "0") {
            val = val.split('/');
            if (val[0].length == 1) val[0] = "0" + val[0]
            if (val[1].length == 1) val[1] = "0" + val[1]
            $(tthis).val(val[0] + "/" + val[1] + "/" + val[2]);
        } else {
            $(tthis).val('');
            if (Lang == "A")
                jAlert('من فضلك ادخل التاريخ بشكل صحيح \n ex.01/01/2000');
            else
                jAlert('Please enter the date correctly \n ex.01/01/2000');
        }
    }
}

function CheckPercentageValidate(tthis) {
    if ($(tthis).val() != "") {
        if (parseFloat($(tthis).val()) > 100 || isNaN(parseFloat($(tthis).val()))) {
            $(tthis).val('');
            alert(LabelPercentageIncorrect);
        } else {
            $(tthis).val(parseFloat($(tthis).val()));
        }
    }
}

function CheckGradeValidate(tthis) {
    if ($(tthis).val() != "") {
        if (isNaN(parseFloat($(tthis).val()))) {
            $(tthis).val('');
            if (Lang == "A")
                alert("عفوا الدرجة المدخلة غير صحيحة");
            else
                alert("Sorry degree entered is incorrect");


        } else {
            $(tthis).val(parseFloat($(tthis).val()));
        }
    }
}

function CheckValidationToRunApp(level) {
    // level=0 run in university
    // level=1 run in faculty  كلية
    // level=2 run in last branch  اخر شعبة
    // level=3 run in batch  فرقة
    // level=4 run in branch  اى شعبة
    var flag = false;
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "student.General",
            param1: "CheckValidationToRunApp",
            param2: ScopeID,
            param3: level
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                if (data0[0].Total == "0")
                    flag = true;
                else
                    flag = false;
            }
        },
        error: function(error) {
            error();
        }
    });
    return flag;
}

function DrawNoAvalidToRun(Number) {
    var ListVariable = [];
    ListVariable[0] = "";
    ListVariable[1] = LabelFaculty;
    ListVariable[2] = LabelBranch;
    ListVariable[3] = LabelBatch;
    ListVariable[4] = LabelBranch;
    //Content = " <div id=ErrorMSG class=Error style='color: #ff0000;background-color: #FEEFB3;height:50pt;' align='center'><span style='font-size:12pt;font-weight:bold;'><br/> "
    Content = (Lang == "A" ? "لابد من اختيار " : "You have to select ") + ListVariable[Number] + (Lang == "A" ? " أولا" : " first.");
    jAlert(Content);
    //Content += "</span></div>";
    //Title = ((Lang == "A") ? "تنبيه" : "Warning");
    //DesignFrame(Title, "-");
    //$('#DivBasicData').html(Content)
}

function CheckNationalID(NationalID) {
    if (NationalID != '') {
        $("#labNatError").html(getName("رقم قومي خاطئ|Wrong National ID"));
        var CenturyNo = NationalID.substring(0, 1);
        var BirthDate = NationalID.substring(1, 7);
        var GovernorateCode = NationalID.substring(7, 9);
        var IDNo = NationalID.substring(9, 13);
        var SupervisionNo = NationalID.substring(13, 14);
        if (!isNaN(NationalID) && NationalID != '' && NationalID.length == 14) {
            if (CenturyNo == 2 || CenturyNo == 3) {
                BirthDate = (CenturyNo == 2) ? BirthDate.substring(4, 6) + '/' + BirthDate.substring(2, 4) + '/' + '19' + BirthDate.substring(0, 2) : BirthDate.substring(4, 6) + '/' + BirthDate.substring(2, 4) + '/' + '20' + BirthDate.substring(0, 2);

                if (chkdate(BirthDate) != '0') {
                    if ((parseFloat(GovernorateCode) < 36 && GovernorateCode.substring(1, 2) != 0) || GovernorateCode == '88') {

                        $("#labNatError").css("display", "none");
                        return true;
                    } else {
                        $("#labNatError").css("display", "inline");
                        return false;

                    }
                } else {
                    $("#labNatError").css("display", "inline");
                    return false;
                }
            } else {
                $("#labNatError").css("display", "inline");
                return false;
            }
        } else {
            $("#labNatError").css("display", "inline");
            return false;
        }
        return true;
    } else {
        $("#labNatError").css("display", "inline");
        return false;
    }
}

function GetGradesNotdefineSP() {
    var CurrentStudyPlanId = CurrentID;
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "StudyPlanData.StudyPlan",
            param1: "GetGradesNotdefineSP",
            param2: CurrentStudyPlanId,

        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data && data[0]) {
                str += '<option ></option>';
                for (var x = 0; x < data.length; x++) {
                    NameGrades = getName(data[x].NameGrades, 'E');
                    id = data[x].id
                    str += '<option value="' + id + '"   title="' + NameGrades + '">' + NameGrades + '</option>';
                }
            }


        },

        error: function() {
            error();
        }
    });
    if (str != "")
        return str;

}


function GetFacultiesBasedOnUniversity(University, Selected, SelectID, OptionFlag, excepted) {
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    if (!excepted) excepted = '';
    var DictStudyPlan = {}
    DictStudyPlan["University"] = University;
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetFacultiesBasedOnUniversity",
            param2: dicToString(DictStudyPlan)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }
                for (x = 0; x < data.length; x++) {
                    var Name = data[x].Name.split('|')[Lang == "A" ? 0 : 1];
                    var ID = data[x].ID;
                    if (excepted == '' || excepted != ID) {
                        if (SelectID != "") $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
                        if (Selected == "") str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
                    }


                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;

}

function GetFacultiesBasedOnScope(Selected, SelectID, OptionFlag, scopeUniversity) {
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    var DictStudyPlan = {}
    DictStudyPlan["ScopeID"] = ScopeID;
    if (scopeUniversity)
        DictStudyPlan["scopeUniversity"] = true;
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetFacultiesBasedOnScope",
            param2: dicToString(DictStudyPlan)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                if (OptionFlag == true) {
                    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else str += '<option value="">---</option>';
                }
                for (x = 0; x < data.length; x++) {
                    var Name = data[x].Name.split('|')[Lang == "A" ? 0 : 1];
                    var ID = data[x].ID;
                    if (SelectID != "") $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
                    else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;

}

function getPatternForSearch() {
    return '^[a-zA-Z0-9\\- \u0621-\u064A.*]*$'
}

function getTrueorFalse(Selected, SelectID, OptionFlag) {
    if (!SelectID) SelectID = "";
    if (!Selected) Selected = "";
    if (!OptionFlag) OptionFlag = false;
    var str = "";
    if (OptionFlag == true) {
        if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
        else str += '<option value="">---</option>';
    }
    var Dict = []
    Dict[0] = {
        "ID": 1,
        "Name": "نعم|Yes"
    };
    Dict[1] = {
        "ID": 0,
        "Name": "لا|No"
    };
    for (var x = 0; x < Dict.length; x++) {
        var Name = Dict[x].Name.split('|')[Lang == "A" ? 0 : 1];
        var ID = Dict[x].ID;
        if (SelectID != "") $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID);
        else str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>';
    }
    return str
}

function get_content_dialog_receipt(student_id) {
    var Dict = {};
    Dict['student_id'] = student_id;
    var str = "";
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: false,
        data: {
            param0: "fees.StudentFees",
            param1: "get_payment_student",
            param2: JSON.stringify(Dict)
        },
        success: function(response) {
            var response = jQuery.parseJSON(response);
            var result = response['data'];
            if (result.length) {
                str += "<table class='tblFee'>"
                str += "<tr>"
                str += "<th></th>"
                str += "<th>" + getName("المبلغ |Amount") + "</th>"
                str += "<th>" + getName("رقم الايصال |receipt Number") + "</th>"
                str += "<th>" + getName("تاريخ السداد|payment Date") + "</th>"
                str += "</tr>"
                for (var item in result) {
                    var fee = result[item]
                    str += "<tr class='feeRow'>"
                    str += "<td style='text-align: center'><input type='radio' name='feeRadio' class='feeRadio'></td>"
                    str += "<td  style='text-align: center'>" + fee['fee_value'].replace("-", "") + " " + getName(fee['currency_name']) + "</td>"
                    str += "<td  style='text-align: center'>" + fee['receipt_number'] + "</td>"
                    str += "<td  style='text-align: center'>" + fee['payment_date'] + "</td>"

                    //payment_date
                    str += "</tr>"
                }
                str += "<tr>"
                str += "<td style='text-align: center' colspan='4'><button id='viewReceiptBtn' class='customButton blue' style='margin-top: 25px' >" + getName("عرض الايصال|view Receipt") + "</button></td>"
                str += "</tr>"
                str += "</table>"
            } else {
                str = NoDataToShow();
            }

        },
        error: function(xhr, status, error) {
            console.error("Error fetching content:", error);
        }
    });
    return str;

}


//AmiraAlkhwaga
/*_radwa_*/
function CreateDialog(Dict) {

    var str = Dict["str"];
    var Title = Dict["Title"];
    var height = 300;
    var width = 300;
    var Btn = false;
    var Action = "";
    var btnTxt;
    if (Lang == 'A') {
        btnTxt = {
            "Ok": "موافق",
            "Cancel": "إلغاء"
        }
    } else {
        btnTxt = {
            "Ok": "Ok",
            "Cancel": "Cancel"
        }
    }
    if (Dict["Width"])
        width = parseInt(Dict["Width"]);
    if (Dict["Height"])
        height = parseInt(Dict["Height"]);
    if (Dict["Action"])
        Action = Dict["Action"];
    if (Dict["Flag"])
        Flag = Dict["Flag"];
    if (Flag == "Scope") {
        height = 500;
        width = 450;

        if ($("#DivDialogScopeName").length == 0) {
            $("#ScopeName").append('<Div id="DivDialogScopeName"></Div>');

        }
        $("#DivDialogScopeName").html("<label style='color:red;font-size:11pt;' id='lblChooseScope'></label>" + str);


        //$("#DivDialogScopeName").html("<label style='color:red;font-size:11pt;' id='lblChooseScope'></label>" + str);

        var valueRadioClick = $("input[name='shapeTree']:checked").val()

        if (valueRadioClick == '2') {
            if ($("#FromUniv2 option").length) {
                if (ScopeID.split('.').length - 1 == 1) {
                    universityId = ScopeID
                } else {
                    universityId = ScopeID.split('.')[0] + '.'
                }
                $("#FromUniv2").val(universityId)
                if (!$("#FromUniv2").data('select2')) {
                    $('#FromUniv2').select2();
                }


            }
            if ($("#FromUniv2").length && depth != "2") {
                var universityElement = document.getElementById("FromUniv2")
                drawFaculties(universityElement)
            }
            // if ($("#FromFac option").length) {
            var facultyId = ''
            if (ScopeID.split('.').length - 1 == 2) {
                facultyId = ScopeID

            }

            if (facultyId) {
                if (depth == "1" || depth == "0")
                    $("#FromFac").select2("val", facultyId);
                else {
                    $("#FromFac").val(facultyId)
                    if (!$("#FromFac").data('select2')) {
                        $('#FromFac').select2();
                    }

                }
                var facultyElement = document.getElementById("FromFac")
                drawProgramsLevels(facultyElement, "program")

            }

            if (ScopeProgID) {
                $("#FromProg").select2("val", ScopeProgID);
                var programElement = document.getElementById("FromProg")
                drawProgramsLevels(programElement, "level")
                //   if ($("#FromLevel  option").length) {
                $("#FromLevel").select2("val", ScopeLevelID);
                //  $("#FromLevel").val(ScopeLevelID)
                //$('#FromLevel').select2();

                //   }
            }
            // $(".select2-container div").hover(function() {
            //
            //              $(this).css("z-index",4)
            //            });
            // $(".select2-container div:not").hover(function() {
            //
            //              $(this).css("z-index",'unset')
            //            });


        } else {
            $('select').select2('destroy')
        }
        if (radioScopeID)
            $("input[name='scopeTreeRadio'][value='" + radioScopeID + "']").prop('checked', true);


        $("#DivDialogScopeName").attr("dir", dir);
        $('#DivDialogScopeName').dialog({
            modal: true,
            autoOpen: true,
            title: Title,
            closeOnEscape: true,
            zIndex: 3999,
            width: width,
            height: height,
            resizable: true,
            position: 'center',
            show: 'fade',
            hide: 'fade',
            buttons: [{
                text: btnTxt["Ok"],
                click: function(event) {
                    var valueRadioClick = $("input[name='shapeTree']:checked").val()

                    if (valueRadioClick == '1') {
                        // var ScopeID,ScopeFacultyName,ScopeProgName,ScopeLevelName,ID,Name='';
                        $('.ClassLocationTable').each(function(index) {
                            if ($(this).attr('selectedValue') == 'true') {
                                var parentID = "";
                                var parentName = "";
                                var childID = "";
                                var childName = "";
                                var value = $(this).attr('scopeValue');
                                var ScopeValueList = value.split("|");

                                for (var i = 0; i < ScopeValueList.length; i++) {
                                    if (ScopeValueList[i].indexOf("=") >= 0) {
                                        eval("" + ScopeValueList[i]);
                                    }
                                }

                                childID = value.substring(0, value.lastIndexOf('|'));
                                childName = value.substring(value.lastIndexOf('|') + 1, value.length);
                                //Full path
                                //ScopeID = (childID.split('|')[0] ? childID.split('|')[0] : childID.split('|'));
                                //ScopeProgID = (childID.split('|')[1] ? childID.split('|')[1] : '');
                                //ScopeLevelID = (childID.split('|')[2] ? childID.split('|')[2] : '');
                                ScopeProgType = (ScopeProgType ? (ScopeProgType === '35.22.1.' ? 'StudyYear' : (ScopeProgType === '35.22.2.' ? 'Credit' : 'Points')) : '');
                                ScopeProgID = value.indexOf("ScopeProgID") > -1 ? ScopeProgID : '';
                                ScopeID = value.indexOf("ScopeID") > -1 ? ScopeID : ''
                                /////
                                //setSCopeProgID();
                                ///
                                ScopeLevelID = value.indexOf("ScopeLevelID") > -1 ? ScopeLevelID : '';
                                ID = childID;
                                Name = childName;

                                ScopeFacultyName = value.indexOf("ScopeID") > -1 ? GetItemIDName(ScopeID, 'foundations') : '';
                                ScopeProgName = value.indexOf("ScopeProgID") > -1 ? GetItemIDName(ScopeProgID, 'studyplans') : '';
                                ScopeLevelName = value.indexOf("ScopeLevelID") > -1 ? GetItemIDName(ScopeLevelID, 'basicattributes') : '';
                                if (depth == "1" || depth == "0") {
                                    $('#FromUniv2').select2('destroy')
                                    $("#FromUniv2").val('');
                                } else if (depth == "2") {
                                    $('#FromFac').select2('destroy')
                                    $("#FromFac").val('');
                                }
                                // $("#FromFac").find('option').remove();
                                // $("#FromProg").find('option').remove();
                                //  $("#FromLevel").find('option').remove();
                                changeScope(ID, Name);
                                radioScopeID = ''
                                //ShowApp();
                            }
                        });
                        if (CurrAppID == "313.2.1.2.") {
                            $('#shape1Tree').find('.expandable').find("[src='images/Tminus.png']").each(function() {
                                if ($(this).attr('id').substring(3, $(this).attr('id').length + 1).split('.').length == 2) {
                                    if ($('#shape1Tree').find("[id='ul" + $(this).attr('id').substring(3, $(this).attr('id').length + 1) + "']").find('ul').find('li').length == 0) {
                                        $(this).click();
                                    }
                                }


                            });

                        }
                    } else {
                        // var ScopeID,ScopeFacultyName,ScopeProgName,ScopeLevelName='';
                        $('#FromUniv2').select2();
                        var scopeFullName = []
                        radioScopeID = parseInt($("input[name='scopeTreeRadio']:checked").val());
                        var universityId = $("#FromUniv2").val();
                        if (universityId && radioScopeID >= 1) {
                            scopeFullName.push($("#FromUniv2 option:selected").html());
                            ScopeID = universityId
                            ScopeProgID, ScopeProgName, ScopeLevelID, ScopeLevelName = ''
                        }

                        var facultyId = $("#FromFac").val();
                        if (facultyId && radioScopeID >= 2) {
                            scopeFullName.push($("#FromFac option:selected").html());
                            ScopeFacultyName = $("#FromFac option:selected").html()
                            ScopeID = facultyId
                            ScopeProgID = ''
                            ScopeProgName = ''
                        }
                        var programId = $("#FromProg").val();
                        if (programId && radioScopeID >= 3) {
                            scopeFullName.push($("#FromProg option:selected").html());
                            ScopeProgName = $("#FromProg option:selected").html()
                            ScopeProgID = programId
                            ScopeLevelID = ''
                            ScopeLevelName = ''
                        }
                        var levelId = $("#FromLevel").val()
                        if (levelId && radioScopeID >= 4) {
                            scopeFullName.push($("#FromLevel option:selected").html());
                            ScopeLevelID = levelId;
                            ScopeLevelName = $("#FromLevel option:selected").html()

                        }
                        scopeNameStr = scopeFullName.join(" - ")
                        if (scopeNameStr)
                            changeScope(ScopeID, scopeNameStr, 'shape2');
                    }

                    Dict["valueRadioClick"] = $("input[name='shapeTree']:checked").val()
                    $(this).dialog("close");
                    $('select').select2('destroy')


                }
            }, {
                text: btnTxt["Cancel"],
                click: function() {
                    $(this).dialog("close");
                    $('select').select2('destroy')

                }
            }],
            close: function(event, ui) {
                $('select').select2('destroy')
                eval(Action);
                $("#DivDialogScopeName").html("<label style='color:red;font-size:11pt;' id='lblChooseScope'></label>" + str);

                RemoveGenericDialog();

            }
        });

        if (Dict["overlay"]) {
            $('.ui-widget-overlay').click(function() {
                //Close the dialog when it loses focus:
                eval(Action);
                RemoveGenericDialog();
            });
        }


        $("input[name=shapeTree]:radio").click(function(event) {
            if ($(this).val() == '1') {
                $("#shape2Tree").hide()
                $("#shape1Tree").show()
                if (depth == "1" || depth == "0") {
                    $('#FromUniv2').select2('destroy')
                } else if (depth == "2") {
                    $('#FromFac').select2('destroy')
                }


            } else {

                $("#shape2Tree").show()
                $("#shape1Tree").hide()
                if (depth == "1" || depth == "0") {
                    if (!$("#FromUniv2").data('select2')) {
                        $('#FromUniv2').select2();
                    }
                    if (!$("#FromFac").data('select2')) {
                        $('#FromFac').select2();
                    }
                } else if (depth == "2") {
                    if (!$("#FromFac").data('select2')) {
                        $('#FromFac').select2();
                    }
                }
                if (!$("#FromProg").data('select2')) {
                    $('#FromProg').select2();
                }
                if (!$("#FromLevel").data('select2')) {
                    $('#FromLevel').select2();
                }
                //   $(".select2-container div").hover(function() {
                //   $(this).css("z-index",4)
                // });
                // $(".select2-container div:not").hover(function() {
                //   $(this).css("z-index",'unset')
                // });

            }
        });
    } else {
        if (Flag == "UserData") {
            height = 200;
            width = 400;
            if ($("#DivDialogUserData").length == 0) {
                $("#onlineUserDataDiv").append('<Div id="DivDialogUserData"></Div>');
            }
            $("#DivDialogUserData").html(str);
            //----Fill Options
            GetBasicattributes({
                "item_id": "35.5.",
                "limit": "18",
                "order": "ids"
            }, AcademicYear, "slcAcadmic");

            GetBasicattributes({
                "item_id": "35.3."
            }, AcademicSemester, "slcSemester");
            ///
            $("#DivDialogUserData").attr("dir", dir);
            $('#DivDialogUserData').dialog({
                modal: true,
                autoOpen: true,
                title: Title,
                closeOnEscape: true,
                zIndex: 3999,
                width: width,
                height: height,
                resizable: true,
                position: 'center',
                show: 'fade',
                hide: 'fade',
                buttons: [{
                    text: btnTxt["Ok"],
                    click: function() {
                        var data = {};
                        data['Lang'] = $('#slcLang').val();
                        data['AcadYear'] = $('#slcAcadmic').val();
                        data['Semester'] = $('#slcSemester').val();
                        //----------Working in language reflect in db---------//
                        $.ajax({
                            url: "/getJCI",
                            data: {
                                param0: "general.General",
                                param1: "updateUserData",
                                param2: JSON.stringify(data),
                                param3: ScopeProgType
                            },
                            type: "post",
                            cache: false,
                            async: false,
                            success: function(d) {
                                var data = jQuery.parseJSON(d);
                                if (data.retMsg == 'success') {
                                    Lang = $('#slcLang').val();
                                    //window.location = "/static/default.html?num=" + randomNumber();
                                    //location.reload(); 22-3-2015
                                    //$('#HomePageBody').load("/static/students/default.html?num=" + randomNumber());
                                    LoadAppVariables();
                                    changeScope(ScopeID, ScopeName);
                                }
                            },
                            error: function() {
                                error();
                            }
                        });
                        //Close dialoge  after finishing
                        $("#DivDialogUserData").dialog("close");
                        $("#DivDialogUserData").dialog("destroy").remove();

                        if ($("#UserDataTbl").html != '') {
                            $("#UserDataTbl").html('');
                        }
                    }
                }, {
                    text: btnTxt["Cancel"],
                    click: function() {
                        $("#DivDialogUserData").dialog("close");
                        $("#DivDialogUserData").dialog("destroy").remove();
                        if ($("#UserDataTbl").html != '') {
                            $("#UserDataTbl").html('');
                        }
                    }
                }],
                close: function(event, ui) {
                    $("#DivDialogUserData").dialog("close");
                    $("#DivDialogUserData").remove();
                    if ($("#UserDataTbl").html != '') {
                        $("#UserDataTbl").html('');
                    }
                }
            });
            if (Dict["overlay"]) {
                $('.ui-widget-overlay').live("click", function() {
                    $("#DivDialogUserData").dialog("close");
                    $("#DivDialogUserData").dialog("destroy").remove();
                    if ($("#UserDataTbl").html != '') {
                        $("#UserDataTbl").html('');
                    }
                });
            }
            $("#DivDialogUserData").dialog("open");
        }
        //change password
        else {
            height = 200;
            width = 350;
            /*if($("#DivChangePass").length == 0) {
             $("#changePassImg").append('<Div id="DivChangePass"></Div>');
             }
             $("#DivChangePass").html(str);
             $("#DivChangePass").attr("dir", dir);*/
            $('<Div id="DivChangePass" dir="' + dir + '">' + str + '</Div>').dialog({
                modal: true,
                autoOpen: true,
                title: Title,
                closeOnEscape: true,
                zIndex: 3999,
                width: width,
                height: height,
                resizable: true,
                position: 'center',
                show: 'fade',
                hide: 'fade',
                buttons: [{
                    text: btnTxt["Ok"],
                    click: function() {
                        clickOkonChangePassword()
                        // var Data = {};
                        // Data["OldPasswordTxt"] = $("#OldPassTxt").val();
                        // var oldpasscomplex = 'true';
                        // // TODO : why check for old one ???!!
                        // // var oldpasscomplex = complexPass($("#OldPassTxt").val());
                        // if (oldpasscomplex == 'true') {
                        //     $.ajax({
                        //         url: "/getJCI",
                        //         type: "post",
                        //         cache: false,
                        //         data: {
                        //             param0: "systemAdmin.sysUsersData",
                        //             param1: "getOldPassword",
                        //             param2: dicToString(Data)
                        //         },
                        //         success: function (d) {
                        //             var data = jQuery.parseJSON(d);
                        //             if (data) {
                        //                 if ($("#PassTxt").val() == $("#RePassTxt").val()) {
                        //                     //check password complexity
                        //                     var strcomplex = complexPass($("#PassTxt").val());
                        //                     if (strcomplex == 'true') {
                        //                         //change password
                        //                         var Data = {};
                        //                         Data["UserPassword"] = $("#PassTxt").val();
                        //                         $.ajax({
                        //                             url: "/getJCI",
                        //                             type: "post",
                        //                             cache: false,
                        //                             data: {
                        //                                 param0: "systemAdmin.sysUsersData",
                        //                                 param1: "ChangePassword",
                        //                                 param2: dicToString(Data)
                        //                             },
                        //                             success: function (d) {
                        //                                 var data = jQuery.parseJSON(d);
                        //
                        //                                 if (data) {
                        //                                     if(data.Msg!='success'){
                        //                                         jAlert(getName(data.Msg))
                        //                                         return false
                        //                                     }
                        //                                     else{
                        //                                             CurrentID = data.ID;
                        //                                                jAlert(getName('تم الحفظ|saved Done'))
                        //                                          $("#DivChangePass").dialog("close");
                        //                                         $("#DivChangePass").dialog("destroy").remove();
                        //                                         if ($("#ChangePassTbl").html != '') {
                        //                                             $("#ChangePassTbl").html('');
                        //                                         }
                        //                                     }
                        //
                        //                                     //GetsysUser();
                        //                                     //$("#BasicData").load("/static/html/systemAdmin/EditSystem/usersTabs.html");
                        //                                 }
                        //                             },
                        //                             error: function () {
                        //                                 error();
                        //                             }
                        //                         });
                        //
                        //
                        //                     }//end if -- check password complexity
                        //                     else {
                        //                         var msg = getName(strcomplex);
                        //                         jAlert(msg);
                        //                     }
                        //
                        //                 } else {
                        //                     var msg = getName('كلمه المرور غير متطابقه|Password texts does not match');
                        //                     jAlert(msg);
                        //                 }
                        //             }
                        //             else {
                        //                 var msg = getName('كلمه المرور القديمه غير صحيحه|Old password is not correct');
                        //                 jAlert(msg);
                        //             }
                        //         }
                        //     });
                        //
                        // }
                        // else {
                        //     var msg = getName(oldpasscomplex);
                        //     jAlert(msg);
                        // }


                    }
                }, {
                    text: btnTxt["Cancel"],
                    click: function() {
                        $("#DivChangePass").dialog("close");
                        $("#DivChangePass").dialog("destroy").remove();
                        if ($("#ChangePassTbl").html != '') {
                            $("#ChangePassTbl").html('');
                        }
                    }
                }],
                close: function(event, ui) {
                    $("#DivChangePass").dialog("close");
                    $("#DivChangePass").dialog("destroy").remove();
                    if ($("#ChangePassTbl").html != '') {
                        $("#ChangePassTbl").html('');
                    }
                }
            });
            if (Dict["overlay"]) {
                $('.ui-widget-overlay').live("click", function() {
                    $("#DivChangePass").dialog("close");
                    $("#DivChangePass").dialog("destroy").remove();
                    if ($("#ChangePassTbl").html != '') {
                        $("#ChangePassTbl").html('');
                    }
                });
            }
        }
    }
    $('DivDialogScopeName').dialog('buttons', 'position', 'center');
    $('.ui-dialog-buttonset').css('float', (Lang == 'A' ? 'left' : 'right'));
}

function clickOkonChangePassword() {

    var Data = {};
    Data["OldPasswordTxt"] = $("#OldPassTxt").val();
    // var ChkValid = document.getElementById('OldPassTxt').validity.valid;
    var ChkValidNewPass = document.getElementById('PassTxt').validity.valid;

    if (!ChkValidNewPass) {
        alert(getName('برجاء مراجعة كلمة المرور الجديده  '))
        return;
    }
    var ChkValidNewPassOld = document.getElementById('OldPassTxt').validity.valid;

    if (!ChkValidNewPassOld) {
        alert(getName('برجاء مراجعة كلمة المرور القديمة  '))
        return;
    }
    var oldpasscomplex = 'true';
    // TODO : why check for old one ???!!
    // var oldpasscomplex = complexPass($("#OldPassTxt").val());
    if (oldpasscomplex == 'true') {
        $.ajax({
            url: "/getJCI",
            type: "post",
            cache: false,
            data: {
                param0: "systemAdmin.sysUsersData",
                param1: "getOldPassword",
                param2: dicToString(Data)
            },
            success: function(d) {
                var data = jQuery.parseJSON(d);
                if (data) {
                    if ($("#PassTxt").val() == $("#RePassTxt").val()) {
                        //check password complexity
                        var strcomplex = complexPass($("#PassTxt").val());
                        if (strcomplex == 'true') {
                            //change password
                            var Data = {};
                            Data["UserPassword"] = $("#PassTxt").val();
                            Data['ChangeFromPortal'] = true;
                            $.ajax({
                                url: "/getJCI",
                                type: "post",
                                cache: false,
                                data: {
                                    param0: "systemAdmin.sysUsersData",
                                    param1: "ChangePassword",
                                    param2: "userType",
                                    param3: dicToString(Data)
                                },
                                success: function(d) {
                                    var data = jQuery.parseJSON(d);

                                    if (data) {
                                        if (data.Msg != 'success') {
                                            jAlert(getName(data.Msg))
                                            return false
                                        } else {
                                            CurrentID = data.ID;
                                            jAlert(getName('تم الحفظ|saved Done'))
                                            $("#DivChangePass").dialog("close");
                                            $("#DivChangePass").dialog("destroy").remove();
                                            if ($("#ChangePassTbl").html != '') {
                                                $("#ChangePassTbl").html('');
                                            }
                                        }

                                        //GetsysUser();
                                        //$("#BasicData").load("/static/html/systemAdmin/EditSystem/usersTabs.html");
                                    }
                                },
                                error: function() {
                                    error();
                                }
                            });


                        } //end if -- check password complexity
                        else {
                            var msg = getName(strcomplex);
                            jAlert(msg);
                        }

                    } else {
                        var msg = getName('كلمه المرور غير متطابقه|Password texts does not match');
                        jAlert(msg);
                    }


                } else {
                    var msg = getName('كلمه المرور الحاليه غير صحيحه|Old password is not correct');
                    jAlert(msg);
                }
            }
        });

    } else {
        var msg = getName(oldpasscomplex);
        jAlert(msg);
    }

}

function CreatePrivateDialogPassword(Dict) {

    var str = Dict['str']
    var Title = Dict['Title']
    var height = 200;
    var width = 350;
    var btnTxt;
    if (Lang == 'A') {
        btnTxt = {
            "Ok": "موافق",
            "Cancel": "إلغاء"
        }
    } else {
        btnTxt = {
            "Ok": "Ok",
            "Cancel": "Cancel"
        }
    }
    $('<Div id="DivChangePass" dir="' + dir + '">' + str + '</Div>').dialog({
        modal: true,
        autoOpen: true,
        title: Title,
        closeOnEscape: false,
        open: function(event, ui) {

            $(".ui-dialog-titlebar-close").hide();
            //     $('#DivChangePass').siblings($('.ui-dialog-buttonpane').find('button').eq(1).hide())
        },
        zIndex: 3999,
        width: width,
        height: height,
        resizable: true,
        position: 'center',
        show: 'fade',
        hide: 'fade',
        buttons: [{
            text: btnTxt["Ok"],
            click: function() {

                clickOkonChangePassword()


            }
        }]
    });

}

function drawFaculties(elem) {
    nextPart = $("#" + elem.id + " option:selected").val();
    if (nextPart == "")
        nextPart = "xx."
    listFaculties = getFacultiesLevels(nextPart, '')
    var str2 = "<option value=''>---</option> "
    for (i1 = 0; i1 < listFaculties.length; i1++) {
        str2 += "<option value='" + listFaculties[i1].item_id + "'>" + getName(listFaculties[i1].f2) + "</option>"
    }
    $("#FromFac").html(str2)
    $('#FromFac').select2()
}

function drawProgramsLevels(elem, label) {

    nextPart = $("#" + elem.id + " option:selected").val();
    listProgramsLevels = getFacultiesLevels(nextPart, 'lvl')
    var str2 = "<option value=''>---</option> "
    for (i1 = 0; i1 < listProgramsLevels.length; i1++) {
        str2 += "<option value='" + listProgramsLevels[i1].item_id + "'>" + getName(listProgramsLevels[i1].f2) + "</option>"
    }
    if (label == 'program') {
        $("#FromProg").html(str2)
        $('#FromProg').select2()
        $("#FromLevel option").remove();
        $('#FromLevel').select2('destroy')
    } else if (label == 'level') {
        $("#FromLevel").html(str2)
        $('#FromLevel').select2()
    }

}


////15-6-2015 set progID globally for the whole system
function setSCopeProgID() {

    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "setSCopeProgID",
            param2: ScopeProgID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {

        }

    });

}

//------------------------//
function RemoveGenericDialog() {
    $("#DivDialogScopeName").dialog("close");
    $("#DivDialogScopeName").dialog("destroy").remove();
    if ($("#DivDialogScopeName").length == 0) {
        $("#ScopeName").append('<Div id="DivDialogScopeName"></Div>');
    }
}

function GetItemIDName(ID, Table, pgLang = '') {
    var Name = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetItemIDName",
            param2: ID,
            param3: Table
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                if (pgLang == '')
                    Name = getName(data);
                else
                    Name = getName(data, pgLang);
            }
        },
        error: function() {
            error();
        }
    });
    return Name;
}

function UndoID(ID, Level) {
    Level++;
    var TempID = "";
    ID = ID.split('.');
    for (var i = 0; i < ID.length - Level; i++) {
        TempID += ID[i];
        if (TempID != "") {
            TempID += ".";
        }
    }
    return TempID
}

function GetSignature(Signature) {
    var ID = Signature.split('@')[0].substring(1, Signature.length)
    var Date = (Signature + "@").split('@')[1]
    var Name = GetNameByID(ID);
    var str = "<table  style='width:600px;'>";
    str += "<tr align='" + ((sysLang == "A") ? "left" : "right") + "'>";
    str += "<td><span style='font-weight: bold; font-family: arial; font-size: 12px; color: red;'>" + LabelSignature + "&nbsp;:&nbsp;</span>" + Name + "</td>";
    str += "<td><span style='font-weight: bold; font-family: arial; font-size: 12px; color: red;'>" + LabelToDate + "&nbsp;:&nbsp;</span>" + Date + "</td>";
    str += "</tr>";
    str += "</table>";
    return str;
}

function GetNameByID(ID) {
    var Name = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetNameByID",
            param2: ID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                Name = data[0].split('|')[0];
            }
        },
        error: function() {
            error();
        }
    });
    return Name;
}

//---------Fill Option Based on Dictionary-----//
function fillSelectOption(selectID, DictData, className, funcName, selectedVal, emptyFlag, except) {
    //var myDataList = [];
    var data, IsDataAvailable = false;
    if (!except) except = '';
    if (String(DictData) != "") {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: className,
                param1: funcName,
                param2: dicToString(DictData)
            },
            type: "POST",
            cache: false,
            async: false,
            success: function(results) {
                data = jQuery.parseJSON(results);
                if (data)
                    IsDataAvailable = true;
                if (IsDataAvailable) {
                    $('#' + selectID).find('option').remove();
                    if (emptyFlag == 1)
                        $('#' + selectID).append($("<option></option>").attr("value", "").attr("attrType", "").text("---"));
                    for (var i = 0; i < data.length; i++) {
                        //myDataList[i] = data.rows[i].row;
                        if (except == '' || except != data[i].attrID)
                            $('#' + selectID).append($('<option></option>').val(data[i].attrID).html(getStrByLang(data[i].attrText, sysLang)));
                    }
                    if (selectedVal != "") {
                        $('#' + selectID).val(selectedVal);
                    }
                    $('#' + selectID).attr("align", "right");
                    $('#' + selectID).attr("width", "100%");
                }
            },
            error: function(error) {
                IsDataAvailable = false;
                if (sysLang == "A") {
                    jAlert("عفوا لقد حدث خطأ أثناء تحميل الصفحة من فضلك أبلغ المسوؤل عن النظام");
                } else {
                    jAledata[i].attrIDrt("An error occured while select options loading, please contact your system administrator.");
                }
            }
        });
    }
    return IsDataAvailable;
}

//SFarouk
function getStrByLang(strVar, lang) {
    if (strVar + "" != "" && strVar != null) {
        if (strVar.indexOf('|') != -1) {
            if (lang == 'A')
                return String(strVar.split('|')[0]);
            else
                return String(strVar.split('|')[1]);
        } else return strVar;
    } else return "";
}

function GetAllScopesFromFoundation2(Scope, Flag, Selected, SelectID, OptionFlag) {
    if (!Scope || Scope == "")
        Scope = ScopeID;
    if (!Flag || Flag == "")
        Flag = "1";
    if (!Selected)
        Selected = "";
    if (!SelectID)
        SelectID = "";
    if (!OptionFlag || OptionFlag == "")
        OptionFlag = false;
    var str = ""
    var Dict = {}
    Dict["Flag"] = Flag;
    Dict["ScopeID"] = Scope;
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "GetScopesFromfoundation",
            param2: dicToString(Dict)
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                if (SelectID != "")
                    $("#" + SelectID).empty();
                if (OptionFlag == true) {
                    if (SelectID != "")
                        $("<option value=''>---</option>").appendTo("#" + SelectID)
                    else
                        str += '<option value="">---</option>';
                }
                for (x = 0; x < data.length; x++) {
                    var Name = data[x].Name.split('|')[0];
                    var ID = data[x].ID;
                    var Type = data[x].Type;
                    if (SelectID != "")
                        $("<option value='" + ID + "'  " + ((ID == Selected) ? "selected" : "") + "  title='" + Name + "'>" + Name + "</option>").appendTo("#" + SelectID) //+ '|' + Type
                    else
                        str += '<option value="' + ID + '"  ' + ((ID == Selected) ? "selected" : "") + '  title="' + Name + '">' + Name + '</option>'; //+ '|' + Type
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;
}

function fillSelectOpt(selectID, item_id, sysLang, className, funcName, selectedVal, emptyFlag) {
    //var myDataList = [];
    var data, IsDataAvailable = false;
    if (String(item_id) != "") {
        $.ajax({
            url: "/getJCI",
            data: {
                param0: className,
                param1: funcName,
                param2: item_id,
                param3: sysLang
            },
            type: "get",
            cache: false,
            async: false,
            success: function(results) {
                data = jQuery.parseJSON(results);
                if (data)
                    IsDataAvailable = true;
                if (IsDataAvailable) {
                    $('#' + selectID).find('option').remove();
                    if (emptyFlag == 1)
                        $('#' + selectID).append($("<option></option>").attr("value", "").attr("attrType", "").text("---"));
                    for (var i = 0; i < data.length; i++) {
                        //myDataList[i] = data.rows[i].row;
                        $('#' + selectID).append($('<option></option>').val(data[i].row.attrID).attr("attrType", data[i].attrType).html(getStrByLang(data[i].attrText, sysLang)));
                    }
                    if (selectedVal != "") {
                        $('#' + selectID).val(selectedVal);
                    }
                    $('#' + selectID).attr("align", "right");
                    $('#' + selectID).attr("width", "100%");
                }
            },
            error: function(error) {
                IsDataAvailable = false;
                if (sysLang == "A") {
                    jAlert("عفوا لقد حدث خطأ أثناء تحميل الصفحة من فضلك أبلغ المسوؤل عن النظام");
                } else {
                    jAlert("An error occured while select options loading, please contact your system administrator.");
                }
            }
        });
    }
    return IsDataAvailable;
}


function checkFieldProcess(fidP) {
    msg = '';
    fidV = fidP.value;
    fidT = fidP.title;
    if (fidP.tagName == "TEXTAREA")
        fidV = fidP.innerHTML;
    if (fidP.type == "checkbox")
        fidV = (fidP.checked == true) ? "1" : "";
    fidV = fidV.replace(/^ +| +$/g, '');
    fidP.value = fidV;
    if ($('#' + fidP.id).attr('FMand') == 'x' && fidV == '') {
        msg = 'required field';
        if (fidP.style.display == 'none') {
            fidP = document.getElementById(fidP.FRep);
            msg = 'search for the field';
        }
        alert(msg);
        fidP.style.background = '#FFFAF3';
        fidP.focus();
        return false;
    }
    if (fidP.FComp) {
        var FEql = 0;
        if (fidP.FComp != '' && fidV != '') {
            var comp = fidP.FComp.split(',');
            for (kk = 0; kk < comp.length; kk++) {
                if (fidP.FEql) FEql = fidP.FEql;
                var max = parseInt(document.getElementById(comp[kk]).innerHTML) + parseInt(FEql);
                if ((fidV != '' || fidV == 0) && (max != '' || max == 0)) {
                    if (!compareVal(fidV, max, fidP)) {
                        msg = 'wrong value';
                        alert(msg);
                        fidP.style.background = '#FFFAF3';
                        fidP.focus();
                        return false;
                    }
                }
            }
        }
    }
    if ($('#' + fidP.id).attr('FType') != '' && fidV != '') {
        switch ($('#' + fidP.id).attr('FType')) {
            case 'date':
                CurDate = new Date(Date());
                var c1 = fidV.split('-');
                if (c1.length != 3) {
                    c1 = fidV.split('/');
                    if (c1.length != 3) {
                        msg = 'date written as: day/month/year';
                        break;
                    }
                }
                c1[0] = RmvLeading(c1[0], '0');
                c1[1] = RmvLeading(c1[1], '0');
                c1[2] = RmvLeading(c1[2], '0');
                if (isNaN(c1[0]) || c1[0] < 1 || c1[0] > 31) {
                    msg = c1[0] + 'wrong value for day';
                    break;
                } else if (c1[1] == 2 && c1[2] % 4 == 0 && c1[0] > 29) {
                    msg = c1[0] + 'wrong value for day' + '\\\n' + 'February is 29 days';
                    break;
                } else if (c1[1] == 2 && c1[2] % 4 != 0 && c1[0] > 28) {
                    msg = c1[0] + 'wrong value for day' + '\\\n' + 'February is 28 days';
                    break;
                } else if (((c1[1] % 2 == 0 && c1[1] < 8) || c1[1] == 9 || c1[1] == 11) && c1[0] > 30) {
                    msg = c1[0] + 'wrong value for day' + '\\\n' + 'month' + c1[1] + ' 30 days';
                    break;
                }
                if (isNaN(c1[1]) || c1[1] < 1 || c1[1] > 12) {
                    msg = c1[1] + 'wrong value for month';
                    break;
                }
                if (isNaN(c1[2]) || c1[2] < 1900 || c1[2] > CurDate.getYear() + 30) {
                    msg = c1[2] + 'wrong value for year';
                    break;
                }
                c1[0] = parseInt(c1[0]);
                c1[1] = parseInt(c1[1]);
                c1[2] = parseInt(c1[2]);
                //var nD1 = new Date(c1[2], c1[1]-1, c1[0]);
                //var now = new Date();
                //if( nD1 > now )
                //{
                //    msg='the date more than the existing date';
                //    break;
                //}
                fidP.value = c1.join('/');
                break;
            case 'achar':
                var ch;
                for (var i1 = 0; i1 < fidV.length; i1++) {
                    if (i1 == fidV.length - 2) ch = fidV.slice(i1);
                    else ch = fidV.slice(i1, i1 + 1);
                    if (ch < '' || ch > '')
                        if (ch < '0' || ch > '9')
                            if (ch != ' ') {
                                displaySave = 'none';
                                break;
                            }
                }
                if (displaySave == 'none') msg = fidV + 'wrong value';
                break;
            case 'atext':
                var ch;
                for (var i1 = 0; i1 < fidV.length; i1++) {
                    if (i1 == fidV.length - 2) ch = fidV.slice(i1);
                    else ch = fidV.slice(i1, i1 + 1);
                    if (ch.charCodeAt(0) < 1569 || ch.charCodeAt(0) > 1610)
                        if (ch != ' ') {
                            displaySave = 'none';
                            break;
                        }
                }
                if (displaySave == 'none') msg = fidV + 'wrong value';
                break;
            case 'int':
                if (isNaN(fidV)) msg = 'it should be in numbers';
                break;
            case 'idx':
                if (fidP.style.display == 'none') {
                    msg = 'search for the field';
                    fidP = document.getElementById(fidP.FRep);
                }
                break;
            case 'intchar':
                if (isNaN(fidV)) msg = 'it should be in numbers';
                break;
            case 'intcharZero':
                if (isNaN(fidV)) msg = 'it should be in numbers';
                else if (parseFloat(fidV) <= 0.0) msg = 'it should be more than zero';
                break;
            case 'email':
                var RegExp1 = /(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
                if (!RegExp1.test(fidV))
                    msg = 'Invalid email';
                break;
            default:
        }
        if (msg != '') {
            window.alert(msg);
            fidP.style.background = '#FFFAF3';
            fidP.focus();
            return false;
        }
    }
    return true;
}

function convertNull(strVal) {
    if (strVal == 'null' || strVal == null)
        strVal = '';
    return strVal;
}

//abdullah

function HideMSGDiv(MsgDiv) {
    var DetDiv = MsgDiv || 'MsgDiv';
    $('#' + DetDiv).hide(2000, function() {
        return false;
    });
    return false;
}

function ShowSuccessMsg(Message, subSysLang, ScsDiv) {
    var DetHDiv = ScsDiv || 'success';
    // $('#' + DetHDiv).livequery(function(){
    $('#' + DetHDiv).html("");
    $('#' + DetHDiv).show();
    $('#' + DetHDiv).show().fadeIn("slow", function() {
        $('#' + DetHDiv).html('<div class=\"ui-widget\"> ' + '<div class=\"ui-state-highlight ui-corner-all\" >' + ' <p  style="margin-top: 5px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px;">' + '<span  style="display:;float:' + getNameByDic({
            "E": "left",
            "A": "right"
        }, subSysLang) + ';" class="ui-icon ui-icon-close" onclick=\"javascript:HideMSGDiv();\" title="' + getNameByDic({
            "E": "Hide",
            "A": "إخفاء"
        }, subSysLang) + '" ></span>' + '<span  class="ui-icon ui-icon-info" style="float:' + getNameByDic({
            "E": "left",
            "A": "right"
        }, subSysLang) + ';margin-' + getNameByDic({
            "E": "right",
            "A": "left"
        }, subSysLang) + ': .3em; margin-top: 0px;margin-bottom: 0px; margin-left: 7px;color:red;"></span><strong>' + Message + '</strong></p></div></div>');
        return false;
    });
    // });
    return false;
}

function ShowErrorFormMessage(Message, subSysLang, ErrorDiv) {
    var DetErrorDiv = ErrorDiv || 'errorMessage';
    jAlert(getName(Message));
}

function getName(strValue, AppLang) {
    if (!AppLang) AppLang = Lang;

    var retVal = "";
    if (strValue == null)
        retVal = "";
    else {
        strValue = String(strValue).trim();
        retVal = (strValue.indexOf('|') != -1) ? (AppLang == "E") ? strValue.split('|')[1] : strValue.split('|')[0] : strValue;

        if (AppLang == "A" && retVal.trim() == "" && strValue.indexOf('|') != -1)
            retVal = strValue.split('|')[1];

        if (retVal.trim() == "")
            retVal = strValue.trim('|');
    }

    return retVal;

}

function getNameSplit(strValue, AppLang) {

    if (!AppLang) AppLang = Lang;

    var retVal = "";
    if (strValue == null)
        retVal = "";
    else {
        strValue = String(strValue).trim();
        if (strValue.indexOf('|') != -1) {
            if (AppLang == "E") {
                retVal = strValue.split('|')[1];
            } else {
                retVal = strValue.split('|')[0];
            }
        } else {
            if (AppLang == "E") {
                retVal = ""
            } else {
                retVal = strValue;
            }

        }

    }

    return retVal;

}

function getNameWithoutEn(strValue, AppLang) {
    if (!AppLang) AppLang = Lang;

    var retVal = "";
    if (strValue == null)
        retVal = "";
    else {
        strValue = String(strValue).trim();
        retVal = (strValue.indexOf('|') != -1) ? (AppLang == "E") ? strValue.split('|')[1] : strValue.split('|')[0] : "";

        if (AppLang == "A" && retVal.trim() == "" && strValue.indexOf('|') != -1)
            retVal = strValue.split('|')[1];

    }

    return retVal;

}


function getNameByDic(strValue, AppLang) {
    var retVal = "",
        tempstr = "";
    if (!AppLang) AppLang = Lang;
    try {
        if (strValue == null)
            retVal = "";
        else if (typeof strValue == 'object') {
            retVal = (strValue[AppLang]);
        } else {
            retVal = getName(strValue, AppLang);
        }
    } catch (e) {
        e = null;
    }
    return retVal;

}

////////////////////////////////////////
/*_radwa_*/
function DrawSystemButton(Type, GlobalName, Class, Away, color, WithoutText, text = undefined) {
    if (!Type)
        return "";
    if (!GlobalName)
        return "";
    if (Class == false) {
        Class = '';
    }
    if (Class == "blue") {
        Class = "ui-state-active"
    } else {
        Class = "ui-state-default";
    }
    var str = "";
    var Name = Type + GlobalName;
    //"style='float:"+(Lang=='A'?'left':'right')+"'"
    var cssFloat = (Away ? "style='float:" + (Lang == 'A' ? 'left' : 'right') + "'" : "");
    str += (Class == true) ? "<Button class='customButton " + Name + "'>" : "	<Button class='customButton " + Class + "' id='" + Name + "' " + cssFloat + ">";
    str += "	<img style='width:12px;height:15px;' src='" + eval("Img" + Type + "Path") + "'/>" + (WithoutText == true ? "" : ("&nbsp;&nbsp;" + (text != undefined ? text : eval(Type))));
    str += "</Button>";
    return str
}

function getPayLoad(payload) {
    const SESSION_KEY = sessionStorage.getItem("SESSION_KEY");
    let key = CryptoJS.SHA256(SESSION_KEY); // 32 bytes key

    let iv = CryptoJS.enc.Utf8.parse(SESSION_KEY.substring(0, 16));
    const dataString = JSON.stringify(payload);

    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(dataString), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encodeURIComponent(encrypted);
}

function searchEnter(idText, functionSearchName, htmlStr = '', flagEmpty = true) {
    $('#' + idText).keypress(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $("#BasicData").html(htmlStr);
            if (flagEmpty) {
                CurrentName = "";
            }
            functionSearchName();
        }
    });

}
/*_radwa_*/
function NewDrawRight(Signature, GlobalName, Flage, StrBtn, Class) { //hadeel
    if (!Flage)
        Flage = false;
    if (!StrBtn)
        StrBtn = "";
    if (!Class)
        Class = false;
    var str = ''
    var Drawstr = "";
    var appRight = GetRigthLevel();
    if (appRight >= 2) {
        if (Signature == "") {
            if (appRight >= 2) {
                str += DrawSystemButton("New", GlobalName, Class);
            }
        } else {
            if (appRight >= 4) {
                if (Flage == true)
                    str += DrawSystemButton("New", GlobalName, Class);
                if (Signature == "!")
                    str += DrawSystemButton("Open", GlobalName, Class);
                else {
                    if (Signature == "~") {
                        if (appRight == 5) {
                            str += DrawSystemButton("Delete", GlobalName, Class, true);
                            //style='float:"+(Lang=='A'?'left':'right')+"'
                        }
                        str += DrawSystemButton("Close", GlobalName, Class);
                        str += DrawSystemButton("Modify", GlobalName, Class);

                    }
                }
            } else {
                if (appRight >= 3 && Signature == "~") {
                    if (Flage == true)
                        str += DrawSystemButton("New", GlobalName, Class);
                    str += DrawSystemButton("Close", GlobalName, Class);
                    str += DrawSystemButton("Modify", GlobalName, Class);
                }
            }
        }
        if (str != "" || StrBtn != "") {
            Drawstr += "<table align='' style='width:90%;float:none;'>";
            Drawstr += "	<tr>";
            Drawstr += "		<td nowrap='nowrap' style='padding-" + (Lang == 'A' ? 'right' : 'left') + ": 300px;'>";
            Drawstr += str;
            Drawstr += StrBtn;
            Drawstr += "		<td>";
            Drawstr += "	</tr>";
            Drawstr += "</table>";
        }
    }
    return Drawstr
}

function drawButtonsWithRight(appRight, Signature, GlobalName, Flag, StrBtn, Class) { //hend
    if (!Flag)
        Flag = false;
    if (!StrBtn)
        StrBtn = "";
    if (!Class)
        Class = false;
    var str = ''
    var Drawstr = "";
    if (appRight >= 2) {
        if (Signature == "") {
            if (appRight >= 2) {
                str += "&nbsp;" + DrawSystemButton("New", GlobalName, Class);
            }
        } else {
            if (appRight >= 4) {
                if (Flag)
                    str += "&nbsp;" + DrawSystemButton("New", GlobalName, Class);
                if (Signature == "!")
                    str += "&nbsp;" + DrawSystemButton("Open", GlobalName, Class);
                else {
                    if (Signature == "~") {
                        if (appRight == 5) {
                            str += "&nbsp;" + DrawSystemButton("Delete", GlobalName, Class, true);
                        }
                        str += "&nbsp;" + DrawSystemButton("Close", GlobalName, Class);
                        str += "&nbsp;" + DrawSystemButton("Modify", GlobalName, Class);

                    }
                }
            } else {
                if (appRight >= 3 && Signature == "~") {
                    if (Flag)
                        str += DrawSystemButton("New", GlobalName, Class);
                    str += DrawSystemButton("Close", GlobalName, Class);
                    str += DrawSystemButton("Modify", GlobalName, Class);
                }
            }
        }
        if (str != "" || StrBtn != "") {
            Drawstr += "<table align='' style='width:90%;float:none;'>";
            Drawstr += "	<tr>";
            Drawstr += "		<td nowrap='nowrap' style='padding-" + (Lang == 'A' ? 'right' : 'left') + ": 300px;'>";
            Drawstr += str;
            Drawstr += StrBtn;
            Drawstr += "		<td>";
            Drawstr += "	</tr>";
            Drawstr += "</table>";
        }
    }
    return Drawstr
}

/*_radwa_*/
function DrawSave(flag, GlobalName, StrBtn, Class) {
    var str = "";
    var Drawstr = "";
    if (!Class) {
        /*Class = false;*/
        Class = 'blue'
    }
    if (!StrBtn)
        StrBtn = "";
    var appRight = GetRigthLevel();
    if (appRight >= 2) {
        if (flag == 0) {
            str += DrawSystemButton("Save", GlobalName, Class);
        } else if (flag == 1) {
            str += DrawSystemButton("Update", GlobalName, Class);
        }
    }
    str += DrawSystemButton("Cancel", GlobalName, Class);
    if (str != "" || StrBtn != "") {
        Drawstr += "<table align='' style='width:5%'>";
        Drawstr += "	<tr>";
        Drawstr += "		<td nowrap='nowrap' style='padding-" + (Lang == 'A' ? 'right' : 'left') + ": 300px;'>";
        Drawstr += str;
        Drawstr += StrBtn;
        Drawstr += "		<td>";
        Drawstr += "	</tr>";
        Drawstr += "</table>";
    }
    return Drawstr;
}

// Eng.Abd Allah
function getAssocArrayLength(tempArray) {
    var result = 0;
    for (tempValue in tempArray) {
        result++;
    }

    return result;
}

function getAttr(item_id) {
    var Name = '';
    var Data = {};
    Data["item_id"] = item_id;
    Data["Exact"] = 'true';
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        data: {
            param0: "general.General",
            param1: "GetBasicattributes",
            param2: dicToString(Data)
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data) {
                Name = data[0].Name;
            }
        },
        error: function() {}
    });
    return Name;
}

//hadeel
function ModifyScope() {
    var modScope = ScopeID;
    if (ScopeID.indexOf('|') < 0) {
        if (ScopeID.split('.').length > 3) {
            modScope = ScopeID.substring(0, ScopeID.indexOf('.', 3)) + '.';
        } else {
            modScope = ScopeID;

        }
    }
    //else modScope=ScopeID.substring(0,ScopeID.indexOf('|'));
    return modScope;
}

//--Get Group Name Type الترميز  // Documented
function GetGroupNameType(GroupNameType) {
    var Letters = '';
    if (GroupNameType == 1)
        Letters = [null, getName("الأولى|1"), getName("الثانية|2"), getName("الثالثة|3"), getName("الرابعة|4"), getName("الخامسة|5"), getName("السادسة|6"), getName("السابعة|7"), getName("الثامنة|8"), getName("التاسعة|9"), getName("العاشرة|10"), getName("الحادية عشر|11"), getName("الثانية عشر|12"), getName("الثالثة عشر|13"), getName("الرابعة عشر|14"), getName("الخامسة عشر|15"), getName("السادسة عشر|16"), getName("السابعة عشر|17"), getName("الثامنة عشر|18"), getName("التاسعة عشر|19"), getName("العشرون|20"), getName("الحادية و العشرون|21"), getName("الثانية و العشرون|22"), getName("االثالثة و العشرون|23"), getName("الرابعة و العشرون"), getName("الخامسة و العشرون|25"), getName("السادسة و العشرون|26"), getName("السابعة و العشرون|27"), getName("الثامنة و العشرون|28"), getName("التاسعة و العشرون|29"), getName("الثلاثون|30"), getName("الحادية والثلاثون|31"), getName("الثانية و االثلاثون|32"), getName("الثالثة و االثلاثون|33"), getName("الرابعةو الثلاثون|34"), getName("الخامسة والثلاثون|35"), getName("السادسة والثلاثون|36"), getName("السابعة والثلاثون|37"), getName("الثامنة و االثلاثون|38"), getName("التاسعة و الثلاثون|39"), getName("الأربعون|40"), getName("الحادية والأربعون|41"), getName("الثانية و الأربعون|42"), getName("الثالثة و الأربعون|43"), getName("الرابعة و الأربعون|44"), getName("الخامسة و الأربعون|45"), getName("السادسة والأربعون|46"), getName("السابعة والأربعون|47"), getName("الثامنة و الأربعون|48"), getName("التاسعة والأربعون|49"), getName("الخمسون|50")];
    else if (GroupNameType == 2)
        Letters = [null, "أ", "ب", "ج", "د", "ح", "خ", "ت", "ث", "ذ", "ر", "ز", "س", "ش", "ص", "ضـ", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];
    else if (GroupNameType == 3)
        Letters = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50];
    else if (GroupNameType == 4)
        Letters = [null, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return Letters;
}

function fillRightsSelect(SelectID, selected) {
    var Selected = parseInt(selected);
    if (!SelectID) SelectID = "";

    var str = ""
    if (SelectID != "") $("#" + SelectID).html('');
    if (SelectID != "") $("<option value=''>---</option>").appendTo("#" + SelectID)
    if (SelectID != "") {
        $("<option value='" + 1 + "'  " + ((1 == Selected) ? "selected" : "") + "  title='" + getName('الاطلاع فقط|Read Only') + "'>" + getName('الاطلاع فقط|Read Only') + "</option>").appendTo("#" + SelectID);
        $("<option value='" + 2 + "'  " + ((2 == Selected) ? "selected" : "") + "  title='" + getName('ادخال|Add') + "'>" + getName('ادخال|Add') + "</option>").appendTo("#" + SelectID);
        $("<option value='" + 3 + "'  " + ((3 == Selected) ? "selected" : "") + "  title='" + getName('تعديل و غلق |Edit and Close') + "'>" + getName('تعديل و غلق |Edit and Close') + "</option>").appendTo("#" + SelectID);
        $("<option value='" + 4 + "'  " + ((4 == Selected) ? "selected" : "") + "  title='" + getName('فتح|Open') + "'>" + getName('فتح|Open') + "</option>").appendTo("#" + SelectID);
        $("<option value='" + 5 + "'  " + ((5 == Selected) ? "selected" : "") + "  title='" + getName('حذف|Delete') + "'>" + getName('حذف|Delete') + "</option>").appendTo("#" + SelectID);
    } else {
        str += "<option value='" + 1 + "'  " + ((1 == Selected) ? "selected" : "") + "  title='" + getName('الاطلاع فقط|Read Only') + "'>" + getName('الاطلاع فقط|Read Only') + "</option>" +
            "<option value='" + 2 + "'  " + ((2 == Selected) ? "selected" : "") + "  title='" + getName('ادخال|Add') + "'>" + getName('ادخال|Add') + "</option>" +
            "<option value='" + 3 + "'  " + ((3 == Selected) ? "selected" : "") + "  title='" + getName('تعديل و غلق |Edit and Close') + "'>" + getName('تعديل و غلق |Edit and Close') + "</option>" +
            "<option value='" + 4 + "'  " + ((4 == Selected) ? "selected" : "") + "  title='" + getName('فتح|Open') + "'>" + getName('فتح|Open') + "</option>" +
            "<option value='" + 5 + "'  " + ((5 == Selected) ? "selected" : "") + "  title='" + getName('حذف|Delete') + "'>" + getName('حذف|Delete') + "</option>";
    }
    return str;

}

//take string ex:-) '1:30' returns minates 90 min
function getMinate(Value) {
    var retVal = "";
    var val = Value;
    if (val) {
        retVal = (val.indexOf(':') != -1 ? parseInt((val.split(':')[0]) * 60) + parseInt(val.split(':')[1]) : parseInt(val) * 60);
    }
    return retVal;
}

//get string hour takes minates 120 min returns 2:00
function getHour(Value) {
    var val = Value;
    var resH = "";
    var resM = "";
    var Time = "";
    if (val) {
        if (val >= 60) {
            if (val % 60 == 0) {
                resH = val / 60;
                resM = '00';
            } else {
                resH = (val - (val % 60)) / 60
                resM = (val % 60); //60 -
                if (resM <= 9) {
                    resM = "0" + resM
                }
            }
        }
        //value minuates only ex: 45
        else {
            resH = '00';
            resM = val;
        }

        Time = resH + ':' + resM;
    }
    return Time;
}

function ClickHereToPrint(_PrintContentID, content) {
    //if (_PrintContentID=="") _PrintContentID="_Content";
    var content_vlue = content;
    var disp_setting = "toolbar=yes,location=no,directories=yes,menubar=yes,";
    disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
    if (_PrintContentID != "") {
        content_vlue = $("#" + _PrintContentID).html();
    }

    var docprint = window.open("", "", disp_setting);
    if (docprint) {
        docprint.document.open();
        docprint.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">');
        docprint.document.write('<html><head><title style="text-align: right;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>' + "<style>/*{color:black !important}*/ h2 {page-break-after:always}@media Print {.tblprint {page-break-inside: auto;page-break-after: always};tr {page-break-inside: avoid;page-break-after: auto}thead {display: table-header-group}tfoot {display: table-footer-group}  #table_one_Res{display: inline-table} .checkboxCol{display:none}}#title {text-align: right;}</style>");
        docprint.document.write('</head><body onLoad="self.print()"><center>');
        docprint.document.write(content_vlue);
        docprint.document.write('</center></body></html>');
        docprint.document.close();
        docprint.focus()
    }


}

function ClickHereToPrint_(_PrintContentID, content) {
    if (_PrintContentID == "") _PrintContentID = "_Content";
    var content_vlue = content;
    var disp_setting = "toolbar=yes,location=no,directories=yes,menubar=yes,";
    disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
    content_vlue = $("#" + _PrintContentID).html();
    var docprint = window.open("", "", disp_setting);
    docprint.document.open();
    docprint.document.write('<html><head><title>Inel Power System</title>');
    docprint.document.write('</head><body onLoad="self.print()"><center>');
    docprint.document.write(content_vlue);
    docprint.document.write('</center></body></html>');
    docprint.document.close();
    docprint.focus();
}

function checkControlIP() {}

function insertLogCertificate(certificateData) {

    var message = ''
    $.ajax({

        url: "/getJCI",
        data: {
            param0: "Reports.RegisterCert",
            param1: "certificateLog",
            param2: "IP",
            param3: "userType",
            param4: JSON.stringify(certificateData),

        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            data = jQuery.parseJSON(d);

            if (data['Msg']) {
                message = data['Msg']
            }

        },
        error: function() {
            error();
        }
    });
    return message
}


function GetPlace(id, tbl) {
    var ID = id;
    var Table = tbl;
    var str = "";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.General",
            param1: "getPlace",
            param2: ID,
            param3: Table
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            data = jQuery.parseJSON(d);
            var Arr = data.split('|');
            str = data.split('|')[0]
            for (i = 1; i < Arr.length; i++) {
                str += ' - ' + data.split('|')[i];
            }
        },
        error: function() {
            error();
        }
    });
    return str
}

function getPeriodIndex(Period, EndFlag) {
    var chkEnd = false,
        index = 0;
    if (EndFlag) {
        chkEnd = EndFlag;
    }
    if (chkEnd) {
        var myRe = new RegExp("^" + Period, "g");
    } else {
        var myRe = new RegExp(Period + "$", "g");
    }

    for (i = 0, l = CelltimeArray.length; i < l; i++) {
        cell = CelltimeArray[i];
        if (myRe.test(cell)) {

            index = ++i;
            break;
        }
    }
    return index;
}

function GetStatuses(selectedId) {
    var str = "";
    var Name = "";
    var ID = "";
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: false,
        data: {
            param0: "general.General",
            param1: "getStatuses",
            param2: true
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            var selected = "";
            if (data) {
                data = data["Statuses"];
                // str += '<option value="">---</option>';
                for (var x = 0; x < data.length; x++) {
                    selected = "";
                    Name = getName(data[x].BAName);
                    ID = data[x].ID;
                    if (ID == selectedId) {
                        selected = " selected = selected "
                    }
                    str += '<option "' + selected + '" value="' + ID + '" title="' + Name + '">' + Name + '</option>';
                }
            }
        },
        error: function() {
            error();
        }
    });
    return str;


}

function ShowHeader(headerTitle, leftlogo, rightlogo, DateHeader = '', fontSize = '', qrCode = '') {
    if (fontSize == '') {
        fontSize = "16"
    }
    var tablebuilder = ""

    tablebuilder += " <table id=headerTbl name=headerTbl border=0  dir=" + (Lang == 'A' ? 'rtl' : 'ltr') + "  style='height:70px;width:100%'> "
    tablebuilder += "        <tr>"
    tablebuilder += "            <TD  style='color=#990000;font:12pt arial;text-align:center;width:20%' align=center >" + (rightlogo == "" ? "" : "<IMG src='/static/images/" + rightlogo + "'   id='ImgLogo' style='width: 82px;height: 102px;'><br>") + "</TD> "
    tablebuilder += "     <TD  align='center' style='color:#2779c3;font-weight:bold;font-size:16px;text-align:center;' >"
    if (qrCode) {
        tablebuilder += "<div style='display:inline-flex; align-items:center; gap:20px;'>";
        tablebuilder += "<div><b><font style='font-size:" + fontSize + "px'>" + headerTitle + "</font></b></div>";
        tablebuilder += "<div>" + qrCode + "</div>";
        tablebuilder += "</div>";
    } else {
        tablebuilder += "<b><font style='font-size:" + fontSize + "px'>" + headerTitle + "</font></b>";
    }

    //  tablebuilder +="    <b><font style='font-size:"+fontSize+"px'>" + headerTitle + " </font> " ;
    // if(qrCode){
    //       tablebuilder +=       "<p style='margin-right: 30px;'>"+qrCode+"</p>" ;
    // }

    tablebuilder += "</TD>"
    tablebuilder += "     <td style='width:20%'>" + (leftlogo == "" ? "" : "<IMG src='/static/images/" + leftlogo + "'   id='ImgLogo' style='width: 82px;height: 102px;' ><br>") + "</td> </tr>"
    tablebuilder += "    <TR  style='width:80%' align='center'> "
    tablebuilder += "           <TD colspan=3 style='color=#990000;font:12pt arial;' valign='bottom'  align = " + ((Lang == "A") ? "left" : "right") + "  ><font style='font-size:12px;color:#000000;'  >" + ((Lang == "A") ? "نظام ابن الهيثم لادارة شئون الطلاب " : "Ibn al-Haytham credit hours ") + " " + ((DateHeader == "") ? GetDate() : DateHeader) + "</font> "
    if (typeof username !== 'undefined') {
        if (username) {
            tablebuilder += "<font style='font-size:12px;color:#000000;'>" + getName("مستخرج البيان|Statement Extractor") + " " + getName(username) + "</font>"
        }
    }
    tablebuilder += "            </td> "
    tablebuilder += "    </tr>"
    tablebuilder += "</table>"
    return tablebuilder;
}

function GetHeader(Title, Dir) {

    if (!Dir) {
        Dir = getName("rtl|ltr");
    }
    var str = "  <table  dir= '" + Dir + "' style='padding-top: 10px;'   border=0>";

    str += "     <tr>";
    str += "            <TD style='color=#990000;font:12pt arial;text-align:center;width:20%' align = " +
        ((Lang == "A") ? "right" : "left") +
        " ><IMG src='" + ImgLogoPath + "'   id='ImgLogo' unselectable=on><br></TD> ";
    str += "            <TD style='color=#990000;font:14pt arial; font-weight:bold;text-align:center;width:80%;'> " +
        Title + "</TD> ";
    str += "            <TD  style='width:20%' > </TD> ";
    str += "    </tr>";

    str += "    <TR> ";
    str += "            <TD style='width:20%' align='center' >" +
        GetItemIDName(ScopeID, "foundations") + " </TD> ";
    str += "           <TD colspan=2 style='color=#990000;font:12pt arial;' valign='bottom'  align = " +
        ((Lang == "A") ? "left" : "right") +
        "  ><font style='font-size:12px;color:#000000;'  >" +
        ((Lang == "A") ? "نظام ابن الهيثم لإدارة شئون الطلاب " :
            "Ibn al-Haytham credit hours ") + " " + GetDate() + "</font> ";
    str += "            </td> ";
    str += "    </tr>";

    str += "      <tr>";
    str += "            <td colspan=3 ></td> ";
    str += "    </tr>";
    str += " </TABLE>";

    return str;
}

function complexPass(password) { //complexPass(password, username)  newer version
    var DIGITS = /[0-9].*/,
        SPECIAL = /[^a-zA-Z0-9ا-ي]/,
        SAME = /['^(.)\1+]/,
        SpChar = /[!@#$%^&*]/;
    if (!password || password.length < 8)
        return 'يجب ان تكون كلمة السر علي الاقل 8 حروف|Password must be at least 8 charcters';


    //if (username && password.toLowerCase().match(username.toLowerCase()))
    //
    //    return 'لايمكن ان تتطابق كلمة السر مع اسم المستخدم |Password can not be username  ';
    //


    if (SAME.test(password)) {
        return '(@,&,%,..) كلمة مرور خاطئه استخدم احرف وارقام واحرف خاصه مثل |Wrong password use alphapetics ,numbers ,special characters like(@,&,%,..)'
    }


    var digits = DIGITS.test(password),

        special = SPECIAL.test(password),

        SpecialChar = SpChar.test(password);

    if (SpecialChar && special && digits)

        return 'true'

    return 'كلمة مرور خاطئه استخدم احرف وارقام واحرف خاصه مثل (@,&,%,..)|Wrong password use alphapetics ,numbers ,special characters like(@,&,%,..)'

}

function CompareDate(value1, value2) {
    var date1, date2;
    var month1, month2;
    var year1, year2;

    date1 = value1.substring(0, value1.indexOf("/"));
    month1 = value1.substring(value1.indexOf("/") + 1, value1.lastIndexOf("/"));
    year1 = value1.substring(value1.lastIndexOf("/") + 1, value1.length);

    date2 = value2.substring(0, value2.indexOf("/"));
    month2 = value2.substring(value2.indexOf("/") + 1, value2.lastIndexOf("/"));
    year2 = value2.substring(value2.lastIndexOf("/") + 1, value2.length);

    if (parseInt(year1, 10) > parseInt(year2, 10)) return 1;
    else if (parseInt(year1, 10) < parseInt(year2, 10)) return -1;
    else if (parseInt(month1, 10) > parseInt(month2, 10)) return 1;
    else if (parseInt(month1, 10) < parseInt(month2, 10)) return -1;
    else if (parseInt(date1, 10) > parseInt(date2, 10)) return 1;
    else if (parseInt(date1, 10) < parseInt(date2, 10)) return -1;
    else return 0;
}

/*_radwa_*/
function getCSS(url) {
    $('head').append($('<link rel="stylesheet" href="' + url + '" type="text/css" media="screen">'))
}

/*_radwa@13/9/2012_*/
jQuery.fn.ForceFloatOnly = function() {
    return this.each(function() {
        $(this).keypress(function(event) {
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
    });
};
/*_radwa@13/9/2012_*/
jQuery.fn.ForceNumericOnly = function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            var key = e.charCode || e.keyCode || 0;
            /* allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY*/
            return (key == 8 || key == 9 || key == 46 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
        });
    });
};

function convertToDate(dateText, time) {

    var arrDate = dateText.split("/");
    if (time)
        if (time.indexOf('PM') == -1)
            var date = new Date(arrDate[2], parseInt(arrDate[1], 10) - 1, parseInt(arrDate[0], 10), time.match(/\d{2}/g)[0] * 1, time.match(/\d{2}/g)[1] * 1);
        else
            var date = new Date(arrDate[2], parseInt(arrDate[1], 10) - 1, parseInt(arrDate[0], 10), ((time.match(/\d{2}/g)[0] * 1) + 12), time.match(/\d{2}/g)[1] * 1);
    else
        var date = new Date(arrDate[2], parseInt(arrDate[1], 10) - 1, parseInt(arrDate[0], 10));

    return date
}

/*_radwa@22/9/2012_*/
function addDays(myDate, days) {
    return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);
}

jQuery.download = function(url, data, method) {
    //url and data options required
    if (url && data) {

        //data can be string of parameters or array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        //split params into form inputs

        var inputs = '';
        jQuery.each(data.split('&'), function() {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });

        //send request
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '" >' + inputs + '</form>')
            .appendTo('body').submit().remove();
        return false;
    };
};

//
function redefine_CKEDITOR() {
    CKEDITOR.on('dialogDefinition', function(ev) {
        // Take the dialog name and its definition from the event data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        if (dialogName == 'link') {
            dialogDefinition.removeContents('advanced');
            dialogDefinition.removeContents('target');
            var infoTab = dialogDefinition.getContents('info');
            infoTab['elements'][0]['items'].splice(1, 1);
        }

        if (dialogName == 'image') {
            dialogDefinition.removeContents('advanced');
            dialogDefinition.removeContents('Link');
        }

        if (dialogName == 'flash') {
            dialogDefinition.removeContents('advanced');
        }

    });
}

function getFaculties(universityId) {
    var str = ""
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "general.BasicData",
            param1: "GetFaculties",
            param2: universityId
        },
        type: "post",
        cache: false,
        async: false,
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (data && (data.length)) {
                str += "<option value=''>---</option>"
                for (var x = 0; x < data.length; x++) {
                    var Name = "";
                    Name = getName(data[x].name)
                    var ID = data[x].idnumber;
                    str += '<option value="' + ID + '"  ' + '  title="' + Name + '">' + Name + '</option>';
                }
            }
        }
    })
    return str;
}

function GetAcadCalenders(silang, stuffAppMapping = null, width = '90%', ScopeIDPortal = null, ScopeProgIDPortal = null, ScopeLevelIDPortal = null, align = "center", showRecruitmentSignature = true, returnOneValue = true, font = {
    "fontSize": "",
    "fontFamily": ""
}) {
    var Dict = {}
    var signatureResult = ''
    if (ScopeID && ScopeID != '') {
        if (ScopeID) {
            Dict['ScopeID'] = ScopeID;
        } else {
            Dict['ScopeID'] = ScopeIDPortal
        }
        if (ScopeProgID) {
            Dict['ScopeProgID'] = ScopeProgID;
        } else {
            Dict['ScopeProgID'] = ScopeProgIDPortal;
        }
        if (ScopeLevelID) {
            Dict['ScopeLevelID'] = ScopeLevelID;
        } else {
            Dict['ScopeLevelID'] = ScopeLevelIDPortal;
        }



        if (stuffAppMapping == null) {
            Dict['ReportID'] = CurrAppID;
        } else {
            Dict['ReportID'] = stuffAppMapping
        }

        if (silang == null)
            silang = Lang;
        Dict['silang'] = silang;
        var accreditationDecisionStr = ""
        var accreditationDecision = "";
        var accreditationStartDate = ""
        var accreditationEndDate = "";
        var accreditationDecisionEn = "";
        var fontSize = "12"
        if ("fontSize" in font) fontSize = font['fontSize'];
        var fontFamily = "Arial"
        if ("fontFamily" in font) fontFamily = font['fontFamily'];
        $.ajax({
            url: "/getJCI",
            data: {
                param0: "ReportsSignature.ReportsSignature",
                param1: "getReportSings",
                param2: JSON.stringify(Dict)
            },
            type: "post",
            cache: false,
            async: false,
            success: function(data1) {
                var data = jQuery.parseJSON(data1);
                if (data && data.RepSigData[0]) {
                    var tbl = "<br><table style='text-align:" + align + ";font-size:" + fontSize + "pt;font-family: " + fontFamily + "' dir=" + ((silang == "E") ? "ltr" : "rtl") + " width='" + width + "' align=" + align + " border=0 class='signatureTable'>"
                    var trHead = ("<tr>");
                    var trNames = ("<tr>");
                    var RepSigData = data.RepSigData[0];
                    $("#slcReportName").val(RepSigData['f3']);
                    if (RepSigData.f4) {
                        var signs = String(RepSigData.f4);
                        var signsData = signs.split(/-(?=\d)/)
                        for (var i = 0; i < signsData.length; i++) {
                            if (!showRecruitmentSignature) {
                                if (getName(signsData[i].split(',')[3], silang) == 'التجنيد')
                                    continue
                            }
                            trHead += ('<th>' + getName(signsData[i].split(',')[3], silang) + '</th>');
                            trNames += ('<td >' + (getName(signsData[i].split(',')[1], silang) != '|' ? getName(signsData[i].split(',')[1], silang) : '') + '</td>');
                        }
                    }
                    trHead += "</tr><tr><td><br><br></td></tr>"
                    trNames += "</tr>";
                    tbl += trHead + trNames + "</table>"
                    if ("AccreditationDecision" in RepSigData && RepSigData['AccreditationDecision']) {

                        accreditationDecisionStr += "<p style='text-align: right;font-weight: bold;font-size:" + fontSize + "pt;font-family:" + fontFamily + ";margin-left: 100px;margin-right: 100px'>";
                        accreditationDecision = RepSigData['AccreditationDecision']['decision'];
                        accreditationDecisionEn = RepSigData['AccreditationDecision']['decision_english']
                        if (silang == 'A' && accreditationDecision)
                            accreditationDecisionStr += accreditationDecision
                        else if (silang == 'E' && accreditationDecisionEn)
                            accreditationDecisionStr += accreditationDecisionEn
                        accreditationDecisionStr += "</p>"
                        if (RepSigData['AccreditationDecision']['start_date'] || RepSigData['AccreditationDecision']['end_date']) {
                            accreditationDecisionStr += "<p style='text-align: right;font-weight: bold;font-size:12pt;margin-left: 100px;margin-right: 100px'>";
                        }

                        if (RepSigData['AccreditationDecision']['start_date']) {
                            accreditationStartDate = getName("من|from", silang) + " " + RepSigData['AccreditationDecision']['start_date'] + " "
                            accreditationDecisionStr += accreditationStartDate
                        }
                        if (RepSigData['AccreditationDecision']['end_date']) {
                            accreditationEndDate = getName("الى|to", silang) + " " + RepSigData['AccreditationDecision']['end_date']
                            accreditationDecisionStr += accreditationEndDate;
                        }
                        accreditationDecisionStr += "</p>"
                    }

                    if (returnOneValue)
                        tbl += accreditationDecisionStr;

                    signatureResult = tbl;

                }
            }
        });
    }

    if (returnOneValue)
        return signatureResult;
    else
        return {
            signatureResult,
            accreditationDecisionStr,
            accreditationDecision,
            accreditationStartDate,
            accreditationEndDate,
            accreditationDecisionEn
        }
}

function GetEnrollementYear(SelectID, ScopeID, ScopeProgID, empty = 'no') {

    var str = ""
    //    	var Dict={}
    //    Dict['ScopeID'] = ScopeID;
    // Dict['ScopeProgID'] = ScopeProgID;

    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        data: {
            param0: "general.General",
            param1: "GetJoinYears",
            param2: ScopeID,
            param3: ScopeProgID

        },
        success: function(d) {

            var data = jQuery.parseJSON(d);

            if (data) {
                $("#" + SelectID).html('');
                if (empty == 'yes') {
                    $("#" + SelectID).append('<option value="">----</option>');
                }
                for (var x = 0; x < data.length; x++) {
                    Name = getName(data[x].Name);
                    ID = data[x].ID;
                    $("#" + SelectID).append('<option value="' + ID + '"    title="' + Name + '">' + Name + '</option>');
                }


            }
        },
        error: function() {}
    });


}


function validateInputString(input, specialChar) {

    var value = input ? input : "";
    var invalidChar = specialChar ? specialChar : ['"', "'", "}", "{", ";", "[", "]"]


    for (var i in invalidChar) {
        var letter = invalidChar[i]
        if (value.includes(letter)) {
            return false;
        }
    }

    return true;

}

function BigTableToExcelNew(printDivId, customHTML) {
    var content = customHTML || document.getElementById(printDivId).innerHTML;
    var divs = document.getElementsByClassName("PageItems");

    // لو عندك أكثر من 50 عنصر، اطبعهم على دفعات
    let batchSize = 20;
    for (let i = 0; i < divs.length; i += batchSize) {
        let batchContent = '';
        for (let j = i; j < i + batchSize && j < divs.length; j++) {
            batchContent += divs[j].outerHTML;
        }
        let myWindow = window.open('', 'Print', 'height=600,width=800');
        myWindow.document.write('<html><head><title>Print</title>');
        myWindow.document.write('<style>h2{page-break-after:always;} table{width:100%;}</style></head><body>');
        myWindow.document.write(batchContent);
        myWindow.document.write('</body></html>');
        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        myWindow.close();
    }
}
var BigTableToExcel = (function() {

    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body dir=rtl><table>{table}</table></body></html>',
        base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            })
        }
    return function(table, name, filename = "download.xls") {
        if (!table.nodeType) table = document.getElementById(table)
        var data = new Blob([table.innerHTML], {
            type: 'text/html'
        });
        var url = window.URL.createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = name + ".xls";
        a.click();
        //adding some delay in removing the dynamically created link solved the problem in FireFox
        setTimeout(function() {
            window.URL.revokeObjectURL(url);
        }, 0);
    }
})()


function tableToExcel(tableID, docName) {

    var elt = document.getElementById(tableID);
    // var wb = XLSX.utils.table_to_book(elt, {sheet: 'sheet'});
    var wb = XLSX.utils.table_to_book(elt, {
        sheet: 'sheet',
        dateNF: 'mm/dd/yyyy',
        cellDates: true,
        raw: true
    });

    XLSX.writeFile(wb, (docName + '.' + ('xlsx')));

}

// function tableToExcelExport(tableId, docName) {
//     var table = document.getElementById(tableId);
//         var tableExport = new TableExport(table);
//         // Get export data for the specified tableId
//         var exportData = tableExport.getExportData()[tableId];
//         // Check if xlsx format is available and data is defined
//         if (exportData && exportData.xlsx && exportData.xlsx.data) {
//             // Generate Blob from export data
//             var blob = new Blob([exportData.xlsx.data], { type: exportData.xlsx.mimeType });
//             // Create download link
//             var link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download =  docName + ".xlsx";
//             // Trigger download
//             link.click();
//         } else {
//             console.error('XLSX export format or data not available for tableId:', tableId);
//         }
// }


// // Format function to replace placeholders in a string
// function format(s, c) {
//     return s.replace(/{(\w+)}/g, function (m, p) {
//         return c[p];
//     });
// }

var tableToExcelOld = (function() {
    // var csvString = 'ı,ü,ü,ğ,ş,#Hashtag,ä,ö';
    //   var universalBOM = "\uFEFF";
    //   '+encodeURIComponent(universalBOM+csvString)+'
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></head>' +
        '<body dir=rtl><table>{table}</table>' +
        '</body></html>',
        base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            })
        }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var data = new Blob([table.innerHTML], {
            type: 'xlsx'
        });
        var url = window.URL.createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = name + ".xls";
        a.click();
        setTimeout(function() {
            window.URL.revokeObjectURL(url);
        }, 0);
    }
})()

function convertImagesToBase64(containerId, callback) {
    const container = document.getElementById(containerId);
    const images = container.querySelectorAll("img");

    let done = 0;

    if (images.length === 0) return callback();

    images.forEach(img => {
        fetch(img.src)
            .then(res => {
                if (!res.ok || !res.headers.get("content-type") ? .includes("image"))
                    throw "Not image";
                return res.blob();
            })
            .then(blob => {
                const r = new FileReader();
                r.onload = () => {
                    img.src = r.result;
                    done++;
                    if (done === images.length) callback();
                };
                r.readAsDataURL(blob);
            })
            .catch(() => {
                img.remove(); // 👈 نشيل الصورة
                done++;
                if (done === images.length) callback();
            });
    });
}


function getProgFeeType() {
    var checkProgFeeType = "0";
    var ret_data = {}
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "systemAdmin.Fees",
            param1: "getProgStdPlanFeeType",
            param2: ScopeProgID || 'x.',
            param3: ScopeID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(data1) {
            var data = jQuery.parseJSON(data1);
            if (data.length > 0) {
                ret_data = {
                    'checkProgFeeType': 1,
                    'prog_profile_fees_type': data
                }
            }
        },
        error: function() {
            error();
        }
    });
    return ret_data;

}


function getProgProfileType() {
    var ProgProfileType = "0";
    $.ajax({
        url: "/getJCI",
        data: {
            param0: "systemAdmin.Fees",
            param1: "getProgProfileFeeType",
            param2: ScopeProgID || 'x.',
            param3: ScopeID
        },
        type: "post",
        cache: false,
        async: false,
        success: function(data1) {
            var data = jQuery.parseJSON(data1);
            if (data.length > 0) {
                ProgProfileType = data
            }
        },
        error: function() {
            error();
        }
    });
    return ProgProfileType;

}

//if ( check_bug) {

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {

    $.ajax({
        url: "/getJCI",
        type: "POST",
        data: {
            param0: "systemAdmin.SystemRule",
            param1: "getSystemRulesBugRun",
        },
        dataType: "json",
        cache: false,
        async: false,
        success: function(results) {
            if (results) {
                if (results.activeFrontBug == 1) {
                    errorMsgText = ("error_msg: " + errorMsg + "</br>" +
                        "line Number: " + lineNumber + "</br>" +
                        "Scope ID: " + ScopeID + "</br>" +
                        "Scope Name: " + ScopeName + "</br>" +
                        "Current Menu Item Name:" + (window.globalThis.CurrSubSysName) + "</br>" +
                        "Current App Name: " + CurrAppName + "</br>" +
                        "Current App ID: " + CurrAppID + "</br>" +
                        "Current Student ID:" + (StudentCurrentID || "") + "</br>" +
                        "Academic Semester:" + (AcademicSemester || '') + "</br>" +
                        "Academic Semester Name:" + (AcademicSemesterName || '') + "</br>" +
                        "Academic Year:" + (AcademicYear || '') + "</br>" +
                        "Academic Year Name:" + (AcademicYearName || '') + "</br>"

                    );


                    $.ajax({
                        url: "/getJCI",
                        data: {
                            param0: "Mail.Mail",
                            param1: "create_redmine_bug_task",
                            param2: " Front End Bug",
                            param3: errorMsgText,
                            param4: (ScopeName || ''),
                            param5: CurrAppName
                        },
                        type: "post",
                        cache: false,
                        async: false,
                        success: function(data1) {
                            var data = jQuery.parseJSON(data1);
                        },
                        error: function() {
                            error();
                        }
                    });
                }

            }
        },
        error: function(error) {

        }
    });


    return false;
};
//}