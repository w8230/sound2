package com.mes.Mapper.mesSCM.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD_SUB;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderMapper {
    List<SCM_IN_ORD> scmOrderGet(Page p);
    List<SCM_REQ_ORD> scmReqOrderGet(Page p);
    List<SCM_IN_ORD_SUB> scmOrderListGet(Page p);
    Message scmOrderAdd(SCM_IN_ORD sio);
    Message scmOrderDel(SCM_IN_ORD sio);

    List<SCM_IN_ORD_SUB> scmOrderSub1Get(Page p);

    Message scmReqOrderAdd(SCM_REQ_ORD_SUB sros);

    Message scmOrderAdd2(SCM_IN_ORD sio);

    List<SCM_REQ_ORD_SUB> scmReqOrderSubGet(Page p);

    Message scmReqOrderDel(SCM_REQ_ORD sro);

    Message scmOrderCancel(SCM_IN_ORD sio);
}
