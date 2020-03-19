package com.mes.mesScm.Close;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesSCM.Close.CloseMapper;
import com.mes.mesScm.Close.DTO.SCM_CLOSE;
import com.mes.mesScm.Close.DTO.SCM_CLOSE_READY;
import com.mes.mesScm.Close.DTO.SCM_CLOSE_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class CloseService extends ReturnFunction {

    @Autowired
    private CloseMapper closeMapper;

    public RESTful scmPartCloseGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_CLOSE_READY> rows = closeMapper.scmPartCloseGet(p);
        return getListData(rows , p);
    }

    public Message scmPartCloseAdd(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return closeMapper.scmPartCloseAdd(p);
    }

    public RESTful scmPartCloseSumListGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_CLOSE> rows = closeMapper.scmPartCloseSumListGet(p);
        return getListData(rows , p);
    }

    public RESTful scmPartCloseSumListSubGet(Page p, HttpServletRequest req) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_CLOSE_SUB> rows = closeMapper.scmPartCloseSumListSubGet(p);
        return getListData(rows , p);
    }

    public Message scmPartCloseCancelDel(HttpServletRequest req, SCM_CLOSE sc) {
        sc.setSite_code(getSessionData(req).getSite_code());
        return closeMapper.scmPartCloseCancelDel(sc);
    }
}
