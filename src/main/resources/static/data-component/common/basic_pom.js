
/**
 * @desc : 기본 시작 
 * @생성자 : 김종효
 * @생성일 : 2019-10-16
 * */
$(document).ready(function() {
	var object = object_send();
	page_init(object);
	object.page_event(object); 
});


/**
 * @desc : 시작 함수 
 * @생성자 : 김종효
 * @생성일 : 2019-11-01
 * */
function page_init(object) {
	
	jqGrid(object); // jqGrid 호출  (jqGrid 보낼 값)
	jqGrid_resizes(object); // jqGrid 사이즈 조정; (jqGrid 아이디 , 상위 태그 클래스)
	
	condition(object);
	updatePagerIcons();
	
}

/**
 * @desc : 이벤트 1 
 * @생성자 : 김종효
 * @생성일 : 2019-11-01
 * */
function page_event1(object) {

	/**
	 * @desc : 조회 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#get_btn").on("click",function(){
		basicGet(object,object.jqGrid_object[0],1); // (jqGrid 아이디, 조회 url, 페이지)
	});

	/**
	 * @desc : 추가 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#add_btn").on("click",function() {
		modalReset(object); // modal 내용 초기화 (column 클래스이름, readonly)
		modal_value_push(object);
		modalOpen(object.modal_name[0]); // modal 오픈 (모달 아이디)
		check(object,"I"); // I, U 
	});

	/**
	 * @desc : 저장 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#addUdate_btn").on("click",function() {
		if (effectiveness(object)) {	 // 유효성 검사 (column 클래스이름, 만든 modal_column)
			au_ajax(object); // 저장, 수정 (column 클래스이름, jqGrid 아이디, 저장수정 url, 모달 아이디)
		}
	});

	/**
	 * @desc : 삭제 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */	
	$("#delete_btn").on("click",function() {
		check(object,"D");
		delete_ajax(object); // 삭제 (jqGrid 아이디, 삭제 url )
	});
	
	/**
	 * @desc : 모달 취소 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#close_btn").on("click",function() {
		modalClose(object.modal_name[0]); // 모달 닫기 (모달 아이디)
	});

	
}

/**
 * @desc : 이벤트 2
 * @사용폼: 관리자(권한그룹관리)
 * @생성자 : 김종효
 * @생성일 : 2019-11-01
 * */
function page_event2(object){
	
	/**
	 * @desc : 저장 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$(document).on("click","#add_btn",function(){
		check_add(object);

	});
	
	/**
	 * @desc : select 박스 바꿀시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$(document).on("change","#code_group",function(){
		select_get(object,0);
	});
	
	
}





function page_event99(object) {
	/**
	 * @desc : sysAuth 조회 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#get_btn").on("click",function(){
		basicGet(object["jqGrid_object"].main_name,object["getUrl"],1); // (jqGrid 아이디, 조회 url, 페이지)
	});

	/**
	 * @desc : sysAuth 추가 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#add_btn").on("click",function() {
		modalReset(object["modal_class"],object["readonly"]); // modal 내용 초기화 (column 클래스이름, readonly)
		modalOpen(object["modal_name"]); // modal 오픈 (모달 아이디)
		check("I"); // I, U 
		console.log(object);
		object.CUD_check = 'C';
			
	});

	/**
	 * @desc : sysAuth 저장 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#addUdate_btn").on("click",function() {
		if (effectiveness(object["modal_class"],object["modal_column"])) {	 // 유효성 검사 (column 클래스이름, 만든 modal_column)
			au_ajax(object["modal_class"],object["jqGrid_object"].main_name,object["auUrl"],object["modal_name"],object["getUrl"]); // 저장, 수정 (column 클래스이름, jqGrid 아이디, 저장수정 url, 모달 아이디)
		}
	});

	/**
	 * @desc : sysAuth 삭제 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */	
	$("#delete_btn").on("click",function() {
		console.log(object);
		check("D");
		delete_ajax(object["jqGrid_object"].main_name,object["deleteUrl"],object["deleteCode"],object["getUrl"]); // 삭제 (jqGrid 아이디, 삭제 url )
	});
	
	/**
	 * @desc : sysAuth 모달 취소 버튼 누를시 
	 * @생성자 : 김종효
	 * @생성일 : 2019-10-16
	 * */
	$("#close_btn").on("click",function() {
		modalClose(object["modal_name"]); // 모달 닫기 (모달 아이디)
	});

	
}














