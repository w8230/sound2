package com.mes.mesScm.Close;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CloseController {

    @RequestMapping(value = "/scmPartClose")
    public String scmBPartClose() { return "mesScm/Close/scmPartClose/scmPartClose"; }

    @RequestMapping(value = "/scmPartCloseSumList")
    public String scmPartCloseSumList() { return "mesScm/Close/scmPartCloseSumList/scmPartCloseSumList"; }

    @RequestMapping(value ="/scmPartCloseCancel")
    public String scmPartCloseCancel() { return "mesScm/Close/scmPartCloseCancel/scmPartCloseCancel"; }
}
