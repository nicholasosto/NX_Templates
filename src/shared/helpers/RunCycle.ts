export function RunEvery(secondsPerCycle: number, callback: () => void) {
	task.spawn(() => {
		let lastUpdate = tick();
		while (secondsPerCycle > 0) {
			const currentTime = tick();
			if (currentTime - lastUpdate >= secondsPerCycle) {
				lastUpdate = currentTime;
				print("static tick: ", lastUpdate);
				callback();
			}
			task.wait(secondsPerCycle);
		}
	});
}
