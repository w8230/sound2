package com.mes.mesCrm.Crm.DTO;

import lombok.Data;

@Data
public class CRM_PLAN {
    private String site_code;
    private String plan_year;
    private int quarter;
    private String part_code;
    private String plan_name;
    private double month_plan1;
    private double month_plan2;
    private double month_plan3;
    private double month1_plan1;
    private double month1_plan2;
    private double month1_plan3;
    private double month2_plan1;
    private double month2_plan2;
    private double month2_plan3;
    private double month3_plan1;
    private double month3_plan2;
    private double month3_plan3;
    private double plan_qty;
    private double plan1_qty;
    private double plan2_qty;
    private double plan3_qty;
    private double total_qty;
    private double diff_qty;
    private double prod_qty;
    private double stock_qty;
    private String prod_desc;
    private String user_code;
    private String create_date;
    private String update_date;
    private String user_name;
    private String part_name;
    private int rownum;
    private int rownum_page;
    private int rec_count;
    private String keyword;

}



