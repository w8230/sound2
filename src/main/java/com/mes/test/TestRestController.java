package com.mes.test;

import org.apache.commons.codec.binary.Base64;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.util.UUID;

@RestController
public class TestRestController {

    @RequestMapping(value = "/test4", method = RequestMethod.POST)
    public String createImage(HttpServletRequest request) throws Exception {
        String binaryData = request.getParameter("imgSrc");
        FileOutputStream stream = null;
        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        try {
            System.out.println("binary file " + binaryData);
            if (binaryData == null || binaryData == "") {
                throw new Exception();
            }
            binaryData = binaryData.replaceAll("data:image/png;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);
            System.out.println("file :::::::: " + file + " || " + file.length);
            String fileName = UUID.randomUUID().toString();
            stream = new FileOutputStream("C:\\test2\\" + fileName + ".png");
            stream.write(file);
            stream.close();
            System.out.println("파일 작성 완료");
            //mav.addObject("msg", "ok");
            return "파일 작성 완료";
        } catch (Exception e) {
            System.out.println("파일이 정상적으로 넘어오지 않았습니다");
            //mav.addObject("msg", "no");
            return "파일이 정상적으로 넘어오지 않았습니다";
        } finally {
            stream.close();
        }
        //return mav;
    }

}
