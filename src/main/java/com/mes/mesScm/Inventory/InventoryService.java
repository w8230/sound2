package com.mes.mesScm.Inventory;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesSCM.Inventory.InventoryMapper;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_LIST;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_SUM_MONTH;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class InventoryService extends ReturnFunction {

    @Autowired
    private InventoryMapper inventoryMapper;

    public RESTful scmStockListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_LIST> rows = inventoryMapper.scmStockListGet(p);
        return getListData(rows, p);
    }

    public RESTful scmStockSumDayListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_SUM_DAY> rows = inventoryMapper.scmStockSumDayListGet(p);
        return getListData(rows, p);
    }

    public RESTful scmStockSumMonthListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_SUM_MONTH> rows = inventoryMapper.scmStockSumMonthListGet(p);
        return  getListData(rows, p);
    }

    public RESTful scmStockRevListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_STOCK_REV_LIST> rows = inventoryMapper.scmStockRevListGet(p);
        return  getListData(rows, p);
    }
}
