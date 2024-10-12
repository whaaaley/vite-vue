
module.exports = {
  content: [
    './index.html',
    './src/**/*.{css,js,jsx}'
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'
      },
      boxShadow: {

      },
      colors: {
        shark: {
          '50': '#f6f7f9',  // lch(97.197%, 0.725%, 265.847%)
          '100': '#dde2e9', // lch(89.649%, 2.744%, 259.176%)
          '200': '#bcc5d2', // lch(79.112%, 5.168%, 260.435%)
          '300': '#929fb5', // lch(65.003%, 8.766%, 264.779%)
          '400': '#697996', // lch(50.333%, 11.903%, 267.562%)
          '500': '#546078', // lch(40.405%, 10.145%, 269.238%)
          '600': '#444d5f', // lch(32.481%, 7.919%, 268.896%)
          '700': '#373e4e', // lch(26.055%, 7.195%, 271.134%)
          '800': '#2f3541', // lch(21.963%, 5.623%, 268.585%)
          '900': '#1e2129'  // lch(12.694%, 3.924%, 272.647%)
        }
      },
      screens: {
        'mobile-s': '320px',
        'mobile-m': '375px',
        'mobile-l': '425px',
        'tablet': '768px',
        'laptop': '1024px',
        'laptop-l': '1200px'
      },
      flex: {
        '2': '2 1 0%',
        '3': '3 1 0%'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'din': ['D-DIN', 'sans-serif'],
        'din-exp': ['D-DIN Expanded', 'sans-serif'],
        'din-cond': ['D-DIN Condensed', 'sans-serif']
      },
      height: {

      },
      maxHeight: {

      },
      strokeWidth: {
        '3': '3px'
      },
      width: {

      }
    }
  }
}
