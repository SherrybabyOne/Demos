interface Deck {
  str: string;
  test: (this: Deck) => void;
}

const a = {
  str: 'aaa',
  test(this: Deck) {
    console.log(this.str);
  }
}