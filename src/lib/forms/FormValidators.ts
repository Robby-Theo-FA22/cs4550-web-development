/**
 * Match the value of this input against the input with the supplied ID.
 * @param id The ID of the form to match against.
 */
export const matchInput = (id: string) => {
	return (value: string, form: HTMLFormElement) => {
		if (value !== form.values[id]) {
			return { passwordMatch: true };
		}
	};
};
