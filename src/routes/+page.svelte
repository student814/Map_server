<script lang="ts">
    import { onMount } from "svelte";
  
    let container: HTMLDivElement;
    let receivedMessage = "";
    let dataFromServer = ""; // 서버에서 받은 데이터를 저장할 변수
  
    onMount(async () => {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
  
      const map = new kakao.maps.Map(container, options);
      const mapTypeControl = new kakao.maps.MapTypeControl();
      const zoomControl = new kakao.maps.ZoomControl();
  
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  
      const message = "Hello from Svelte!";
      window.postMessage(message, "*");
  
      // 웹 페이지에서 메시지 수신
      window.addEventListener("message", async (event) => {
        if (event.data) {
          receivedMessage = event.data;
  
          // 서버로 데이터 요청을 보냄
          try {
            const response = await fetch("/api/data"); // 서버 API 엔드포인트에 맞게 수정
            if (response.ok) {
              dataFromServer = await response.text();
              console.log("Data from server:", dataFromServer);
              // 이제 dataFromServer에 서버에서 받은 데이터가 저장됩니다.
            } else {
              console.error("Failed to fetch data from server");
            }
          } catch (error) {
            console.error("Error fetching data from server:", error);
          }
        }
      });
    });
  </script>
  
  <div id="map" bind:this={container} style="width:100%;height:100%;"></div>
  