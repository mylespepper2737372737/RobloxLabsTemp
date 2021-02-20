import { FilesClient as FilesClientA } from './FilesClient';
import { FilesService as FilesServiceA } from './FilesService';

export namespace Files {
	export const FilesClient = FilesClientA;
	export const FilesServiceImport = FilesServiceA;
}
