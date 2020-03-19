package com.mes.Mapper.mesCrm.Crm;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesCrm.Crm.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Crm.DTO.CRM_OUT_SUB;
import com.mes.mesCrm.Crm.DTO.CRM_PLAN;
import com.mes.mesCrm.Crm.DTO.SYS_ASSY_CABLE;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CrmMapper {

    List<CRM_ORD_RECP> crmProdOrderGet(Page p);

    CRM_ORD_RECP crmProdOrderOneGet(CRM_ORD_RECP cor);

    Message crmRecpAdd(CRM_ORD_RECP crmOrdRecp);

    List<CRM_ORD_RECP> crmWorkListGet(Page p);

    CRM_ORD_RECP crmWorkListOneGet(CRM_ORD_RECP cor);

    Message crmOrderRecpAdd(CRM_ORD_RECP crmOrdRecp);

    List<CRM_PLAN> crmPlanGet(Page p);

    Message crmPlanAdd(CRM_PLAN cp);

    List<SYS_ASSY_CABLE> crmAssyCableGet(Page p);

    Message crmAssyCableAdd(SYS_ASSY_CABLE sac);

    Message crmAssyCableDel(SYS_ASSY_CABLE sac);

    List<CRM_OUT_SUB> crmOutListGet(Page p);

    Message crmProdOrderAdd(CRM_ORD_RECP cor);

    Message crmProdOrderDel(CRM_ORD_RECP cor);

    Message crmWorkListAdd(CRM_ORD_RECP cor);

    CRM_PLAN crmPlanOneGet(Page p);
}
