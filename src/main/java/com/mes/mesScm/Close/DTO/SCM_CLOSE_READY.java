package com.mes.mesScm.Close.DTO;

import lombok.Data;

@Data
public class SCM_CLOSE_READY {
    private String site_code;
    private String work_date;
    private String update_date;
    private String supp_code;
    private String ch_no;
    private String this_name;
    private String part_code;
    private int qty;
    private int seq;
    private String supp_name;
    private String part_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
