function matrix_add(left, right) {
        _height = left.length;
        if (_height > 0){
                _width = left[0].length;
        }else {
                return undefined;
        }
        r = Array(_height);
        for (let y = 0; y < _height; y++) {
                r[y] = Array(_width);                       
        }

        for (let y = 0; y < _height; y++) {
                for (let x = 0; x < _width; x++) {
                        r[y][x] = left[y][x] + right[y][x];
                }
                
        }
        return r;
}

function matrix_sub(left, right) {
        _height = left.length;
        if (_height > 0) {
                _width = left[0].length;
        } else {
                return undefined;
        }
        r = Array(_height);
        for (let y = 0; y < _height; y++) {
                r[y] = Array(_width);
        }

        for (let y = 0; y < _height; y++) {
                for (let x = 0; x < _width; x++) {
                        r[y][x] = left[y][x] - right[y][x];
                }

        }
        return r;
}

function matrix_mul(left, right) {
        lh = left.length;
        // Praznih matrik ne moremo pomnožiti
        if (lh > 0) {
                lw = left[0].length;
        } else {
                return undefined;
        }
        rh = right.length;
        if (rh > 0) {
                rw = right[0].length;
        } else {
                return undefined;
        }
        // Velikosti se morajo ujemati
        if (lw == rh){
                h = lh;
                w = rw;
        } else {return undefined;}

        // Zgradimo prazno matriko, kamor bomo shranili rezultat
        r = Array(h);
        for (let y = 0; y < h; y++) {
                r[y] = Array(w);
        }
        
        // izračunamo rezultat
        for (let yleft = 0; yleft < lh; yleft++) {
                for (let xright = 0; xright < rw; xright++) {
                        sum = 0
                        for (let yright = 0; yright < rh; yright++) {
                                xleft = yright;
                                sum += left[yleft][xleft] * right[yright][xright];                                
                        }
                        r[yleft][xright] = sum;
                }

        }
        return r;
}

function matrix_str(matrix) {
        r = "";
        for (let y = 0; y < matrix.length; y++) {
                line = matrix[y];
                for (let x=0; x < line.length; x++) {
                        number = line[x];
                        r += number.toString() + " ";
                }
                r += "\n";
        }
        return r;
}

function matrix_inv(matrix) {
        size = matrix.length;
        // Če je matrika prazna ali pa če ni kvadratna, vrnemo undefined
        if (size > 0) {
                _width = matrix[0].length;
        } else {
                return undefined;
        }
        if (size != _width) {
                return undefined;
        }
        
        // Pripravimo pomožno matriko z desnim delom identiteto in levim matrix
        tmp = Array(size);
        for (let y = 0; y < size; y++) {
                tmp[y] = Array(size*2);
        }
        for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                        tmp[y][x] = matrix[y][x];
                }
                for (let x = size; x < size * 2; x++) {
                        if (x - size == y) {
                                tmp[y][x] = 1;
                        } else {
                                tmp[y][x] = 0;
                        }
                }
                
        }
        // console.log(matrix_str(tmp));
        // Vrstico po vrstico
        for (let y = 0; y < size; y++) {
                if (tmp[y][y] == 0) {
                        for (let yi = y; yi < size; yi++){
                                if (tmp[yi][y] != 0) {
                                        for (let x = 0; x < size*2; x++) {
                                                tmp[y][x] = tmp[y][x] + tmp[yi][x];
                                        }
                                        break;
                                }
                        }
                }
                factor = 1/tmp[y][y];
                // stolpec po stolpec
                for (let x = y; x < size*2; x++) {
                        // najprej celotno vrstico pomnožimo s factor
                        tmp[y][x] = tmp[y][x] * factor;
                }
                for (let yi = 0; yi < size; yi++) {
                        // vrstici po vrstici odštejemo y-to vrstico
                        // krat k, tako da se znebimo x-tega stolpca
                        // ne odštevamo samo od y-te vrstice
                        if (yi != y){
                                k = tmp[yi][y];
                                // console.log(k);
                                for (let x = y; x < size*2; x++){
                                        tmp[yi][x] = tmp[yi][x] - tmp[y][x] * k;
                                }
                        }
                } 
                // console.log(matrix_str(tmp));


        }

        r = Array(size);
        for (let y = 0; y < size; y++) {
                r[y] = Array(size);
                for (let x = 0; x < size; x++) {
                        r[y][x] = tmp[y][x + size];
                }
        }

        return r;
}