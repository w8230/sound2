package com.mes.mesWms.Stock.DTO;

import lombok.Data;

@Data
public class WMS_STOCK {
    private String part_grp_name;
    private String part_code;
    private String part_name;
    private String spec;
    private String unit_name;
    private double qty;
    private String part_desc;
    private int rec_count;

    private double prev_qty;
    private double in_qty;
    private double out_qty;

    private String part_type_name;
}
