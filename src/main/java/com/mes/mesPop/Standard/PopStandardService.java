package com.mes.mesPop.Standard;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesPop.Standard.MesPopMapper;
import com.mes.mesPop.Standard.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class PopStandardService extends ReturnFunction {

    @Autowired
    private MesPopMapper mesPopMapper;

    public RESTful popBcrFormGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_BCR_FORM> rows = mesPopMapper.popBcrFormGet(p);
        return getListData(rows, p);
    }

    public POP_BCR_FORM popBcrFormOneGet(HttpServletRequest req, POP_BCR_FORM pbf) {
        pbf.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popBcrFormOneGet(pbf);
    }

    public Message popBcrFormAdd(HttpServletRequest req, POP_BCR_FORM pbf) {
        pbf.setSite_code(getSessionData(req).getSite_code());
        pbf.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popBcrFormAdd(pbf);
    }

    public Message popBcrFormDel(HttpServletRequest req, POP_BCR_FORM pbf) {
        pbf.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popBcrFormDel(pbf);
    }

    public RESTful popRouteGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_ROUTE_CD> rows = mesPopMapper.popRouteGet(p);
        return getListData(rows,p);
    }

    public POP_ROUTE_CD popRouteOneGet(HttpServletRequest req, POP_ROUTE_CD pr) {
        pr.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popRouteOneGet(pr);
    }

    public Message popRouteAdd(HttpServletRequest req, POP_ROUTE_CD pr) {
        pr.setSite_code(getSessionData(req).getSite_code());
        pr.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popRouteAdd(pr);
    }

    public Message popRouteDel(HttpServletRequest req, POP_ROUTE_CD pr) {
        pr.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popRouteDel(pr);
    }


    public RESTful popLineUserGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_LINE_USER_CD> rows = mesPopMapper.popLineUserGet(p);
        return getListData(rows,p);
    }

    public Message popLineUserAdd(HttpServletRequest req, POP_LINE_USER_CD pluc) {
        pluc.setSite_code(getSessionData(req).getSite_code());
        pluc.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popLineUserAdd(pluc);
    }

    public Message popLineUserDel(HttpServletRequest req, POP_LINE_USER_CD pluc) {
        pluc.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popLineUserDel(pluc);
    }

    public Message popErrorTypeAdd(HttpServletRequest req, POP_LINE_ERROR_CD plec) {
        plec.setSite_code(getSessionData(req).getSite_code());
        plec.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popErrorTypeAdd(plec);
    }

    public RESTful popErrorTypeGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_LINE_ERROR_CD> rows = mesPopMapper.popErrorTypeGet(p);
        return getListData(rows,p);
    }

    public Message popErrorTypeDel(HttpServletRequest req, POP_LINE_ERROR_CD plec) {
        plec.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popErrorTypeDel(plec);
    }

    public RESTful popSpecGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_SPEC> rows = mesPopMapper.popSpecGet(p);
        return getListData(rows,p);
    }

    public Message popSpecAdd(HttpServletRequest req, POP_SPEC ps) {
        ps.setSite_code(getSessionData(req).getSite_code());
        ps.setUser_code(getSessionData(req).getUser_code());
        return mesPopMapper.popSpecAdd(ps);

    }

    public POP_SPEC popSpecOneGet(HttpServletRequest req, POP_SPEC ps) {
        ps.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popSpecOneGet(ps);
    }

    public Message popSpecDel(HttpServletRequest req, POP_SPEC ps) {
        ps.setSite_code(getSessionData(req).getSite_code());
        return mesPopMapper.popSpecDel(ps);
    }
}
