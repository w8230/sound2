package com.mes.mesManager.BOM.DTO;

import lombok.Data;

@Data
public class SYS_HPART_CD {
    private String site_code;
    private String part_code;
    private String part_type;
    private String part_group1;
    private String part_group2;
    private String parent_part_code;
    private String part_name;
    private String line_code;
    private String prod_dept;
    private String prod_type;
    private String user_code;
    private String create_date;
    private String update_date;
    private int seq;
    private String part_type_name;
    private String part_grp_name1;
    private String part_grp_name2;
    private String user_name;
    private String line_name;
    private String line_char;
    private String prod_dept_name;
    private String prod_type_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String remark;
    private String keyword;
}
