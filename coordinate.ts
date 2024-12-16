export type Grid<T> = T[][];

export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Coordinate): Coordinate {
    return new Coordinate(this.x + other.x, this.y + other.y);
  }

  eq(other: Coordinate): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): string {
    return `${this.x};${this.y}`;
  }

  getValueFromGrid<T>(grid: Grid<T>): T | undefined {
    if (this.x < 0 || this.x >= grid.length || this.y < 0 || this.y >= grid[0].length) {
      return undefined;
    }
    return grid[this.y][this.x];
  }

  setValueInGrid<T>(grid: Grid<T>, value: T): void {
    if (this.x < 0 || this.x >= grid.length || this.y < 0 || this.y >= grid[0].length) {
      return;
    }
    grid[this.x][this.y] = value;
  }

  static parse(hashedString: string): Coordinate | undefined {
    const parts = hashedString.split(':');
    if (parts.length !== 2) {
      return undefined;
    }

    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);

    if (isNaN(x) || isNaN(y)) {
      return undefined;
    }

    return new Coordinate(x, y);
  }
}

export class Direction extends Coordinate {
  constructor(c: Coordinate) {
    super(c.x, c.y);
    if (!Direction.isValidDirection(c)) {
      throw new Error("Invalid direction");
    }
  }
  isPerpendicular(other: Direction): boolean {
    return this.x * other.x + this.y * other.y === 0;
  }  
  isReversed(other: Coordinate): boolean {
    return this.x === -other.x && this.y === -other.y;
  }
  private static isValidDirection(c: Coordinate): c is Direction {
    return (
      (c.x === 0 && c.y === -1) ||  // up
      (c.x === 0 && c.y === 1) || // down
      (c.x === -1 && c.y === 0) || // left
      (c.x === 1 && c.y === 0)     // right
    );
  }

  static up = new Direction(new Coordinate(0, -1));
  static down = new Direction(new Coordinate(0, 1));
  static left = new Direction(new Coordinate(-1, 0));
  static right = new Direction(new Coordinate(1, 0));
  static dirs = [Direction.up, Direction.down, Direction.left, Direction.right];
}
 

