package com.mes.Mapper.mesSCM.Close;


import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Close.DTO.SCM_CLOSE;
import com.mes.mesScm.Close.DTO.SCM_CLOSE_READY;
import com.mes.mesScm.Close.DTO.SCM_CLOSE_SUB;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CloseMapper {

    List<SCM_CLOSE_READY> scmPartCloseGet(Page p);

    Message scmPartCloseAdd(Page p);

    List<SCM_CLOSE> scmPartCloseSumListGet(Page p);

    List<SCM_CLOSE_SUB> scmPartCloseSumListSubGet(Page p);

    Message scmPartCloseCancelDel(SCM_CLOSE sc);
}
