package com.mes.mesScm.Half;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HalfController {
    @RequestMapping(value = "/scmHInList")
    public String scmHInList() { return "mesScm/Half/scmHInList/scmHInList"; }

    @RequestMapping(value = "/scmHInReady")
    public String scmHInReady() { return "mesScm/Half/scmHInReady/scmHInReady"; }

    @RequestMapping(value = "/scmHOutList")
    public String scmHOutList() { return "mesScm/Half/scmHOutList/scmHOutList"; }
}
