package com.mes.Mapper.mesOut.mesOut;

import com.mes.Common.DataTransferObject.Page;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_BCR;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MesOutMapper {

    List<OUTS_OUT_SUB> outsOutListGet(Page p);

    List<OUTS_IN_SUB> outsInListGet(Page p);

    List<OUTS_OUT_BCR> outsInReadyGet(Page p);
}
