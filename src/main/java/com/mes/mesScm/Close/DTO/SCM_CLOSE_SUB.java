package com.mes.mesScm.Close.DTO;

import lombok.Data;

@Data
public class SCM_CLOSE_SUB {
    private String site_code;
    private String work_date;
    private String supp_code;
    private String in_no;
    private String part_code;
    private String in_type;
    private double price;
    private int qty;
    private double amounts;
    private String close_no;
    private String part_name;
    private String supp_name;
    private double unit_price;
    private String unit_name;
    private String in_type_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
}
