package com.mes.mesScm.Standard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StandardController {

    @RequestMapping(value = "/sysPartGroup")
    public String sysPartGroup() {
        return "mesScm/Standard/sysPartGroup/sysPartGroup";
    }


    @RequestMapping(value = "/sysBPartGroup")
    public String sysBPartGroup() {
        return "mesScm/Standard/sysBPartGroup/sysBPartGroup";
    }

    @RequestMapping(value = "/sysBPart")
    public String sysBPart() {
        return "mesScm/Standard/sysBPart/sysBPart";
    }

    @RequestMapping(value = "/sysPartPrice")
    public String sysBPartPrice() {
        return "mesScm/Standard/sysPartPrice/sysPartPrice";
    }

    @RequestMapping(value = "/sysLoc")
    public String sysLoc() {
        return "mesScm/Standard/sysLoc/sysLoc";
    }


    @RequestMapping(value = "/sysPartNameGroupSub")
    public String sysPartNameGroupSub() { return "mesScm/Standard/sysPartNameGroupSub/sysPartNameGroupSub"; }
}
