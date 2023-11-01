<script lang="ts">
  import { onMount } from "svelte";
  let container:HTMLDivElement; //지도
  onMount(async() => {
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.574320, 126.969000), //지도의 중심좌표.
            level: 2 //지도의 레벨(확대, 축소 정도)  
        };
    
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        const mapTypeControl = new kakao.maps.MapTypeControl();
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        const response = await fetch("/api"); 
          if(response.ok) {
            const responseData = await response.text();
            console.log(JSON.parse(responseData));
            if('ReactNativeWebView' in window){
              //@ts-ignore
              window.ReactNativeWebView.postMessage(responseData);
            }
          } else {
            console.log("error")
          }
    });
</script>

<div id="map" bind:this={container} style="width:100%;height:100%;"></div>
