package com.mes.mesScm.Close.DTO;

import lombok.Data;

@Data
public class SCM_CLOSE {
    private String site_code;
    private String work_date;
    private String supp_code;
    private String user_code;
    private String create_date;
    private String remark;
    private String close_no;
    private double amounts;
    private String supp_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
