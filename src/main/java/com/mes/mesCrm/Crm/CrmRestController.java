package com.mes.mesCrm.Crm;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesCrm.Crm.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Crm.DTO.CRM_PLAN;
import com.mes.mesCrm.Crm.DTO.SYS_ASSY_CABLE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@Slf4j
public class CrmRestController {
    @Autowired
    private CrmService crmService;

    @RequestMapping(value = "/crmProdOrderGet", method = RequestMethod.POST)
    public RESTful crmProdOrderGet(HttpServletRequest req, Page p) {
        return crmService.crmProdOrderGet(req, p);
    }

    @RequestMapping(value = "/crmProdOrderOneGet", method = RequestMethod.POST)
    public CRM_ORD_RECP crmProdOrderOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
        return crmService.crmProdOrderOneGet(req, cor);
    }

    @RequestMapping(value = "/crmRecpAdd", method = RequestMethod.POST)
    public String crmRecpAdd(@Valid CRM_ORD_RECP crmOrdRecp, BindingResult errors, HttpServletRequest req){
        String msg = null;
        if(errors.hasErrors()){
            for (ObjectError objectError : errors.getAllErrors()) {
                msg = objectError.getDefaultMessage() + "를 입력하세요.";
            }
            return msg;
        }else{
            return "검증완료";
//            return crmService.crmRecpAdd(crmOrdRecp, req);
        }
    }

    @RequestMapping(value = "/crmOrderRecpAdd", method = RequestMethod.POST)
    public Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp, HttpServletRequest req){
       return crmService.crmOrderRecpAdd(crmOrdRecp,req);
    }

    @RequestMapping(value = "/crmWorkListGet", method = RequestMethod.POST)
    public RESTful crmWorkListGet(HttpServletRequest req, Page p) { return crmService.crmWorkListGet(req, p); }

    @RequestMapping(value = "/crmWorkListOneGet", method = RequestMethod.POST)
    public CRM_ORD_RECP crmWorkListOneGet(HttpServletRequest req, CRM_ORD_RECP cor) {
        return crmService.crmWorkListOneGet(req, cor);
    }

    @RequestMapping(value = "/crmPlanGet", method = RequestMethod.POST)
    public RESTful crmPlanGet(HttpServletRequest req, Page p) { return crmService.crmPlanGet(req, p); }

    @RequestMapping(value = "/crmPlanOneGet", method = RequestMethod.POST)
    public CRM_PLAN crmPlanOneGet(HttpServletRequest req, Page p) { return crmService.crmPlanOneGet(req, p); }

    @RequestMapping(value = "/crmPlanAdd", method = RequestMethod.POST)
    public Message crmPlanAdd(CRM_PLAN cp, HttpServletRequest req){
        return crmService.crmPlanAdd(cp,req);
    }


    @RequestMapping(value = "/crmAssyCableGet", method = RequestMethod.POST)
    public RESTful crmAssyCableGet(HttpServletRequest req, Page p) { return crmService.crmAssyCableGet(req, p); }


    @RequestMapping(value = "/crmAssyCableAdd", method = RequestMethod.POST)
    public Message crmAssyCableAdd(SYS_ASSY_CABLE sac, HttpServletRequest req){
        return crmService.crmAssyCableAdd(sac,req);
    }
    @RequestMapping(value = "/crmAssyCableDel", method = RequestMethod.POST)
    public Message crmAssyCableDel(SYS_ASSY_CABLE sac, HttpServletRequest req){
        return crmService.crmAssyCableDel(sac,req);
    }

    @RequestMapping(value = "/crmOutListGet", method = RequestMethod.POST)
    public RESTful crmOutListGet(HttpServletRequest req, Page p) { return crmService.crmOutListGet(req, p); }

    @RequestMapping(value = "/crmProdOrderAdd", method = RequestMethod.POST)
    public Message crmProdOrderAdd(CRM_ORD_RECP cor, HttpServletRequest req){
        return crmService.crmProdOrderAdd(cor,req);
    }
    @RequestMapping(value = "/crmProdOrderDel", method = RequestMethod.POST)
    public Message crmProdOrderDel(CRM_ORD_RECP cor, HttpServletRequest req){
        return crmService.crmProdOrderDel(cor,req);
    }

    @RequestMapping(value = "/crmWorkListAdd", method = RequestMethod.POST)
    public Message crmWorkListAdd(CRM_ORD_RECP cor, HttpServletRequest req){
        return crmService.crmWorkListAdd(cor,req);
    }
}
