class Avl {
  constructor(value, parent) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
    this.parent = parent;
    this.left_height = 0;
    this.right_height = 0;
  }

  add(element) {
    if (element <= this.value) {
      if (this.left === undefined) {
        this.left = new Avl(element, this);
        this.left_height = 1;
      } else {
        (this.left).add(element);
        this.left_height += 1; // Popravi še to
        if (this.left_height > this.right_height + 1) {
          // prenova!
          let A = this;
          let B = this.left;
          let C = this.left.left;
          let D = this.left.right;
          let E = this.right;
          let P = this.parent;

          P.left = B;
          B.parent = P;

          B.right = A;
          A.parent = B;

          A.left = D;
          D.parent = A;

          // Posodobi globina
        }
      }
    } else {
      if (this.right === undefined) {
        this.right = new Avl(element, this);
        this.right_height = 1;
      } else {
        (this.right).add(element);
        this.right_height += 1; // Popravi še to
        if (this.right_height > this.left_height + 1) {
          // prenova!
        }
      }
    }
  }
}