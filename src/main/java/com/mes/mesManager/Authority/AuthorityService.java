package com.mes.mesManager.Authority;

import com.mes.Common.Auth.Auth;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesManager.Authority.AuthorityMapper;
import com.mes.mesManager.Authority.DTO.SYSAuth;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@Slf4j
public class AuthorityService extends ReturnFunction {
    
    @Autowired
    private AuthorityMapper authorityMapper;
    
    
    public RESTful sysAuthGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSAuth> rows = authorityMapper.sysAuthGet(p);
        return getListData(rows , p);
    }
    public List<Auth> menuAllGet(){
        return authorityMapper.menuAllGet();
    }

    public Message sysAuthAU(HttpServletRequest req, SYSAuth sysAuth){
        sysAuth.setUser_code(getSessionData(req).getUser_code());
        sysAuth.setSite_code(getSessionData(req).getSite_code());
        return authorityMapper.sysAuthAU(sysAuth);
    }
    
    public Message sysAuthDelete(Page p , HttpServletRequest req){

        p.setSite_code(getSessionData(req).getSite_code());
        p.setKeyword(p.getKeyword());
        return authorityMapper.sysAuthDelete(p);
    }
    
    public List<Page> sysAuthAllGet(HttpServletRequest req) {
        Page p = new Page();
        p.setSite_code(getSessionData(req).getSite_code());
        return authorityMapper.sysAuthAllGet(p);
    }
    
    public List<SYSAuthProgram> sysAuthProgramGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<SYSAuthProgram> list=authorityMapper.sysAuthProgramGet(p);

        for (SYSAuthProgram sysAuthProgram : list) {
            if (sysAuthProgram.getLevel() == 1) {
                sysAuthProgram.setLeaf(false);
                sysAuthProgram.setExpanded(true);
            } else if (sysAuthProgram.getLevel() == 2) {
                sysAuthProgram.setLeaf(false);
                sysAuthProgram.setExpanded(true);
            } else {
                sysAuthProgram.setLeaf(true);
                sysAuthProgram.setExpanded(false);
            }
            sysAuthProgram.setAuth_code(p.getKeyword());
        }
        return list;
    }

    
    public Message sysAuthProgramAdd(HttpServletRequest req, List<SYSAuthProgram> checkList){
        Page p = setProgram(req,checkList);
        return authorityMapper.sysAuthProgramAdd(p);
    }

    public SYSAuth sysAuthOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return authorityMapper.sysAuthOneGet(p);
    }
}
