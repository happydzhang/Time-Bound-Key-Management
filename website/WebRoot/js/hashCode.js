		function hashCode(str){	
        	var h = 0;
        	var len = str.length;
        	var t = 2147483648;
        for (var i = 0; i < len; i++) {
            h = 31 * h + str.charCodeAt(i);
            if(h > 2147483647) h %= t;//java int in case of overflow
        }
        /*var t = -2147483648 * 2;
        while (h > 2147483647) {
            h += t
        }*/
        return h;
     	}