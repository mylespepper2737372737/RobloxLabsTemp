/*
	FileName: index.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Compiles all 404 middlewares together, used as a helper.

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	***

	Copyright 2015-2020 MFD

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

import { RequestHandler } from 'express-serve-static-core';
import www_import from './www';
import api_import from './api';
import staticcdn_import from './staticcdn';
import js_import from './js';
import css_import from './css';
import images_import from './images';
import setup_import from './setup';
import ecs_import from './ecs';

export const www404 = (www_import as unknown) as RequestHandler;
export const api404 = (api_import as unknown) as RequestHandler;
export const staticcdn404 = (staticcdn_import as unknown) as RequestHandler;
export const js404 = (js_import as unknown) as RequestHandler;
export const css404 = (css_import as unknown) as RequestHandler;
export const images404 = (images_import as unknown) as RequestHandler;
export const setup404 = (setup_import as unknown) as RequestHandler;
export const ecs404 = (ecs_import as unknown) as RequestHandler;
