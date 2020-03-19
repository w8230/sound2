package com.mes.mesManager.BOM.DTO;

import lombok.Data;

@Data
public class SYS_PART_NM_CD {
    private String site_code;
    private String part_code;
    private String part_type;
    private String part_group1;
    private String part_group2;
    private String part_name;
    private String series;
    private String center_wire;
    private String frequency;
    private String jacket;
    private String prod_type1;
    private String center_wire1;
    private String user_code;
    private String update_date;
    private String create_date;
    private String route_code;
    private String route_name;
    private String remark;

    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;

    private String part_type_name;
    private String part_grp_name1;
    private String part_grp_name2;

    private String user_name;
}
