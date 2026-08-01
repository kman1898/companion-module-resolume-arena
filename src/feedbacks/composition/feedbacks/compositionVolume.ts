import {ResolumeArenaModuleInstance} from '../../../index.js';
import {CompanionFeedbackDefinition} from '@companion-module/base';

export function compositionVolume(resolumeArenaInstance: ResolumeArenaModuleInstance): CompanionFeedbackDefinition {
	return {
		type: 'advanced',
		affectedProperties: ['imageBuffer', 'text'],
		name: 'Composition Volume',
		options: [],
		callback: resolumeArenaInstance.getCompositionUtils()!.compositionVolumeFeedbackCallback.bind(resolumeArenaInstance.getCompositionUtils()!)
	};
}