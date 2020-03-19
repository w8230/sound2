package com.mes.Mapper.Excel;

import com.mes.Common.Excel.DTO.Excel;
import com.mes.mesCrm.Crm.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Crm.DTO.CRM_OUT_SUB;
import com.mes.mesCrm.Crm.DTO.CRM_PLAN;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_BCR;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesQms.Shipment.DTO.QMS_PROD_SUB;
import com.mes.mesScm.Close.DTO.SCM_CLOSE;
import com.mes.mesScm.Half.DTO.SCM_HIN;
import com.mes.mesScm.Half.DTO.SCM_HIN_READY;
import com.mes.mesScm.Half.DTO.SCM_HOUT_SUB;
import com.mes.mesScm.InOut.DTO.*;

import com.mes.mesScm.Inventory.DTO.SCM_STOCK_LIST;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_SUM_MONTH;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD;
import com.mes.mesScm.Standard.DTO.SYS_PART_PRICE;
import com.mes.mesScm.Standard.DTO.sysBPart;
import com.mes.mesTpm.Error.DTO.tpmMachineError;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExcelMapper {
    List<sysBPart> testDbList();
    List<SCM_REQ_ORD> scmReqOrderDbList(Excel excel);
    List<SCM_IN_ORD_SUB> scmOrderListDbList(Excel excel);
    List<SCM_IN_SUB> scmInListDbList(Excel excel);
    List<SCM_OUT_SUB> scmOutListDbList(Excel excel);
    void sysBPartSetListData(sysBPart vo);

    List<SCM_STOCK_RET_SUB> scmStockRetListDbList(Excel excel);

    List<SCM_REIN_SUB> scmInLineListDbList(Excel excel);

    List<SCM_STOCK_LIST> scmStockListDbList(Excel excel);

    List<SCM_STOCK_SUM_DAY> scmStockSumDayListDbList(Excel excel);

    List<SCM_STOCK_SUM_MONTH> scmStockSumMonthListDbList(Excel excel);

    List<CRM_ORD_RECP> crmWorkListDbList(Excel excel);

    List<QMS_RECV_SUB> qmsRecvDbList(Excel excel);

    List<QMS_PROD_SUB> qmsProdDbList(Excel excel);

    List<OUTS_OUT_SUB> outsOutDbList(Excel excel);

    List<OUTS_IN_SUB> outsInDbList(Excel excel);

    List<OUTS_OUT_BCR> outsInReadyDbList(Excel excel);

    List<tpmMachineError> tpmMachineErrorDbList(Excel excel);

    List<SCM_HIN> scmHInListDbList(Excel excel);

    List<SYS_PART_PRICE> sysPartPriceDbList(Excel excel);

    List<WMS_IN_SUB> wmsInListDbList(Excel excel);

    List<WMS_OUT_SUB> wmsOutListDbList(Excel excel);

    List<WMS_OUT_ORD_SUB> wmsOutReadyDbList(Excel excel);

    List<CRM_ORD_RECP> crmProdOrderDbList(Excel excel);

    List<CRM_OUT_SUB> crmOutListDbList(Excel excel);

    List<SCM_IO> scmIOListDbList(Excel excel);

    List<SCM_HIN_READY> scmHInReadyListDbList(Excel excel);

    List<SCM_HOUT_SUB> scmHOutListDbList(Excel excel);

    List<SCM_STOCK_REV_LIST> scmStockRevListDbList(Excel excel);

    List<SCM_CLOSE> scmPartCloseDbList(Excel excel);

    List<WMS_STOCK> wmsStockDbList(Excel excel);

    List<WMS_STOCK> wmsStockIOSumDayDbList(Excel excel);

    List<WMS_STOCK> wmsStockIOSumMonthDbList(Excel excel);

    List<CRM_PLAN> crmPlanDbList(Excel excel);

    List<QMS_PROD_SUB> qmsProdErrorDbList(Excel excel);

    List<QMS_RECV_SUB> qmsRecvErrorDbList(Excel excel);
}
