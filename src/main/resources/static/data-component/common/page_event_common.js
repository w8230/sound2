/**
 * @desc : 기본(조회 저장 수정 삭제) 모듈화
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */


/**
 * @desc : 기본 조회
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function basicGet(object, jqGrid_object, page) {

    if (object.condition_class != null) {
        if (page !== 0) {
            var class_name = object.condition_class;
            object.condition_objact = valueReturn(class_name);
            ;

        }


        if (object.add_after != null && object.add_after) {
            object.add_after = false;
        }


        if (effectiveness_condition(object, object.condition_objact)) {
            $(jqGrid_object.main_name).setGridParam({
                url: object.getUrl,
                datatype: "json",
                page: page,
                postData: object.condition_objact
            }).trigger("reloadGrid");
        }
    } else {

        $(jqGrid_object.main_name).setGridParam({
            url: object.getUrl,
            datatype: "json",
            page: page
        }).trigger("reloadGrid");
    }

}


/**
 * @desc : 수정 삭제시 다시 조회
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function basicGet_post(object, jqGrid_object, page) {

    if (object.condition_class != null) {
        $(jqGrid_object.main_name).setGridParam({
            url: object.getUrl,
            datatype: "json",
            page: page,
            postData: object.condition_objact
        }).trigger("reloadGrid");
    } else {

        $(jqGrid_object.main_name).setGridParam({
            url: object.getUrl,
            datatype: "json",
            page: page
        }).trigger("reloadGrid");
    }

}


/**
 * @desc : 다중 모달
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function modal_value_push(object) {
    if (object.main_value_class != null) {
        $(object.main_value_class[1]).val($(object.main_value_class[0]).val());
        if (object.main_value_class.length === 3) {
            $(object.main_value_class[2]).val($(object.main_value_class[0] + " option:selected").text().trim());
        }
    }
}


/**
 * @desc : 저장 수정
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function au_ajax(object) {


    var class_name = object.modal_class;
    var jqgrid_name = object.jqGrid_object[0].main_name;
    var add_url = object.auUrl;
    var modal_name = object.modal_name;
    var getUrl = object.getUrl;


    var text = '저장하겠습니까?';
    if (object.cud_check === "U") {
        text = '수정하겠습니까?';
    }
    if (confirm(text)) {
        var modal_objact = valueReturn(class_name);
        callback(function () {
            modal_objact.keyword = object.cud_check;

            $.ajax({
                url: add_url,
                data: modal_objact,
                type: 'POST',
                async: true,
                dataType: "json",
                success: function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {

                        if (object.cud_check === "I") {
                            if (object.add_after != null && object.add_after) {

                            } else {
                                basicGet(object, object.jqGrid_object[0], 1);
                            }

                        } else {
                            basicGet_post(object, object.jqGrid_object[0], $(jqgrid_name).getGridParam('page'));
                        }
                    }
                    modalClose(object.modal_name[0]);
                },
                error: function () {
                    alert("저장실패");
                }
            });
        });
    }
}

/**
 * @desc : 모달 초기화
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function modalReset(object) {

    var class_name = object.modal_class;
    var readonly = object.readonly;
    $(class_name).each(function (i) {
        for (var i = 0; i < readonly.length; i++) {
            if (readonly[i] === $(this).attr("name")) {
                $(this).removeAttr("readonly");
            }
        }
        $(this).val("").trigger('change');
    });
}

/**
 * @desc : 모달 편집
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function modal_edit(object, data) {
    var class_name = object.modal_class;
    var readonly = object.readonly;
    $(class_name).each(function (i) {
        for (var i = 0; i < readonly.length; i++) {
            if (readonly[i] === $(this).attr("name")) {
                $(this).attr("readonly", "readonly");
            }
        }
        $(this).val(data[$(this).attr("name")]).trigger('change');
    });
}

/**
 * @desc : 삭제
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function delete_ajax(object) {

    var jqgrid_name = object.jqGrid_object[0].main_name;
    var delete_url = object.deleteUrl;;


    var ids = $(jqgrid_name).getGridParam('selarrrow');

    if (ids.length === 0) {
        alert("삭제하는 데이터를 선택해주세요");
    } else {
        if (confirm("삭제하겠습니까?")) {
            wrapWindowByMask2();
            var code = ids.join(",");
            callback(function () {
                $.ajax({
                    url: delete_url,
                    data: {keyword:code},
                    type: 'POST',
                    async: true,
                    dataType: "json",
                    success: function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            basicGet_post(object, object.jqGrid_object[0], $(jqgrid_name).getGridParam('page'));
                        }
                        closeWindowByMask();
                    },
                    error: function () {
                        alert("삭제실패");
                    }
                });
            });

        }

    }
}

/**
 * @desc : 모달 open
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function modalOpen(modal_name) {

    $(modal_name).dialog('open');
}

/**
 * @desc : close
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function modalClose(modal_name) {
    $(modal_name).dialog('close');
}

/**
 * @desc : value 값 return
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function valueReturn(class_name) {
    var modal_objact = {};
    var objectName = null;
    var objectValue = null;
    $(class_name).each(function (i) {
        objectName = $(this).attr("name");
        objectValue = $(this).val();
        modal_objact[objectName] = objectValue;
    });
    return modal_objact

}


/**
 * @desc : 유효성 검사
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function effectiveness(object) {
    var class_name = object.modal_class;
    var modal_column = object.modal_column
    var value = valueReturn(class_name);
    for (var v in modal_column) {
        if (value[v] === "" || value[v] === null) {
            alert(modal_column[v]);
            return false;
        }
    }
    return true;
}

/**
 * @desc : 조건 유효성
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function effectiveness_condition(object, condition_object_send) {

    var condition_column = object.condition_column
    var value = condition_object_send;
    console.log("~~~~~~~~~~~~~~~~~~");
    console.log(value);
    for (var v in condition_column) {
        if (value[v] === "" || value[v] === null) {
            if (value[v] === " ") {
                console.log("공백이 포함됨");
            }
            alert(condition_column[v]);
            return false;
        }
    }
    return true;
}


/**
 * @desc : check 값 넣기
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function check(object, what) {
    object.cud_check = what;
}


/**
 * @desc : 조건 생성
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function condition(object) {
    if (object.select_tag != null) {
        select2_use(object);
    }

    if (object.date_tag != null) {
        date_use(object);
    }

    if (object.modal_name != null) {
        modal_dialog(object); // 모달창 생성
    }
}

/**
 * @desc : select2 생성
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function select2_use(object) {
    var select_tag = object.select_tag;
    for (var i = 0; i < select_tag.length; i++) {
        $(select_tag[i].tag).select2();
        if (select_tag[i].url != null) {
            select_make(i, select_tag);
        }


    }
}

/**
 * @desc : datepicker 생성
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function date_use(object) {
    var date_tag = object.date_tag;
    for (var i = 0; i < date_tag.length; i++) {
        $(date_tag[i]).datepicker(date);


    }
}

/**
 * @desc : datepicker date
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
var date = {
    calendarWeeks: false,

    todayHighlight: true,

    autoclose: true,

    format: "yyyy-mm-dd",

    language: "kr"


}

/**
 * @desc : select2 생성
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function select_make(i, select_tag) {
    $.ajax({
        url: select_tag[i].url,
        type: 'POST',
        async: true,
        dataType: "json",
        success: function (data) {
            var option = null
            for (var j = 0; j < data.length; j++) {
                option = $("<option></option>").text(data[j][select_tag[i].textName]).val(data[j][select_tag[i].valueName]);
                $(select_tag[i].tag).append(option);
            }
            $(select_tag[i].tag).select2();

        }
    });
}

/**
 * @desc : 다중 jqgrid
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function jqGrid(object) {
    var jqGrid_object = object.jqGrid_object;
    for (var i = 0; i < jqGrid_object.length; i++) {
        (jqGrid_object[i].jqGrid_function)(jqGrid_object[i], object);
    }
}

/**
 * @desc : 다중 jqgrid resize
 * @생성자 : 김종효
 * @생성일 : 2019-10-24
 * */
function jqGrid_resizes(object) {
    var jqGrid_object = object.jqGrid_object;

    for (var i = 0; i < jqGrid_object.length; i++) {
        if (jqGrid_object[i].page_name != null) {
            jqGrid_resize(jqGrid_object[i].main_name, jqGrid_object[i].jqGrid_top_tag, jqGrid_object[i].page_name);
        } else {
            jqGrid_resize_noPage(jqGrid_object[i].main_name, jqGrid_object[i].jqGrid_top_tag);
        }
    }
}

/**
 * @desc : 모달창
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function modal_dialog(object) {
    for (var i = 0; i < object.modal_name.length; i++) {
        $(object.modal_name[i]).dialog(object.modal_size[i]);

    }
}

function check_add(object) {
    if (object.condition_objact.keyword == null) {
        alert(object.condition_column.keyword);
    } else {
        if (confirm("저장하겠습니까?")) {
            var ids2 = $(object.jqGrid_object[1].main_name).getRowData();
            $.ajax({
                url: object.addUrl,
                data: JSON.stringify(ids2),
                type: 'POST',
                async: true,
                contentType: 'application/json',
                dataType: "json",
                success: function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        basicGet(object, object.jqGrid_object[1], 0);
                    }
                },
                error: function () {
                    alert("저장실패");
                }
            });

        }
    }
}


/**
 * @desc : select 박스 바꿀시
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function select_get(object, page) {
    if (object.condition_objact.keyword == null) {
        alert(object.condition_column.keyword);
    } else {
        object.condition_objact.keyword2 = $(object.select_tag[0].tag).val();
        basicGet(object, object.jqGrid_object[1], page);
    }
}


/**
 * @desc : jqGrid basic
 * @생성자 : 김종효
 * @생성일 : 2019-10-22
 * */
function jqGrid_basic(jqGrid_object, object) {
    $(jqGrid_object.main_name).jqGrid({
        datatype: "local",
        mtype: 'POST', // controller RequestMethod 같게
        colNames: jqGrid_object.colNames, // jqGrid 상단부
        colModel: jqGrid_object.colModel, // jqGrid 하단부 상단부와 길이가 같게
        autowidth: true,
        height: jqGrid_object.height, // jqGrid 높이
        pager: jqGrid_object.page_name, // jqGrid 페이지
        jsonReader: {cell: ""},
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        multiselect: true, // jqGrid 체크 박스 생성
        beforeSelectRow: function (rowid, e) {          // jqGrid 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // jqGrid 더블 클릭시 실행
            var data = $(object.jqGrid_object[0].main_name).jqGrid('getRowData', rowid);
            modalReset(object); // modal 내용 초기화 (column 클래스이름, readonly)
            modal_edit(object, data); // modal 내용을  편집 (column 클래스이름, jqGrid 받은 데이터, readonly)
            modalOpen(object.modal_name[0]); // modal 오픈 (모달 아이디)
            check(object, "U"); // I, U
        },
        shrinkToFit: true,
        caption: jqGrid_object.caption
    }).navGrid(jqGrid_object.page_name, {search: false, add: false, edit: false, del: false});
}

/**
 * @desc : jqGrid basic2
 * @생성자 : 김종효
 * @생성일 : 2019-11-11
 * */
function jqGrid_basic2(jqGrid_object, object) {
    $(jqGrid_object.main_name).jqGrid({
        url: jqGrid_object.url,
        datatype: "json",
        mtype: 'POST', // controller RequestMethod 같게
        colNames: jqGrid_object.colNames, // jqGrid 상단부
        colModel: jqGrid_object.colModel, // jqGrid 하단부 상단부와 길이가 같게
        autowidth: true,
        height: jqGrid_object.height, // jqGrid 높이
        jsonReader: {cell: ""},
        viewrecords: true,
        caption: jqGrid_object.caption,
        onCellSelect: function (rowid, iRow, iCol, e) { // jqGrid 더블 클릭시 실행
            object.condition_objact = valueReturn(object.condition_class);
            object.condition_objact.keyword = rowid;
            basicGet(object, object.jqGrid_object[1], 0);
        },

        rowNum: ''
    });
}

/**
 * @desc : jqGrid basic3
 * @생성자 : 김종효
 * @생성일 : 2019-11-11
 * */
function jqGrid_basic3(jqGrid_object, object) {
    $(jqGrid_object.main_name).jqGrid({
        datatype: "local",
        mtype: 'POST', // controller RequestMethod 같게
        colNames: jqGrid_object.colNames, // jqGrid 상단부
        colModel: jqGrid_object.colModel, // jqGrid 하단부 상단부와 길이가 같게
        autowidth: true,
        height: jqGrid_object.height, // jqGrid 높이
        jsonReader: {cell: ""},
        viewrecords: true,

        rowNum: 0,
        caption: jqGrid_object.caption
    });
}

/**
 * @desc : jqGrid resize
 * @생성자 : 김종효
 * @생성일 : 2019-10-22
 * */
// jqGrid 사이즈 재조정 (반응형)  jqGriid 테이블 아이디, 그 상단 아이디
function jqGrid_resize(main_name, top_name, mes_grid_pager) {
    $(window).bind('resize', function () {
        $(main_name).setGridWidth('width', true);
        $(main_name).setGridWidth($(top_name).width(), true);

        $(mes_grid_pager).removeAttr("style");
    }).trigger('resize');
}

/**
 * @desc : jqGrid resize 페이지x
 * @생성자 : 김종효
 * @생성일 : 2019-10-22
 * */
function jqGrid_resize_noPage(main_name, top_name) {
    $(window).bind('resize', function () {
        $(main_name).setGridWidth('width', true);
        $(main_name).setGridWidth($(top_name).width(), true);

    }).trigger('resize');
}

/**
 * @desc : jqGrid 날짜 필터
 * @생성자 : 김종효
 * @생성일 : 2019-10-22
 * */
function formmatter_date(cellValue) { // 날짜 필터
    if (cellValue == null) {
        return '';
    } else {

        var y = cellValue.substring(0, 4);
        var m = cellValue.substring(4, 6);
        var d = cellValue.substring(6, 8);
        var h = cellValue.substring(8, 10);
        var mm = cellValue.substring(10, 12);
        var s = cellValue.substring(12, 14);
        var date = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
        return date;
    }
}

/**
 * @desc : 폴더 그림 생성
 * @생성자 : 김종효
 * @생성일 : 2019-11-01
 * */
function cell(cellvalue, options, rowObject) {
    if (rowObject.menu_name === '게시판') {
        if (rowObject.level === 1) {
            return '<img src="/images/icon/folder.png" style="max-width: 17px;" />' + cellvalue;
        } else if (rowObject.level === 2) {
            return "           " + '<img src="/images/icon/File.png" style="max-width: 17px;" />' + cellvalue;
        }

    } else {
        if (rowObject.level === 1) {
            return '<img src="/ui-component/assets/images/icon/folder.png" style="max-width: 17px;" />' + cellvalue;
        } else if (rowObject.level === 2) {
            return '	<img src="/ui-component/assets/images/icon/folder.png" style="max-width: 17px;" />' + cellvalue;
        } else if (rowObject.level === 3) {
            return '		<img src="/ui-component/assets/images/icon/File.png" style="max-width: 17px;" />' + cellvalue;
        }
    }
}


function updatePagerIcons() {
    var replace =
        {
            'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
            'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
            'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
        };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

        if ($class in replace) icon.attr('class', 'ui-icon ' + replace[$class]);
    })
}


/**
 * @desc : callback 함수
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
function callback(cb) {
    cb();
}