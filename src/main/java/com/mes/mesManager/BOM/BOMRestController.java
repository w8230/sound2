package com.mes.mesManager.BOM;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesManager.BOM.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class BOMRestController {
    @Autowired
    private BOMService bomService;

    @RequestMapping(value = "/sysPartNameGroupGet", method = RequestMethod.POST)
    public RESTful sysPartNameGroupGet(HttpServletRequest req, Page p) {
        return bomService.sysPartNameGroupGet(req, p);
    }

    @RequestMapping(value = "/sysPartNameGroupOneGet", method = RequestMethod.POST)
    public SYS_COMMON2_CD sysPartNameGroupOneGet(HttpServletRequest req, SYS_COMMON2_CD scc) {
        return bomService.sysPartNameGroupOneGet(req, scc);
    }

    @RequestMapping(value = "/sysPartNameGroupAdd", method = RequestMethod.POST)
    public Message sysPartNameGroupAdd(HttpServletRequest req, SYS_COMMON2_CD scc) {
        return bomService.sysPartNameGroupAdd(req, scc);
    }

    @RequestMapping(value = "/sysPartNameGroupDel", method = RequestMethod.POST)
    public Message sysPartNameGroupDel(HttpServletRequest req, SYS_COMMON2_CD scc) {
        return bomService.sysPartNameGroupDel(req, scc);
    }

    @RequestMapping(value = "/sysPartGet", method = RequestMethod.POST)
    public RESTful sysPartGet(HttpServletRequest req, Page p) {
        return bomService.sysPartGet(req, p);
    }

    @RequestMapping(value = "/sysPartOneGet", method = RequestMethod.POST)
    public SYS_PART_CD sysPartOneGet(HttpServletRequest req, Page p) {
        return bomService.sysPartOneGet(req, p);
    }

    @RequestMapping(value = "/sysPartAdd", method = RequestMethod.POST)
    public Message sysPartAdd(HttpServletRequest req, SYS_PART_CD spc) {
        return bomService.sysPartAdd(req, spc);
    }

    @RequestMapping(value = "/sysPartDel", method = RequestMethod.POST)
    public Message sysPartDel(HttpServletRequest req, SYS_PART_CD spc) {
        return bomService.sysPartDel(req, spc);
    }

    @RequestMapping(value = "/sysPartNameGroup2Get", method = RequestMethod.POST)
    public RESTful sysPartNameGroup2Get(HttpServletRequest req, Page p) {
        return bomService.sysPartNameGroup2Get(req, p);
    }

    @RequestMapping(value = "/sysPartNameGroup2OneGet", method = RequestMethod.POST)
    public SYS_PART_GROUP2_CD sysPartNameGroup2OneGet(HttpServletRequest req, Page p) {
        return bomService.sysPartNameGroup2OneGet(req, p);
    }

    @RequestMapping(value = "/sysPartNameGroup2Add", method = RequestMethod.POST)
    public Message sysPartNameGroup2Add(HttpServletRequest req, SYS_PART_GROUP2_CD spgc) {
        return bomService.sysPartNameGroup2Add(req, spgc);
    }
    @RequestMapping(value = "/sysPartNameGroup2Del", method = RequestMethod.POST)
    public Message sysPartNameGroup2Del(HttpServletRequest req, SYS_PART_GROUP2_CD spgc) {
        return bomService.sysPartNameGroup2Del(req, spgc);
    }



    @RequestMapping(value = "/sysSPartAdd2", method = RequestMethod.POST)
    public Message sysSPartAdd2(HttpServletRequest req, Page p) {
        return bomService.sysSPartAdd2(req,p);
    }

    @RequestMapping(value = "/sysSPartGet", method = RequestMethod.POST)
    public RESTful sysSPartGet(HttpServletRequest req, Page p) {
        return bomService.sysSPartGet(req, p);
    }

    @RequestMapping(value = "/sysSPartAdd", method = RequestMethod.POST)
    public Message sysSPartAdd(HttpServletRequest req, SYS_HPART_CD shc) {
        return bomService.sysSPartAdd(req,shc);
    }

    @RequestMapping(value = "/sysSPartDel", method = RequestMethod.POST)
    public Message sysSPartDel(HttpServletRequest req, SYS_HPART_CD shc) {
        return bomService.sysSPartDel(req,shc);
    }
}
