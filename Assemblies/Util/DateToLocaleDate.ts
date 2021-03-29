import { TwentyFourHourToTwelveHour } from './TwentyFourHourToTwelveHour';

export function DateToLocaleDate(date: Date) {
	const split = date.toLocaleString().replace(',', '').split(' '); // split to [Date, Time]
	const time = TwentyFourHourToTwelveHour(split[1]);
	return `${split[0]} ${time}`;
}
