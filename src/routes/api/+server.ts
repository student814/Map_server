import type { RequestHandler } from "./$types";
import { parse } from 'node-html-parser';
type Data = {
    거래금액: string;
    거래유형: string;
    건축년도: string;
    년: string;
    도로명: string;
    도로명건물본번호코드: string;
    도로명건물부번호코드: string;
    도로명시군구코드: string;
    도로명일련번호코드: string;
    도로명지상지하코드: string;
    도로명코드: string;
    등기일자: string;
    법정동: string;
    법정동본번코드: string;
    법정동부번코드: string;
    법정동시군구코드: string;
    법정동읍면동코드: string;
    법정동지번코드: string;
    아파트: string;
    월: string;
    일: string;
    일련번호: string;
    전용면적: string;
    중개사소재지: string;
    지번: string;
    지역코드: string;
    층: string;
    해제사유발생일: string;
    해제여부 : string;
    
};


export const GET: RequestHandler = async () => {
    const res = await fetch(`http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=yLVQG48l2MqLAydmwky0CfG1Uldaq6YnjcngEdxmfvzVun38Fh7jNVEg%2BtRRTWX4ZOVBgOSK4y%2BD5%2BDTnPSCXw%3D%3D&pageNo=1&numOfRows=10&LAWD_CD=11110&DEAL_YMD=201512`);
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
            거래유형: elements[1] || "",
            건축년도: elements[2] || "",
            년: elements[3] || "",
            도로명: elements[4] || "",
            도로명건물본번호코드: elements[5] || "",
            도로명건물부번호코드: elements[6] || "",
            도로명시군구코드: elements[7] || "",
            도로명일련번호코드: elements[8] || "",
            도로명지상지하코드: elements[9] || "",
            도로명코드: elements[10] || "",
            등기일자: elements[11] || "",
            법정동: elements[12] || "",
            법정동본번코드: elements[13] || "",
            법정동부번코드: elements[14] || "",
            법정동시군구코드: elements[15] || "",
            법정동읍면동코드: elements[16] || "",
            법정동지번코드: elements[17] || "",
            아파트: elements[18] || "",
            월: elements[19] || "",
            일: elements[20] || "",
            일련번호: elements[21] || "",
            전용면적: elements[22] || "",
            중개사소재지: elements[23] || "",
            지번: elements[24] || "",
            지역코드: elements[25] || "",
            층: elements[26] || "",
            해제사유발생일: elements[27] || "",
            해제여부 : elements[28] || "",
        };
        
        return mappedData;
    });

    const formappedData = data.map(item => ({
        '거래금액': item.거래금액,
        '거래유형': item.거래유형,
        '건축년도': item.건축년도,
        '년': item.년,
        '도로명': item.도로명,
        '도로명건물본번호코드': item.도로명건물본번호코드,
        '도로명건물부번호코드': item.도로명건물부번호코드,
        '도로명시군구코드': item.도로명시군구코드,
        '도로명일련번호코드': item.도로명일련번호코드,
        '도로명지상지하코드': item.도로명지상지하코드,
        '도로명코드': item.도로명코드,
        '등기일자': item.등기일자,
        '법정동': item.법정동,
        '법정동본번코드': item.법정동본번코드,
        '법정동부번코드': item.법정동부번코드,
        '법정동시군구코드': item.법정동시군구코드,
        '법정동읍면동코드': item.법정동읍면동코드,
        '법정동지번코드': item.법정동지번코드,
        '아파트': item.아파트,
        '월': item.월,
        '일': item.일,
        '일련번호': item.일련번호,
        '전용면적': item.전용면적,
        '중개사소재지': item.중개사소재지,
        '지번': item.지번,
        '지역코드': item.지역코드,
        '층': item.층,
        '해제사유발생일' : item.해제사유발생일,
        '해제여부' : item.해제여부,
    }));
    
    return new Response(JSON.stringify(formappedData), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
