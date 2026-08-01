import {CompanionStaticUpgradeScript, combineRgb} from '@companion-module/base';

// Companion 4.3 / module-api 2.0 stopped auto-coercing 'rgb(r,g,b)' string
// color options to numbers when a feedback declares `returnType: 'number'`.
// The Connected Clip feedback (and the Trigger Clip preset that bundles it)
// shipped string-form defaults under module-api 1.x, so persisted buttons
// from older versions store the legacy string. Without this upgrade those
// buttons render black because `feedback.options.color_connected as number`
// yields NaN.
//
// We migrate any string of the form 'rgb(r,g,b)' on the four connectedClip
// color options to its numeric equivalent. Buttons that already have numbers
// (set after our 4.3 fix landed, or freshly dropped from the preset) are
// untouched.

const COLOR_OPTION_IDS = [
	'color_connected',
	'color_connected_selected',
	'color_connected_preview',
	'color_preview',
] as const;

function rgbStringToNumber(v: unknown): number | undefined {
	if (typeof v !== 'string') return undefined;
	const m = v.match(/^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i);
	if (!m) return undefined;
	const r = Math.min(255, Math.max(0, parseInt(m[1], 10)));
	const g = Math.min(255, Math.max(0, parseInt(m[2], 10)));
	const b = Math.min(255, Math.max(0, parseInt(m[3], 10)));
	return combineRgb(r, g, b);
}

export const upgrade_v4_3_0: CompanionStaticUpgradeScript<any, any> = function (_context, props) {
	const updatedFeedbacks: any[] = [];

	for (const feedback of props.feedbacks) {
		if (feedback?.feedbackId !== 'connectedClip') continue;
		if (!feedback.options) continue;

		let changed = false;
		for (const id of COLOR_OPTION_IDS) {
			const current = feedback.options[id];
			// Module-api 2.0 wraps option values as { value, isExpression }.
			// Older snapshots may still have the raw value. Handle both.
			if (current && typeof current === 'object' && 'value' in current) {
				if (current.isExpression) continue;
				const num = rgbStringToNumber(current.value);
				if (num !== undefined) {
					feedback.options[id] = {value: num, isExpression: false};
					changed = true;
				}
			} else {
				const num = rgbStringToNumber(current);
				if (num !== undefined) {
					(feedback.options as any)[id] = num;
					changed = true;
				}
			}
		}

		if (changed) updatedFeedbacks.push(feedback);
	}

	return {
		updatedConfig: null,
		updatedActions: [],
		updatedFeedbacks,
	};
};
