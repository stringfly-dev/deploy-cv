let touchStartX = 0;
let touchStartY = 0;
let isSwipingBack = false;

const SWIPE_EDGE = 40;      // เริ่มได้เฉพาะขอบซ้าย
const SWIPE_DISTANCE = 80; // ระยะขั้นต่ำ

window.addEventListener("touchstart", e => {
  if (e.touches.length !== 1) return;

  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;

  // อนุญาต swipe back เฉพาะขอบซ้าย
  isSwipingBack = touchStartX < SWIPE_EDGE;
});

window.addEventListener("touchmove", e => {
  if (!isSwipingBack) return;

  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = Math.abs(touch.clientY - touchStartY);

  // ถ้าแนวนอนชัดกว่าแนวตั้ง → กัน scroll
  if (dx > 0 && dx > dy) {
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener("touchend", e => {
  if (!isSwipingBack) return;

  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = Math.abs(touch.clientY - touchStartY);

  if (dx > SWIPE_DISTANCE && dx > dy) {
    history.back();
  }

  isSwipingBack = false;
});
