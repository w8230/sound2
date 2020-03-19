package com.mes.mesCrm.Crm.DTO;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class CRM_ORD_RECP {

    @NotNull
    private String site_code;

    private String ord_no;
    private String work_date;
    private String status1;
    private String status1_name;
    private String status2;
    private String status2_name;
    private String status3;
    private String status3_name;
    private String end_date;
    private String supp_code;
    private String supp_name;
    private String end_supp_code;
    private String end_supp_name;
    private String part_type;
    private String part_group1;
    private String part_group2;
    private String part_grp_code;
    private String part_code;
    private String work_type;
    private String connector1;
    private String connector2;
    private double part_length;
    private String length_type;
    private String part_desc;
    private double qty;
    private String unit_type;
    private String option1;
    private String option2;
    private String option3;
    private String remark;
    private String crm_type;
    private String delivery;
    private String delivery_corp;
    private String delivery_price;
    private String sale_type;
    private String price_type;
    private String prod_type;
    private String sample;
    private String currency_type;
    private String currency_type_name;
    private double unit_price;
    private double price;
    private String supp_ord_no;
    private String payment;
    private String supp_user_name;
    private String supp_tel_no;
    private String user_code;
    private String create_date;
    private String update_date;
    private String part_no;
    private String spec;
    private String unit_name;
    private String crm_type_name;
    private String user_name;
    private String delivery_name;
    private String delivery_corp_name;
    private String delivery_price_name;
    private String sale_type_name;
    private String  price_type_name;
    private String prod_type_name;
    private double sum_price;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;
    private String delivery_addr;
    private String tube;
    private String tube_name;
    private String req_type;
}
