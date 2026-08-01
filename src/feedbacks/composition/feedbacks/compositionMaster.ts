import {ResolumeArenaModuleInstance} from '../../../index.js';
import {CompanionFeedbackDefinition} from '@companion-module/base';

export function compositionMaster(resolumeArenaInstance: ResolumeArenaModuleInstance): CompanionFeedbackDefinition {
	return {
		type: 'advanced',
		affectedProperties: ['imageBuffer', 'text'],
		name: 'Composition Master',
		options: [],
		callback: resolumeArenaInstance.getCompositionUtils()!.compositionMasterFeedbackCallback.bind(resolumeArenaInstance.getCompositionUtils()!),
		unsubscribe: resolumeArenaInstance.getCompositionUtils()!.compositionMasterFeedbackUnsubscribe.bind(resolumeArenaInstance.getCompositionUtils()!)
	} as any;
}