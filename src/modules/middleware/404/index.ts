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
