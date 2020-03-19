package com.mes.mesManager.Authority;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthorityController {


    @RequestMapping(value = "/sysAuth")
    public String sysAuthList() {
        return "mesManager/AuthorityManagement/sysAuth/sysAuth";
    }

    @RequestMapping(value = "/sysAuthProgram")
    public String sysAuthProgram() {
        return "mesManager/AuthorityManagement/sysAuthProgram/sysAuthProgram";
    }

}
