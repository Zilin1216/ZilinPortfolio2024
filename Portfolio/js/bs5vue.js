var card = Vue.createApp({
  data() {
    return {
      cards: [], // 儲存從後端獲取的資料
    };
  },
  methods: {
    // 獲取資料
    fetchCards() {
      $.ajax({
        url: "/portfolio", // 從伺服器獲取資料
        method: "GET",
        dataType: "json",
        success: (results) => {
          console.log("Fetched results:", results);
          this.cards = results;
        },
        error: (xhr, status, error) => {
          console.error("Error fetching data:", status, error);
        },
      });
    },
  },
  mounted() {
    this.fetchCards(); // 組件掛載時獲取資料
  },
});

// 定義組件
card.component("illustration-section", {
  template: `
    <div>
      <h2 class="text-center">Illustration</h2>
      <div class="row row-cols-1 row-cols-md-4 p-5">
        <div v-for="(item, index) in $root.cards" :key="index" class="col">
          <div class="card h-100">
            <img :src="item.imgSrc" class="card-img-top" :alt="item.heading">
            <div class="card-body">
              <h5 class="card-title">{{ item.heading }}</h5>
              <p class="card-text">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

// 掛載 Vue 應用程式
card.mount("#app");