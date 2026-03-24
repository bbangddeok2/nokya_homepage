document.addEventListener("DOMContentLoaded", () => {
  console.log("Wireframe Template Loaded");

  // 아코디언 같은 간단한 클릭 이벤트 예시
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("Section Clicked:", item.querySelector("h4").innerText);
      // 클릭 시 동작할 애니메이션 등을 여기에 작성
    });
  });
});
