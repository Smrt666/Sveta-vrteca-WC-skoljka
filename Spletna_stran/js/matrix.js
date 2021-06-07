function matrix_add(left, right) {
        let height = left.length;
        let width;
        if (height > 0){
                width = left[0].length;
        }else {
                return undefined;
        }
        let r = Array(height);
        for (let y = 0; y < height; y++) {
                r[y] = Array(width);                       
        }

        for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                        r[y][x] = left[y][x] + right[y][x];
                }
                
        }
        return r;
}

function matrix_sub(left, right) {
        let height = left.length;
        let width;
        if (height > 0) {
                width = left[0].length;
        } else {
                return undefined;
        }
        let r = Array(height);
        for (let y = 0; y < height; y++) {
                r[y] = Array(width);
        }

        for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                        r[y][x] = left[y][x] - right[y][x];
                }

        }
        return r;
}

function matrix_mul(left, right) {
        let lh = left.length;
        let lw;
        // Praznih matrik ne moremo pomnožiti
        if (lh > 0) {
                lw = left[0].length;
        } else {
                return undefined;
        }
        let rh = right.length;
        let rw;
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
        let r = Array(h);
        for (let y = 0; y < h; y++) {
                r[y] = Array(w);
        }
        
        // izračunamo rezultat
        for (let yleft = 0; yleft < lh; yleft++) {
                for (let xright = 0; xright < rw; xright++) {
                        let sum = 0
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
        let r = "";
        for (let y = 0; y < matrix.length; y++) {
                let line = matrix[y];
                for (let x=0; x < line.length; x++) {
                        let number = line[x];
                        r += number.toString() + " ";
                }
                r += "\n";
        }
        return r;
}

function matrix_inv(matrix) {
        let size = matrix.length;
        let width;
        // Če je matrika prazna ali pa če ni kvadratna, vrnemo undefined
        if (size > 0) {
                width = matrix[0].length;
        } else {
                return undefined;
        }
        if (size != width) {
                return undefined;
        }
        
        // Pripravimo pomožno matriko z desnim delom identiteto in levim matrix
        let tmp = Array(size);
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
                let factor = 1/tmp[y][y];
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
                                let k = tmp[yi][y];
                                // console.log(k);
                                for (let x = y; x < size*2; x++){
                                        tmp[yi][x] = tmp[yi][x] - tmp[y][x] * k;
                                }
                        }
                } 
                // console.log(matrix_str(tmp));


        }

        let r = Array(size);
        for (let y = 0; y < size; y++) {
                r[y] = Array(size);
                for (let x = 0; x < size; x++) {
                        r[y][x] = tmp[y][x + size];
                }
        }

        return r;
}

function matrix_pow(matrix, n) {
        let r = [];
        for (let i = 0; i < matrix.length; i++) {
                let line = [];
                for (let j = 0; j < matrix[i].length; j++) {
                        line.push(0);
                }
                r.push(line);
        }
        for (let i = 0; i < r.length; i++) {
                r[i][i] = 1;
        }

        let factor = matrix;
        while (n > 0) {
                if (n % 2 == 1) {
                        r = matrix_mul(r, factor);
                }
                n = Math.floor(n / 2);
                factor = matrix_mul(factor, factor);
        }

        return r;
}