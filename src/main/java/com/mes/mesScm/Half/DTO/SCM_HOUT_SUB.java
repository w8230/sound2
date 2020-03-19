package com.mes.mesScm.Half.DTO;

import lombok.Data;

@Data
public class SCM_HOUT_SUB {
    private String site_code;
    private String out_no;
    private String part_code;
    private double qty;
    private String part_name;
    private String spec;
    private String unit_name;
    private String work_date;
    private String user_name;
    private String line_name;
    private String update_date;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
