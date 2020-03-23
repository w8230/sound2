package com.mes.test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class TestController {
    @RequestMapping(value = "/test")
    public String sysPart() {
        return "Test/test1/test/test";
    }

    @RequestMapping(value = "/test2")
    public String test2(HttpServletRequest req) {
        req.setAttribute("ok","ok");

        return "views/body/Test/test1/test/testimg";
    }
}
