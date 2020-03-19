package com.mes.mesScm.Inventory.DTO;

import lombok.Data;

@Data
public class SCM_STOCK_REV_LIST {
        private String part_type_name;
        private String part_grp_name;
        private String part_grp_name2;
        private String part_grp_name3;
        private String part_code;
        private String part_name;
        private String spec;
        private String unit_name;
        private String bcr;
        private double stock_qty_prev;
        private double stock_qty;
        private double increase_qty;
        private double aaaa;
        private String rev_code;
        private String user_name;
        private String update_date;
        private int rec_count;

        private String work_date;
        private String rev_no;
        private String rev_name;
}
