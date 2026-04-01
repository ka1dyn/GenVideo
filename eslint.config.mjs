import { config } from "@remotion/eslint-config-flat";

export default [
	...config,
	{
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
];

