package com.mes.mesScm.Half;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesSCM.Half.HalfMapper;
import com.mes.mesScm.Half.DTO.SCM_HIN;
import com.mes.mesScm.Half.DTO.SCM_HIN_READY;
import com.mes.mesScm.Half.DTO.SCM_HOUT_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class HalfService extends ReturnFunction {
    @Autowired
    private HalfMapper halfMapper;

    public RESTful scmHInListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_HIN> rows = halfMapper.scmHInListGet(p);
        return getListData(rows, p);
    }

    public RESTful scmHOutListGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_HOUT_SUB> rows = halfMapper.scmHOutListGet(p);
        return getListData(rows, p);
    }

    public RESTful scmHInReadyGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SCM_HIN_READY> rows = halfMapper.scmHInReadyGet(p);
        return getListData(rows, p);
    }
}
