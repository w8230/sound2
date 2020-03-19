package com.mes.mesManager.Authority;

import com.mes.Common.Auth.Auth;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.mesManager.Authority.DTO.SYSAuth;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class AuthorityRestController {

    @Autowired
    private AuthorityService authorityService;

    @RequestMapping(value="/sysAuthGet" , method = RequestMethod.POST)
    public RESTful sysAuthGet(HttpServletRequest req, Page p){
        return authorityService.sysAuthGet(req, p);
    }

    @RequestMapping(value="/sysAuthOneGet" , method = RequestMethod.POST)
    public SYSAuth sysAuthOneGet(HttpServletRequest req, Page p){
        return authorityService.sysAuthOneGet(req, p);
    }

    @RequestMapping(value="/sysAuthAdd" , method = RequestMethod.POST)
    public Message sysAuthAU(HttpServletRequest request, SYSAuth sysAuth){
        return authorityService.sysAuthAU(request, sysAuth);
    }

    @RequestMapping(value="/sysAuthDelete" , method = RequestMethod.POST)
    public Message sysAuthDelete(Page p , HttpServletRequest req){
        return authorityService.sysAuthDelete(p,req);
    }

    @RequestMapping(value="/menuAllGet" , method = RequestMethod.POST)
    public List<Auth> menuAllGet(){
        return authorityService.menuAllGet();
    }

    @RequestMapping(value="/sysAuthAllGet" , method = RequestMethod.POST)
    public List<Page> sysAuthAllGet(HttpServletRequest req){
        return authorityService.sysAuthAllGet(req);
    }

    @RequestMapping(value="/sysAuthProgramGet" , method = RequestMethod.POST)
    public List<SYSAuthProgram> sysAuthProgramGet(HttpServletRequest req, Page p){
        return authorityService.sysAuthProgramGet(req,p);
    }
    @RequestMapping(value="/sysAuthProgramList" , method = RequestMethod.POST)
    public void sysAuthProgramGet(){
    }

    @RequestMapping(value="/sysAuthProgramAdd" , method = RequestMethod.POST)
    public Message sysAuthProgramAdd(HttpServletRequest req,@RequestBody List<SYSAuthProgram> checkList){
        return authorityService.sysAuthProgramAdd(req,checkList);
    }
}
