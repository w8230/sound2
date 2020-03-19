package com.mes.mesScm.Half;

import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class HalfRestController {

    @Autowired
    private HalfService halfService;

    @RequestMapping(value = "/scmHInListGet", method = RequestMethod.POST)
    public RESTful scmHInListGet(HttpServletRequest req, Page p){ return halfService.scmHInListGet(req,p);}

    @RequestMapping(value = "/scmHOutListGet", method = RequestMethod.POST)
    public RESTful scmHOutListGet(HttpServletRequest req, Page p){ return halfService.scmHOutListGet(req,p);}

    @RequestMapping(value = "/scmHInReadyGet", method = RequestMethod.POST)
    public RESTful scmHInReadyGet(HttpServletRequest req, Page p){ return halfService.scmHInReadyGet(req,p);}
}
