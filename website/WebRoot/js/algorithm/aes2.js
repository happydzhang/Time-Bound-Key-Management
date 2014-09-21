 
var crypto = require('crypto');  
var algorithm = 'aes-128-cbc';  
var key = 'Secret Passphrase';  
  
/*-----------------------------------------------------------* 
 * ENCRYPT: AES 128 bit, CBC                                 * 
 *-----------------------------------------------------------*/  
  
 var ciphertext = _encrypt(data, key, algorithm);   
  
  
  
/*-----------------------------------------------------------* 
 * DECRYPT: AES 128 bit, CBC                                 * 
 *-----------------------------------------------------------*/  
  
 var plain = _decrypt(ciphertext, key, algorithm);  
  
   
   
/******************************************************************** 
                      IMPLEMENTING FUNCTIONS... 
********************************************************************/  
   
function _encrypt(data, key, algorithm)  
{
	var clearEncoding = 'utf8';
  var cipherEncoding = 'base64'; // hex, base64   
  
  var cipher = crypto.createCipher(algorithm, key);  
  var cipherChunks = [];  
  cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));  
  cipherChunks.push(cipher.final(cipherEncoding));  
  
 return (cipherChunks);  
}  
  
function _decrypt(ciphertext, key, algorithm)  
{  
  var clearEncoding = 'utf8';  
  var cipherEncoding = 'base64'; // hex, base64   
  
  var decipher = crypto.createDecipher(algorithm, key);  
  var plainChunks = [];  
  for (var i = 0;i < ciphertext.length;i++) {  
   plainChunks.push(decipher.update(ciphertext[i], cipherEncoding, clearEncoding));  
  }  
  plainChunks.push(decipher.final(clearEncoding));  
  var plaintext = plainChunks.join('');  
  
 return (plaintext);  
}  
  