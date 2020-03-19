package com.mes.Mapper.mesSCM.Inventory;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_LIST;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Inventory.DTO.SCM_STOCK_SUM_MONTH;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InventoryMapper {

    List<SCM_STOCK_LIST> scmStockListGet(Page p);

    List<SCM_STOCK_SUM_DAY> scmStockSumDayListGet(Page p);

    List<SCM_STOCK_SUM_MONTH> scmStockSumMonthListGet(Page p);

    List<SCM_STOCK_REV_LIST> scmStockRevListGet(Page p);
}
