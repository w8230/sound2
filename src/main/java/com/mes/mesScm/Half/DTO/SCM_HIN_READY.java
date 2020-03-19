package com.mes.mesScm.Half.DTO;

import lombok.Data;

@Data
public class SCM_HIN_READY {
    private String line_name;
    private String part_type_name;
    private String part_grp_name;
    private String part_grp_name2;
    private String part_code;
    private String part_name;
    private String bcr_no;
    private String create_date;
    private String spec;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
