export function getDDay(dateStr) {
    if (!dateStr) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);

    if (isNaN(targetDate)) return null;

    // 날짜 차이 계산
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return null; // 이미 지난 날짜
    if (diffDays === 0) return 'D-DAY';
    return `D-${diffDays}`;
}
