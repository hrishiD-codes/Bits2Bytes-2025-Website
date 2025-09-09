/**
 * Utility function to combine and merge CSS classes
 * @param  {...any} inputs - CSS class names or conditional class objects
 * @returns {string} - Combined class string
 */
export function cn(...inputs) {
	const classes = [];

	inputs.forEach((input) => {
		if (typeof input === "string") {
			classes.push(input);
		} else if (typeof input === "object" && input !== null) {
			Object.keys(input).forEach((key) => {
				if (input[key]) {
					classes.push(key);
				}
			});
		}
	});

	return classes.filter(Boolean).join(" ");
}
