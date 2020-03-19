package com.mes.Mapper.mesSCM.Half;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesScm.Half.DTO.SCM_HIN;
import com.mes.mesScm.Half.DTO.SCM_HIN_READY;
import com.mes.mesScm.Half.DTO.SCM_HOUT_SUB;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HalfMapper {
    List<SCM_HIN> scmHInListGet(Page p);

    List<SCM_HOUT_SUB> scmHOutListGet(Page p);

    List<SCM_HIN_READY> scmHInReadyGet(Page p);
}
