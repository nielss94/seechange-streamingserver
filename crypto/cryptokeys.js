const express = require('express');
const app = express();

const privateKey = "-----BEGIN RSA PRIVATE KEY-----" +
"MIIEpgIBAAKCAQEAzul1PJDDi/wdZVPbFQwerqOqgP/oQW6d+5DTDcb37x/3/+u1" +
"GEPRhnWnUZM+LZ9i8DVqjrlmMTUgAO71B4PCgRpQBDk6KWWeQXIyxW3VwzSyNNjC" +
"ZPrvn4/0IIY4eNgKX9HhiaIBhaGLqV1DSH0W85ri2GwqSChXpxjlBG/p3nN4sPX4" +
"/lHoXxq2KNMZ8/eqVV9WJ3TIMlWR2KhlVs+724rexM8Q8U+nAVA8Fot3a2kZ06lG" +
"yRM0cJM1AuwiDsxzEbXcvtyrRx/9G7l2+vW0IHieharBiUF8sZ3GiESji5XTntbi" +
"i73QthwhIVPatiJ9uJFqhUBe8mroGJaQfafXrwIDAQABAoIBAQDBoGUOjWYBDKgx" +
"l3xwQMxBn3VCjLg66xo6PXfT77s68g6xVlE86NIdYuJ2CzVnmj0LDuGtuD+yksVl" +
"OjjglGOjTw1MNoWAEdE763MpoDQnHZwaqjGYL9+n0R2ihhg4tetXaeAGXS3RcLBy" +
"iI0bO7wLsYjRAL+8kMwd2cUPFu+jM3sEVmnKpZ6rLOuAL8qm1bWyJEJvCQDsZVtK" +
"KZ7bEGU4jKsR8HrEZBo+lP+MJXavL+2Yh6jEUHRiO93+1FDXa2sMF3sSIR4JR9Pp" +
"0ochuBrRFMfbT3A63V4M4rg5wSzMv/HmyaxLI/uhm1Eq5JA5NdxynazirsJnJZrR" +
"zQmTSCkZAoGBAOtijVkd7hPtWtuRb7NO5Xzobr+cySY8TkqzWh6nUYhhFCEbn3Wq" +
"sK7mT3RwddiIJ+qAcpgHsFe/uWWUbGWdhPFG+LDy7YVSbtDRSvkC0XScaIaCP21I" +
"smagtq6taGruqqcE0x8p2XN8k39xcKleMlNdF/J6Qe5Nhgjc/u1HCRIbAoGBAOEI" +
"hsdI88BFcBCzgBdJTK5RPn45xtHHc5IZjTPE8oXF6tKwISo+NvQe1GyYnlBsIwol" +
"zBJ2/yduatEvolRCcZGMJg9VlhQNDaba9SGfTQpYEpPlJp1+6SdHhwCgra9MbJ4s" +
"saf84zisRCaFohIIocvPPL6fhaV8XdpsIoH5Cgn9AoGBAJXcZ/uuB47eVjNm1AQI" +
"Him5XhFWg+Z5DKuYpq7PfiRjEkrF6G8k3lpsPXf3xb+3aBpv7wWGF6q2YRYgOicz" +
"85kdw2X9NGXmhrEiHyaMucgRcKb6s+EjIJoghk6ODuXN0A6IDtZPcaeKT+oa0kyy" +
"sT3MDlwNpH5REx3/fbqZuFezAoGBANlvP6t3Ve7GKU454t6dOLaGUfftI6q3KXhV" +
"sBYBisSvRAJnpOQIUVj4IRD9NptGoWTAuLpuuIQFMLkHabY4rTuRS4UtkWG2ayZ6" +
"Erl2Dx6bkvfMRs+PPQFzH4L/vlLPaXQ8gzxqIbM04HTIUp1SMeOYTn1x7dTEonrW" +
"WVF0rLqRAoGBAMyjYMlKYwnAXBx5TeSdGavVp5GmPxLArx2B3KtOYgdgKrCk+9uk" +
"gWPr8nd0pb3U4Cwk+AK/Bx77uzCsNMevvwnBstBMEo3jvBYOZP8fpA/xSB/c9DiC" +
"iQoffq9SggD/3vULFgdUspuCMVtlXi5hxA/BlT619IPlq8DUW2khQL+d" +
"-----END RSA PRIVATE KEY-----";

const publicKey = "-----BEGIN PUBLIC KEY-----" +
"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzul1PJDDi/wdZVPbFQwe" +
"rqOqgP/oQW6d+5DTDcb37x/3/+u1GEPRhnWnUZM+LZ9i8DVqjrlmMTUgAO71B4PC" +
"gRpQBDk6KWWeQXIyxW3VwzSyNNjCZPrvn4/0IIY4eNgKX9HhiaIBhaGLqV1DSH0W" +
"85ri2GwqSChXpxjlBG/p3nN4sPX4/lHoXxq2KNMZ8/eqVV9WJ3TIMlWR2KhlVs+7" +
"24rexM8Q8U+nAVA8Fot3a2kZ06lGyRM0cJM1AuwiDsxzEbXcvtyrRx/9G7l2+vW0" +
"IHieharBiUF8sZ3GiESji5XTntbii73QthwhIVPatiJ9uJFqhUBe8mroGJaQfafX" +
"rwIDAQAB" +
"-----END PUBLIC KEY-----"

module.exports = {publicKey, privateKey};



