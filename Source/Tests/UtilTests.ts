import { InputValidator } from '../Assemblies/Web/Util/Roblox.Web.Util/Validators/InputValidator';
import { Walkers } from '../Assemblies/Web/Util/Roblox.Web.Util/Walkers';

console.log(Walkers.ClassWalker(require('./Entities/T')));
console.log('done');
console.log(InputValidator.CheckDoesStringIncludeWhitespace('abc '));
console.log(InputValidator.CheckDoesStringIncludeWhitespace('abc'));
console.log(InputValidator.CheckDoesStringIncludeWhitespace('test\n'));
console.log(InputValidator.CheckDoesStringIncludeWhitespace('test\n\n'));
