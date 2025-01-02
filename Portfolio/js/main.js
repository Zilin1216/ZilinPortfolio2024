// 初始化 Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
  
        // 如果進入視窗，加入淡入效果
        if (entry.isIntersecting) {
          target.classList.add("fade-in");
          target.classList.remove("fade-out");
        } else {
          // 如果離開視窗，加入淡出效果
          target.classList.add("fade-out");
          target.classList.remove("fade-in");
        }
      });
    },
    {
      threshold: 0.1, // 可調整進入/離開視窗的觸發範圍
    }
  );
  
  // 選取需要動畫的所有元素
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((element) => observer.observe(element));
  