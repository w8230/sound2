package com.mes.mesCrm.Crm;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class CrmController {
    @RequestMapping(value = "/crmOrderRecp")
    public String crmOrderRecp() {
        return "mesCrm/Crm/crmOrderRecp/crmOrderRecp";
    }

    @RequestMapping(value = "/crmPlan")
    public String crmPlan() {
        return "mesCrm/Crm/crmPlan/crmPlan";
    }

    @RequestMapping(value = "/crmWorkList")
    public String crmWorkList() { return "mesCrm/Crm/crmWorkList/crmWorkList"; }

    @RequestMapping(value = "/crmProdOrder")
    public String crmProdOrder() { return "mesCrm/Crm/crmProdOrder/crmProdOrder"; }

    @RequestMapping(value = "/crmAssyCable")
    public String crmAssyCable() { return "mesCrm/Crm/crmAssyCable/crmAssyCable"; }

    @RequestMapping(value = "/crmOutList")
    public String crmOutList() { return "mesCrm/Crm/crmOutList/crmOutList"; }
}
