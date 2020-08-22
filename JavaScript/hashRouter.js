class Routers {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.history = [];
    this.currentIndex = this.history.length - 1;
    this.isBack = false;

    this.backOff = this.backOff.bind(this);
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    if (!this.isBack) {
      if (this.currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex + 1);
      }
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }
    this.routes[this.currentUrl]();

    this.isBack = false;
  }
  // 后退操作
  backOff() {
    this.isBack = true;
    this.currentIndex <= 0 ? this.currentIndex = 0 : this.currentIndex--;
    location.hash = `#${this.history[this.currentIndex]}`;
  }
}

window.Router = new Routers();
const content = document.querySelector('body');
const button = document.querySelector('button');
button.addEventListener('click', Router.backOff, false);
const colorChange = color => {
  content.style.backgroundColor = color;
}
Router.route('/', function() {
  colorChange('yellow');
});
Router.route('/blue', function() {
  colorChange('blue');
});
Router.route('/green', function() {
  colorChange('green');
});

