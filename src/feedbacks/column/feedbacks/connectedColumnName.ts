import {ResolumeArenaModuleInstance} from '../../../index.js';
import {CompanionFeedbackDefinition} from '@companion-module/base';

export function connectedColumnName(resolumeArenaInstance: ResolumeArenaModuleInstance): CompanionFeedbackDefinition {return {
	type: 'advanced',
		affectedProperties: ['bgcolor', 'color', 'text'],
	name: 'Connected Column Name',
	options: [],
	callback: resolumeArenaInstance.getColumnUtils()!.columnConnectedNameFeedbackCallback.bind(resolumeArenaInstance.getColumnUtils()!)
}}
