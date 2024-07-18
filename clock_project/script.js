const HOUR_HAND = document.querySelector(".hour-hand");
const MINUTE_HAND = document.querySelector(".minute-hand");
const SECOND_HAND = document.querySelector(".second-hand");

function getActualTime() {
	const DATE = new Date();

	return {
		hours: DATE.getHours(),
		minutes: DATE.getMinutes(),
		seconds: DATE.getSeconds(),
	};
}

setInterval(() => {
	const { seconds, minutes, hours } = getActualTime();
	SECOND_HAND.style.transform = `translateY(-50%) rotate(${seconds * 6}deg)`;
	MINUTE_HAND.style.transform = `translateY(-50%) rotate(${minutes * 6}deg)`;
	HOUR_HAND.style.transform = `translateY(-50%) rotate(${hours * 30}deg)`;
}, 1000);
