package com.mes.mesManager.BOM;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesManager.BOM.BOMMapper;
import com.mes.mesManager.BOM.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class BOMService extends ReturnFunction {
    @Autowired
    private BOMMapper bomMapper;

    public RESTful sysPartNameGroupGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_COMMON2_CD> rows = bomMapper.sysPartNameGroupGet(p);
        return getListData(rows , p);
    }

    public SYS_COMMON2_CD sysPartNameGroupOneGet(HttpServletRequest req, SYS_COMMON2_CD scc) {
        scc.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartNameGroupOneGet(scc);
    }

    public Message sysPartNameGroupAdd(HttpServletRequest req, SYS_COMMON2_CD scc) {
        scc.setSite_code(getSessionData(req).getSite_code());
        scc.setUser_code(getSessionData(req).getUser_code());
        return bomMapper.sysPartNameGroupAdd(scc);
    }

    public Message sysPartNameGroupDel(HttpServletRequest req, SYS_COMMON2_CD scc) {
        scc.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartNameGroupDel(scc);
    }

    public RESTful sysPartGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_PART_CD> rows = bomMapper.sysPartGet(p);
        return getListData(rows , p);
    }

    public SYS_PART_CD sysPartOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartOneGet(p);
    }

    public Message sysPartAdd(HttpServletRequest req, SYS_PART_CD spc) {
        spc.setSite_code(getSessionData(req).getSite_code());
        spc.setUser_code(getSessionData(req).getUser_code());
        return bomMapper.sysPartAdd(spc);
    }

    public Message sysPartDel(HttpServletRequest req, SYS_PART_CD spc) {
        spc.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartDel(spc);
    }

    public RESTful sysPartNameGroup2Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_PART_GROUP2_CD> rows = bomMapper.sysPartNameGroup2Get(p);
        return getListData(rows , p);
    }

    public SYS_PART_GROUP2_CD sysPartNameGroup2OneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartNameGroup2OneGet(p);
    }

    public Message sysPartNameGroup2Add(HttpServletRequest req, SYS_PART_GROUP2_CD spgc) {
        spgc.setSite_code(getSessionData(req).getSite_code());
        spgc.setUser_code(getSessionData(req).getUser_code());
        return bomMapper.sysPartNameGroup2Add(spgc);
    }

    public Message sysPartNameGroup2Del(HttpServletRequest req, SYS_PART_GROUP2_CD spgc) {
        spgc.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartNameGroup2Del(spgc);
    }

    public RESTful sysPartNameGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_PART_NM_CD> rows = bomMapper.sysPartNameGet(p);
        return getListData(rows, p);
    }

    public Message sysPartNameAdd(HttpServletRequest req, SYS_PART_NM_CD spnc) {
        spnc.setSite_code(getSessionData(req).getSite_code());
        spnc.setUser_code(getSessionData(req).getUser_code());
        return bomMapper.sysPartNameAdd(spnc);
    }

    public SYS_PART_NM_CD sysPartNameOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartNameOneGet(p);
    }

    public Message sysPartNameDel(HttpServletRequest req, SYS_PART_NM_CD spnc) {
        spnc.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysPartNameDel(spnc);
    }

    public Message sysSPartAdd2(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return bomMapper.sysSPartAdd2(p);
    }

    public RESTful sysSPartGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYS_HPART_CD> rows = bomMapper.sysSPartGet(p);
        return getListData(rows , p);
    }

    public Message sysSPartAdd(HttpServletRequest req, SYS_HPART_CD shc) {
        shc.setSite_code(getSessionData(req).getSite_code());
        shc.setUser_code(getSessionData(req).getUser_code());
        return bomMapper.sysSPartAdd(shc);
    }

    public Message sysSPartDel(HttpServletRequest req, SYS_HPART_CD shc) {
        shc.setSite_code(getSessionData(req).getSite_code());
        return bomMapper.sysSPartDel(shc);
    }
}
