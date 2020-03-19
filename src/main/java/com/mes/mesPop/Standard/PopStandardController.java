package com.mes.mesPop.Standard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PopStandardController {
    @RequestMapping("/popLineBPart")
    public String popLineBPart(){
        return "mesPop/Standard/popLineBPart/popLineBPart";
    }
    @RequestMapping("/popLineUser")
    public String popLineUser(){
        return "mesPop/Standard/popLineUser/popLineUser";
    }

    @RequestMapping(value = "/popBcrForm")
    public String popBcrForm() { return "mesPop/Standard/popBcrForm/popBcrForm"; }
    @RequestMapping(value = "/popRoute")
    public String popRoute() { return "mesPop/Standard/popRoute/popRoute"; }

    @RequestMapping("/popErrorType")
    public String popErrorType(){
        return "mesPop/Standard/popErrorType/popErrorType";
    }

    @RequestMapping("/popSpec")
    public String popSpec(){
        return "mesPop/Standard/popSpec/popSpec";
    }
}
