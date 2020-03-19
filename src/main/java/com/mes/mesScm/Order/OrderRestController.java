package com.mes.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/scmReqOrderGet", method = RequestMethod.POST)
    public RESTful scmReqOrderGet(HttpServletRequest req, Page p){
        return orderService.scmReqOrderGet(req, p);
    }

    @RequestMapping(value = "/scmReqOrderSubGet", method = RequestMethod.POST)
    public RESTful scmReqOrderSubGet(HttpServletRequest req, Page p){
        return orderService.scmReqOrderSubGet(req, p);
    }

    @RequestMapping(value = "/scmReqOrderSubAllGet", method = RequestMethod.POST)
    public List<SCM_REQ_ORD_SUB> scmReqOrderSubAllGet(HttpServletRequest req, Page p){
        return orderService.scmReqOrderSubAllGet(req, p);
    }

    @RequestMapping(value = "/scmReqOrderAdd", method = RequestMethod.POST)
    public Message scmReqOrderAdd(HttpServletRequest req, SCM_REQ_ORD_SUB sros) { return orderService.scmReqOrderAdd(req, sros); }

    @RequestMapping(value = "/scmReqOrderDel", method = RequestMethod.POST)
    public Message scmReqOrderDel(HttpServletRequest req, SCM_REQ_ORD sro) { return orderService.scmReqOrderDel(req, sro); }

    @RequestMapping(value = "/scmOrderGet", method = RequestMethod.POST)
    public RESTful scmOrderGet(HttpServletRequest req, Page p){
        return orderService.scmOrderGet(req, p);
    }



    @RequestMapping(value = "/scmOrderListGet", method = RequestMethod.POST)
    public RESTful scmOrderListGet(HttpServletRequest req, Page p) { return orderService.scmOrderListGet(req, p); }

    @RequestMapping(value = "/scmOrderAdd", method = RequestMethod.POST)
    public Message scmInAdd(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderAdd(req, sio);
    }

    @RequestMapping(value = "/scmOrderAdd2", method = RequestMethod.POST)
    public Message scmOrderAdd2(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderAdd2(req, sio);
    }



    @RequestMapping(value = "/scmOrderCancel", method = RequestMethod.POST)
    public Message scmOrderCancel(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderCancel(req, sio);
    }


    @RequestMapping(value = "/scmOrderSub1Get", method = RequestMethod.POST)
    public RESTful scmOrderSub1Get(HttpServletRequest req, Page p){
        return orderService.scmOrderSub1Get(req, p);
    }
    @RequestMapping(value = "/scmOrderSub2Get", method = RequestMethod.POST)
    public List<SCM_IN_ORD_SUB> scmOrderSub2Get(HttpServletRequest req, Page p){
        return orderService.scmOrderSub2Get(req, p);
    }

    @RequestMapping(value = "/scmOrderDel", method = RequestMethod.POST)
    public Message scmOrderDel(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderService.scmOrderDel(req, sio);
    }
}
