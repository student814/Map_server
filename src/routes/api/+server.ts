import type { RequestHandler } from "./$types";
import { parse } from 'node-html-parser';
type Data = {
    거래금액: string;
    건축년도: string;
    년: string;
    도로명: string;
    도로명건물본번호코드: string;
    도로명건물부번호코드: string;
    도로명시군구코드: number; // 숫자 타입으로 변경
    도로명일련번호코드: string;
    도로명코드: string;
    법정동: string;
    법정동본번코드: string;
    법정동부번코드: string;
    법정동시군구코드: number; // 숫자 타입으로 변경
    법정동읍면동코드: string;
    법정동지번코드: string;
    아파트: string;
    월: string;
    일: string;
    전용면적: string;
    지번: string;
    지역코드: number; // 숫자 타입으로 변경
    층: string;
};


export const GET: RequestHandler = async () => {
    const res = await fetch(`http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHTrade?serviceKey=yLVQG48l2MqLAydmwky0CfG1Uldaq6YnjcngEdxmfvzVun38Fh7jNVEg%2BtRRTWX4ZOVBgOSK4y%2BD5%2BDTnPSCXw%3D%3D&LAWD_CD=11110&DEAL_YMD=201512`);
    const xmldata = await res.text();

    const dom = parse(xmldata);
    const items = dom.querySelectorAll('item');

    const data: Data[] = items.map(item => {
        const elements = item.text.split("</").map(part => {
            const match = part.match(/<[^>]*>(.*?)$/);
            return match ? match[1].trim() : null;
        });

        const mappedData: Data = {
            거래금액: elements[0] || "",
            건축년도: elements[2] || "",
            년: elements[3] || "",
            도로명: elements[4] || "",
            도로명건물본번호코드: elements[5] || "",
            도로명건물부번호코드: elements[6] || "",
            도로명시군구코드: parseInt(elements[7] || "", 10),
            도로명일련번호코드: elements[8] || "",
            도로명코드: elements[9] || "",
            법정동: elements[10] || "",
            법정동본번코드: elements[11] || "",
            법정동부번코드: elements[12] || "",
            법정동시군구코드: parseInt(elements[13] || "", 10),
            법정동읍면동코드: elements[14] || "",
            법정동지번코드: elements[15] || "",
            아파트: elements[16] || "",
            월: elements[17] || "",
            일: elements[18] || "",
            전용면적: elements[19] || "",
            지번: elements[20] || "",
            지역코드: parseInt(elements[21] || "", 10),
            층: elements[22] || "",
        };
        
        return mappedData;
    });

    const formappedData = data.map(item => ({
        '지역코드': item.지역코드,
        '도로명': item.도로명,
        '법정동': item.법정동,
        '지번': item.지번,
        '아파트': item.아파트,
        '건축년도': item.건축년도,
        '층': item.층,
        '전용면적': item.전용면적,
        '년': item.년,
        '월': item.월,
        '일': item.일,
        '거래금액': item.거래금액,
        '도로명건물본번호코드': item.도로명건물본번호코드,
        '도로명건물부번호코드': item.도로명건물부번호코드,
        '도로명시군구코드': item.도로명시군구코드,
        '도로명일련번호코드': item.도로명일련번호코드,
        '도로명코드': item.도로명코드,
        '법정동본번코드': item.법정동본번코드,
        '법정동부번코드': item.법정동부번코드,
        '법정동시군구코드': item.법정동시군구코드,
        '법정동읍면동코드': item.법정동읍면동코드,
        '법정동지번코드': item.법정동지번코드,
    }));
    
    return new Response(JSON.stringify(formappedData), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
