/*
	FileName: index.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Compiles all 404 middlewares together, used as a helper.

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import { RequestHandler as Roblox_Middle_Ware } from 'express-serve-static-core';

// Nikita - Hack here for TypeScript, I have no clue why 'export a from <Roblox_Middle_Ware>b' is broken
import ROBLOX_404_WWW_IMPORT from './Roblox.404.WWW';
import ROBLOX_404_API_IMPORT from './Roblox.404.Api';
import ROBLOX_404_STATIC_CDN_IMPORT from './Roblox.404.StaticCDN';
import ROBLOX_404_JS_IMPORT from './Roblox.404.JS';
import ROBLOX_404_CSS_IMPORT from './Roblox.404.CSS';
import ROBLOX_404_IMAGES_IMPORT from './Roblox.404.Images';
import ROBLOX_404_SETUP_CDN_IMPORT from './Roblox.404.SetupCDN';
import ROBLOX_404_EPHEMERAL_COUNTERS_IMPORT from './Roblox.404.EphermeralCounters';
import DEPRECATED_404_TEMPORARY_IMAGES_IMPORT from './DEPRECATED_Roblox.404.TemporaryImages';
import ROBLOX_404_DOSARREST_ORIGIN_CORP_IMPORT from './Roblox.404.DosArrest';
import ROBLOX_404_AB_TESTING_IMPORT from './Roblox.404.AbTesting';
import SIMULPONG_404_IMPORT from './SimulPong.404';
import Kestrel_404_I from './Kestrel';

// Jak - Export all of these an implement in Roblox.Global.asax.cs, add as internal middlewares
export const ROBLOX_404_WWW = (ROBLOX_404_WWW_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_API = (ROBLOX_404_API_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_STATIC_CDN = (ROBLOX_404_STATIC_CDN_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_JS = (ROBLOX_404_JS_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_CSS = (ROBLOX_404_CSS_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_IMAGES = (ROBLOX_404_IMAGES_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_SETUP_CDN = (ROBLOX_404_SETUP_CDN_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_EPHEMERAL_COUNTERS = (ROBLOX_404_EPHEMERAL_COUNTERS_IMPORT as unknown) as Roblox_Middle_Ware;
export const DEPRECATED_404_TEMPORARY_IMAGES = (DEPRECATED_404_TEMPORARY_IMAGES_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_DOSARREST_ORIGIN_CORP = (ROBLOX_404_DOSARREST_ORIGIN_CORP_IMPORT as unknown) as Roblox_Middle_Ware;
export const ROBLOX_404_AB_TESTING = (ROBLOX_404_AB_TESTING_IMPORT as unknown) as Roblox_Middle_Ware;
export const SIMULPONG_404 = (SIMULPONG_404_IMPORT as unknown) as Roblox_Middle_Ware;
export const Kestrel_404 = (Kestrel_404_I as unknown) as Roblox_Middle_Ware;
