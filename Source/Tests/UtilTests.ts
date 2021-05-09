import { InputValidator } from '../Assemblies/Web/Util/Roblox.Web.Util/Validators/InputValidator';
import { Walkers } from '../Assemblies/Web/Util/Roblox.Web.Util/Walkers';

const inputValidatorClient = new InputValidator();

console.log(Walkers.ClassWalker(require('./Entities/T')));
console.log('done');
console.log(inputValidatorClient.CheckDoesStringIncludeWhitespace('abc '));
console.log(inputValidatorClient.CheckDoesStringIncludeWhitespace('abc'));
console.log(inputValidatorClient.CheckDoesStringIncludeWhitespace('test\n'));
console.log(inputValidatorClient.CheckDoesStringIncludeWhitespace('test\n\n'));
