package com.mes.mesScm.Inventory;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class InventoryController {
    @RequestMapping(value = "/scmStockList")
    public String sysBPartGroup() {
        return "mesScm/Inventory/scmStockList/scmStockList";
    }

    @RequestMapping(value ="/scmStockSumDay")
    public String scmStockSumDay() { return "mesScm/Inventory/scmStockSumDay/scmStockSumDay"; }

    @RequestMapping(value ="/scmStockSumMonth")
    public String scmStockSumMonth() { return "mesScm/Inventory/scmStockSumMonth/scmStockSumMonth"; }

    @RequestMapping(value ="/scmStockRevList")
    public String scmStockRevList() { return "mesScm/Inventory/scmStockRevList/scmStockRevList"; }
}
