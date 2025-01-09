var card = Vue.createApp({
  data() {
    return {
      cards: [], // 初始化 cards 為空陣列
    };
  },
  mounted() {
    // 使用 jQuery 的 $.ajax 發送請求
    $.ajax({
      url: "/portfolio", // API 路徑
      method: "GET",    // HTTP 方法
      dataType: "json", // 資料格式
      success: (results) => {
        this.cards = results; // 將回傳的資料綁定到 Vue 的 cards
      },
      error: (xhr, status, error) => {
        console.error("Error fetching data:", status, error);
      },
    });
  },
});

// 掛載 Vue 應用程式到指定的 DOM 元素
card.component("illustration-section", {
  template: `
    <div class="container text-center">
      <h2 class="text-center">Illustration</h2>
      <div class="row row-cols-1 row-cols-md-4 p-5">
        <div v-for="(card, index) in cards" :key="index" class="col">
          <div class="card h-100">
            <img :src="'/img/' + card.imgSrc" class="card-img-top" :alt="card.heading">
            <div class="card-body">
              <h5 class="card-title">{{ card.heading }}</h5>
              <p class="card-text">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ["cards"], // 接收卡片數據
});

card.mount("#app");

