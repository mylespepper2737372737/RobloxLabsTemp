import fs from 'fs';
import { _dirname } from '../../Constants/Directories';
//import Base64 from 'crypto-js/enc-base64';
//import crpto from 'crypto-js';

/**
 * Push to or push a Key to the given PersistentDataStore name.
 * @param universeId The universeId where your Store is.
 * @param userId The name of the DataStore.
 * @param amount The name of the DataStore's scope.
 * @yields Yields until operation is complete.
 * @returns Promise<boolean>
 */
export const GetPoints = (
	universeId: number,
	userId: number,
) => {
	return new Promise<[boolean, any[] | null]>(async (resumefunction) => {
		let path = _dirname + "\\Manifest\\universes\\" + universeId.toString()
		if (!fs.existsSync(path)) {
            return resumefunction([false, null])
        }
        path += "\\points.json"
        if (fs.existsSync(path)) {
            let ptray = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}))
            let e = ptray[userId]
            if (e == null) {
                ptray[userId]=0
            fs.writeFileSync(path, JSON.stringify(ptray))
            return resumefunction([true, "0" as any])
            } else {
            return resumefunction([true, e])
            }
        } else {
            let ptray = {}
            ptray[userId]=0
            fs.writeFileSync(path, JSON.stringify(ptray))
            return resumefunction([true, "0" as any])
        }
		return resumefunction([false, "0" as any]);
	});
};