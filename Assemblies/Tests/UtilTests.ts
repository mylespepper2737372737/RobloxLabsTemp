import { CheckDoesStringIncludeWhitespace } from '../Util/CheckDoesStringIncludeWhitespace';
import { ClassWalker } from '../Util/ClassWalker';

console.log(ClassWalker(require('./Entities/T')));
console.log('done');
console.log(CheckDoesStringIncludeWhitespace('abc '));
console.log(CheckDoesStringIncludeWhitespace('abc'));
console.log(CheckDoesStringIncludeWhitespace('test\n'));
console.log(CheckDoesStringIncludeWhitespace('test\n\n'));
