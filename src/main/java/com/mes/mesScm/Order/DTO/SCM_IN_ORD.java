package com.mes.mesScm.Order.DTO;

import lombok.Data;

@Data
public class SCM_IN_ORD {
    private String site_code;
    private String ord_no;
    private String work_date;
    private String supp_code;
    private String supp_name;
    private String status;
    private String status_name;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private String view_amount;
    private String t_payment;
    private String t_delivery;
    private String delivery;
    private String attachment;
    private String shipping_addr;
    private String remark;
    private String keyword;
}
