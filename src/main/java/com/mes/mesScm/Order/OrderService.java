package com.mes.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesSCM.Order.OrderMapper;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class OrderService extends ReturnFunction {
    @Autowired
    private OrderMapper orderMapper;

    public RESTful scmReqOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_REQ_ORD> rows = orderMapper.scmReqOrderGet(p);
        return getListData(rows, p);
    }

    public RESTful scmOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_ORD> rows = orderMapper.scmOrderGet(p);
        return getListData(rows, p);
    }

    public RESTful scmOrderListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderListGet(p);
        return getListData(rows, p);
    }

    public Message scmOrderAdd(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setSite_code(getSessionData(req).getSite_code());
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderAdd(sio);
    }

    public Message scmOrderDel(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmOrderDel(sio);
    }


    public RESTful scmOrderSub1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderSub1Get(p);
        return getListData(rows, p);
    }

    public List<SCM_IN_ORD_SUB> scmOrderSub2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmOrderSub1Get(p);
    }

    public Message scmReqOrderAdd(HttpServletRequest req, SCM_REQ_ORD_SUB sros) {
        sros.setSite_code(getSessionData(req).getSite_code());
        sros.setUser_code(getSessionData(req).getUser_code());
        return  orderMapper.scmReqOrderAdd(sros);
    }

    public Message scmOrderAdd2(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setSite_code(getSessionData(req).getSite_code());
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderAdd2(sio);
    }

    public RESTful scmReqOrderSubGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_REQ_ORD_SUB> rows = orderMapper.scmReqOrderSubGet(p);
        return getListData(rows, p);
    }

    public List<SCM_REQ_ORD_SUB> scmReqOrderSubAllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmReqOrderSubGet(p);
    }

    public Message scmReqOrderDel(HttpServletRequest req, SCM_REQ_ORD sro) {
        sro.setSite_code(getSessionData(req).getSite_code());
        return orderMapper.scmReqOrderDel(sro);
    }

    public Message scmOrderCancel(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setSite_code(getSessionData(req).getSite_code());
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderCancel(sio);
    }
}
