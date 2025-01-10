var card = Vue.createApp({
  data() {
    return {
      cards: [], // 儲存作品列表
    };
  },
  methods: {
    // 獲取所有作品資料
    fetchCards() {
      $.ajax({
        url: "/portfolio",
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
    // 新增作品資料
    addCard() {
      const newCard = {
        modal: "card7",
        imgSrc: "img/心城.png",
        heading: "night",
        text: "Software Used: Photoshop",
      };

      $.ajax({
        url: "/portfolio/add",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newCard),
        success: () => {
          console.log("New card added successfully");
          this.fetchCards(); // 更新作品列表
        },
        error: (xhr, status, error) => {
          console.error("Error adding new card:", status, error);
        },
      });
    },
  },
  mounted() {
    this.fetchCards(); // 初始化時獲取資料
  },
});

// 定義組件
card.component("illustration-section", {
  template: `
    <div class="container text-center">
      <h2 class="text-center">Illustration</h2>
      <button @click="$root.addCard" class="btn btn-primary mb-3">新增作品</button>
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
