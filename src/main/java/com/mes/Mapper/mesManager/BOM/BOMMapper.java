package com.mes.Mapper.mesManager.BOM;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesManager.BOM.DTO.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BOMMapper {
    List<SYS_COMMON2_CD> sysPartNameGroupGet(Page p);

    Message sysPartNameGroupAdd(SYS_COMMON2_CD scc);

    SYS_COMMON2_CD sysPartNameGroupOneGet(SYS_COMMON2_CD scc);

    Message sysPartNameGroupDel(SYS_COMMON2_CD scc);

    List<SYS_PART_CD> sysPartGet(Page p);

    SYS_PART_CD sysPartOneGet(Page p);

    Message sysPartAdd(SYS_PART_CD spc);

    Message sysPartDel(SYS_PART_CD spc);

    List<SYS_PART_GROUP2_CD> sysPartNameGroup2Get(Page p);

    SYS_PART_GROUP2_CD sysPartNameGroup2OneGet(Page p);

    Message sysPartNameGroup2Add(SYS_PART_GROUP2_CD spgc);

    Message sysPartNameGroup2Del(SYS_PART_GROUP2_CD spgc);

    List<SYS_PART_NM_CD> sysPartNameGet(Page p);

    Message sysPartNameAdd(SYS_PART_NM_CD spnc);

    SYS_PART_NM_CD sysPartNameOneGet(Page p);

    Message sysPartNameDel(SYS_PART_NM_CD spnc);

    Message sysSPartAdd2(Page p);

    List<SYS_HPART_CD> sysSPartGet(Page p);

    Message sysSPartAdd(SYS_HPART_CD shc);

    Message sysSPartDel(SYS_HPART_CD shc);
}
