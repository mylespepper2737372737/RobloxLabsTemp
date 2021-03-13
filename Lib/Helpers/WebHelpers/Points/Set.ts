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
export const SetPoints = (
	universeId: number,
	userId: number,
	amount: number ,
): Promise<boolean> => {
	return new Promise<boolean>(async (resumefunction) => {
		let path = _dirname + "\\Manifest\\universes\\" + universeId.toString()
		if (!fs.existsSync(path)) {
            return resumefunction(false)
        }
        path += "\\points.json"
        if (fs.existsSync(path)) {
            let ptray = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}))
            ptray[userId]=amount
            fs.writeFileSync(path, JSON.stringify(ptray))
            
        } else {
            let ptray = {}
            ptray[userId]=amount
            fs.writeFileSync(path, JSON.stringify(ptray))
        }
		return resumefunction(true);
	});
};