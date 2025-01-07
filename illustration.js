export default {
    template: `
      <section id="illustration" class="illustration-container col-12">
        <div class="container p-5 text-center">
          <h2 class="text-center m-5 animate-on-scroll">Illustration.</h2>
          <div class="row" data-aos="fade-left">
            <div 
              v-for="(project, index) in projects" 
              :key="index" 
              class="col-md-3 col-sm-12">
              <div class="card shadow h-100">
                <img :src="project.imgSrc" class="card-img-top" :alt="'Project ' + (index + 1)">
                <div class="card-body">
                  <h5 class="card-title">{{ project.title }}</h5>
                  <p class="card-text">{{ project.softwareUsed }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    data() {
      return {
        projects: [
          {
            imgSrc: "img/project01.png",
            title: "窗邊的杏子",
            softwareUsed: "Software Used: Procreate, Photoshop",
          },
          // 其他項目可以依此添加
        ],
      };
    },
    mounted() {
      // 使用 jQuery 操作 DOM
      $(document).ready(() => {
        $(".animate-on-scroll").addClass("fade-in");
        $(".card").hover(
          function () {
            $(this).addClass("shadow-lg");
          },
          function () {
            $(this).removeClass("shadow-lg");
          }
        );
      });
    },
  };
  