package com.mes.Mapper.mesManager.Authority;

import com.mes.Common.Auth.Auth;
import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.mesManager.Authority.DTO.SYSAuth;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AuthorityMapper {
    List<SYSAuth> sysAuthGet(Page p);
    Message sysAuthAU(SYSAuth sysAuth);
    Message sysAuthDelete(Page p);
    List<Page> sysAuthAllGet(Page p);
    List<SYSAuthProgram> sysAuthProgramGet(Page p);
    Message sysAuthProgramAdd(Page p);
    List<Auth> menuAllGet();

    SYSAuth sysAuthOneGet(Page p);
}
